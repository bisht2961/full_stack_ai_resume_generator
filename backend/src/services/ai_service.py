import tempfile

from fastapi import UploadFile
from pypdf import PdfReader
from src.utils.prompt_and_tool import (get_resume_experience_generator_tool_spec, get_resume_summary_generator_tool_spec,
                                        build_resume_prompt)
from src.config.env_config import GROQ_API_KEY
import json
from groq import Groq


client = Groq(api_key=GROQ_API_KEY)

system_prompt = """
You are a helpful AI assistant that helps generate or rewrite resume experience or project description bullet points.

Instructions:
- If asked to 'generate', create 5–7 resume bullet points based on the provided input.
- If asked to 'regenerate', rewrite the given bullet points or experience/project description using different action verbs while maintaining the original meaning.
- Each bullet point should be concise, ATS-friendly, and reflect accomplishments or responsibilities.
- Output must be a JSON object with two fields: 
  - "action_type": either "generate" or "regenerate"
  - "bullets": an array of plain text bullet points
"""



def get_summary_groq(title:str):
    try:
        chat_completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that returns structured JSON with resume summaries for various experience levels."
                },
                {
                    "role": "user",
                    "content": f"Generate resume summaries for the job title '{title}' for three levels: Fresher, Mid-level, and High-level. Focus on technical and soft skills relevant to the role."
                }
            ],
            tools=[get_resume_summary_generator_tool_spec()],
            tool_choice={"type": "function", "function": {"name": "generate_resume_summaries"}}
        )
        raw_args = chat_completion.choices[0].message.tool_calls[0].function.arguments
        structured_output = json.loads(raw_args)
        print(structured_output['summaries'])
        return structured_output["summaries"]
    except Exception as e:
        print(f"Error: {str(e)}")

def get_ai_description_groq(user_input:str):
    try:
        user_prompt = f"""
        action_type: "generate"
        Input: {user_input}
        """

        chat_completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            tools=[get_resume_experience_generator_tool_spec()],
            tool_choice={"type": "function", "function": {"name": "handle_resume_bullets"}}
        )

        # Extract structured bullet points
        response = chat_completion.choices[0].message

        # If tool_call succeeded
        if response.tool_calls:
            arguments = response.tool_calls[0].function.arguments
            data = json.loads(arguments)
            return data["bullets"]
        else:
            # Fallback: Try extracting directly from content
            print("No tool call, content returned:")
            print(response.content)
    except Exception as e:
        print(f"Error: {str(e)}")

def get_regenerate_ai_description_groq(user_input:str):
    try:
        user_prompt = f"""
               action_type: "regenerate"
               Input: {user_input}
               """
        chat_completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            tools=[get_resume_experience_generator_tool_spec()],
            tool_choice={"type": "function", "function": {"name": "handle_resume_bullets"}}
        )

        # Extract structured bullet points
        arguments = chat_completion.choices[0].message.tool_calls[0].function.arguments
        print(arguments)
        data = json.loads(arguments)
        print(data["bullets"])
        return data["bullets"]
    except Exception as e:
        print(f"Error: {str(e)}")

async def get_json_resume_information(resume: UploadFile):
    contents = await resume.read()

    # Save to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        temp_file.write(contents)
        temp_file_path = temp_file.name  # fixed typo here

    reader = PdfReader(temp_file_path)
    resume_text = ""
    for page in reader.pages:
        resume_text += page.extract_text()+"\n"

    prompt = build_resume_prompt(resume_text)
    # print(f"Resume text extracted: {resume_text}")
    chat_completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a strict JSON generator. You must output ONLY a single valid JSON object "
                    "that matches the provided schema exactly. Do not include any explanations."
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.3
    )
    content = chat_completion.choices[0].message.content.strip()
    print(f"extracted content : {content}")
    try:

        json_output = json.loads(content)
        return json_output
    except Exception as e:
        return {"error": "Could not parse JSON", "raw": content}