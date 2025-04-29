from langchain_google_genai import ChatGoogleGenerativeAI
from src.config.env_config import VERTEX_API_KEY
from langchain_core.prompts import ChatPromptTemplate
import re
import json
from bs4 import BeautifulSoup

llm = ChatGoogleGenerativeAI(
    api_key=VERTEX_API_KEY,
    model="gemini-1.5-pro",
    temperature=1,
    max_retries=2,
)
summary_prompt_template = """
You are a helpful ai assistant that helps people write ATS friendly resume summaries based on the job role.
Make sure to include technical and soft skill required for the job role. 
Job Title: {jobTitle}, based on the job title provide sample summaries for experience as a Fresher(0-1 years), Mid-level(2-5 years) and High-level(5+ years) experience.
Output in the following JSON format:
 {{
    summary: summary
    experience_level: experience
 }}
"""
experience_prompt_template = """
You are a helpful ai assistant that helps in writing ATS friendly experiences.
Based on the experience provided, give me 5-7 bullet points to include in the resume.
Experience: {experience_line}
Output the bullet points in HTML tags.

"""

regenerate_experience_prompt_template = """
You are a helpful ai assistant that helps in writing ATS friendly experiences.
Based on the sample experiences provided re write the experience using unique and different action words which are ATS friendly.
Experience: {experience_line}
Output the bullet points in HTML tags.

"""

def get_summary(title: str):
    prompt = ChatPromptTemplate.from_messages([
        ('system',summary_prompt_template),
        ('human','{jobTitle}')
    ])

    chain = prompt | llm
    summary = chain.invoke({
        'jobTitle': title
    }).content
    # print(summary)
    return parse_llm_summary_output(summary)

def parse_llm_summary_output(llm_response: str):
    """
    Cleans and parses the LLM output to extract summary and experience info.
    Removes markdown formatting (e.g., ```json ... ```) if present.
    """
    cleaned_response = re.sub(r"```json|```", "", llm_response).strip()

    try:
        parsed = json.loads(cleaned_response)
        return parsed

    except json.JSONDecodeError as e:
        print("JSON decode error:", e)
        return []

def get_experience(experience:str):
    prompt = ChatPromptTemplate.from_messages([
        ("system", experience_prompt_template),
        ('human','{experience_line}')
    ])
    chain = prompt | llm
    llm_response = chain.invoke({
        'experience_line': experience
    })

    return parse_llm_experience_output(llm_response.content)

def get_regenerated_experience(experience:str):
    prompt = ChatPromptTemplate.from_messages([
        ("system", regenerate_experience_prompt_template),
        ('human', '{experience_line}')
    ])
    chain = prompt | llm
    llm_response = chain.invoke({
        'experience_line': experience
    })
    return parse_llm_experience_output(llm_response.content)

def parse_llm_experience_output(llm_response:str):
    # print(llm_response)
    cleaned_response = re.sub(r"```html|```","",llm_response).strip()
    # soup = BeautifulSoup(f"<ul>{cleaned_response}</ul>", "html.parser")
    # bullet_list = "\n".join([f"• {li.get_text(strip=True)}" for li in soup.find_all("li")])
    return cleaned_response