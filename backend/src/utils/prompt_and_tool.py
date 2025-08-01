import json
from typing import List, Dict, Any


def get_resume_experience_generator_tool_spec()-> Dict[str,Any]:
    """
     Returns the tool definition for Groq-compatible LLMs.
    """
    return {
        "type": "function",
        "function": {
            "name": "handle_resume_bullets",
            "description": "Generates or rewrites resume experience/project description bullet points as plain text based on action type",
            "parameters": {
                "type": "object",
                "properties": {
                    "action_type": {
                        "type": "string",
                        "enum": ["generate", "regenerate"],
                        "description": "Whether the response is for newly generated or regenerated bullet points"
                    },
                    "bullets": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "description": "List of bullet points in plain text"
                    }
                },
                "required": ["action_type", "bullets"]
            }
        }
    }


def get_resume_summary_generator_tool_spec()-> Dict[str,Any]:
    """
    Returns the tool definition for Groq-compatible LLMs.
    """
    return {
        "type": "function",
        "function": {
            "name": "generate_resume_summaries",
            "description": "Generate resume summaries for different experience levels",
            "parameters": {
                "type": "object",
                "properties": {
                    "summaries": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "summary": {"type": "string"},
                                "experience_level": {
                                    "type": "string",
                                    "enum": ["Fresher", "Mid-level", "High-level"]
                                }
                            },
                            "required": ["summary", "experience_level"]
                        }
                    }
                },
                "required": ["summaries"]
            }
        }
    }

def get_extracted_json_schema()->Dict[str,Any]:
    return {
    "personalInfo": {
        "firstName": "",
        "lastName": "",
        "jobTitle": "",
        "address": "",
        "phone": "",
        "email": "",
        "themeColor": "#F7FAFC"
    },
    "summary": "",
    "experience": [
        {
            "id": 1,
            "title": "",
            "companyName": "",
            "city": "",
            "state": "",
            "startDate": "",
            "endDate": "",
            "currentlyWorking": False,
            "workSummary": ""
        }
    ],
    "education": [
        {
            "id": 1,
            "universityName": "",
            "startDate": "",
            "endDate": "",
            "degree": "",
            "major": "",
            "description": ""
        }
    ],
    "skills": [
        {
            "id": 1,
            "name": "",
            "rating": 3
        }
    ]
}

def build_resume_prompt(resume_text: str) -> str:
    EXPECTED_SCHEMA: Dict[str, Any] = {
        "personalInfo": {
            "firstName": "",
            "lastName": "",
            "jobTitle": "",
            "address": "",
            "phone": "",
            "email": "",
            "themeColor": "#F7FAFC"
        },
        "summary": "",
        "experience": [
            {
                "id": 1,
                "title": "",
                "companyName": "",
                "city": "",
                "state": "",
                "startDate": "",
                "endDate": "",
                "currentlyWorking": False,
                "workSummary": ""
            }
        ],
        "education": [
            {
                "id": 1,
                "universityName": "",
                "startDate": "",
                "endDate": "",
                "degree": "",
                "major": "",
                "description": ""
            }
        ],
        "skills": [
            {
                "id": 1,
                "name": "",
                "rating": 3
            }
        ]
    }
    EXPECTED_SCHEMA_JSON = json.dumps(EXPECTED_SCHEMA, ensure_ascii=False, indent=2)
    return (
        "You are an expert resume parser.\n\n"
        "TASK:\n"
        "Extract the user's resume into the EXACT JSON structure shown below.\n"
        "• Output ONLY a JSON object. No backticks, no prose, no Markdown.\n"
        "• Include ALL keys exactly as in the schema (even if values are empty strings/arrays).\n"
        "• If something is missing in the resume, return an empty string or empty array for that field.\n"
        "• Skills must be TECHNICAL ONLY (e.g., programming languages, frameworks, libraries, tools,\n"
        "  databases, cloud platforms, DevOps, ML/DL toolchains). Ignore soft skills such as\n"
        "  communication, leadership, teamwork, problem-solving, adaptability, time management, etc.\n"
        "• For each skill: provide an integer 'rating' from 1–5 based on your confidence that the\n"
        "  skill is demonstrated by the resume text.\n"
        "• For 'experience': set 'currentlyWorking' to true ONLY if the end date is clearly missing or\n"
        "  the role is marked as present/current (e.g., 'Present', 'Current'). Otherwise false.\n"
        "• Preserve date strings as they appear (e.g., 'Jan 2021', '2023 – Present').\n"
        "• Do NOT include any 'id' fields in arrays like experience, education, or skills.\n\n"
        "STRICT OUTPUT JSON SCHEMA (keys and types MUST match exactly, no 'id' fields):\n"
        f"{EXPECTED_SCHEMA_JSON}\n\n"
        "RESUME TEXT STARTS BELOW:\n"
        f"{resume_text}\n"
        "END OF RESUME TEXT.\n\n"
        "Return ONLY the JSON object—no extra text."
    )
