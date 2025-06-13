# 🧠 AI Resume Builder

An intelligent resume builder that uses AI to generate job-ready, professional resumes with customizable templates, export options, and sharing capabilities.

---

## 📸 Preview

![Template Preview 1](./screenshots/template1.jpg)  
![Template Preview 2](./screenshots/template2.jpg)

---

## 🚀 Features

- ✨ AI-generated summaries and experiences (using LLM APIs)
- 📝 Rich Text Editor for job/project descriptions
- 🎨 Multiple customizable resume templates
- 📄 PDF generation using `html2pdf.js`
- 🔗 Share resumes with public links
- 🔒 Authenticated user sessions using Clerk
- 📦 Backend using **FastAPI** and **Supabase** for storage and database
- 🌐 Frontend built with **React + Vite + TailwindCSS**

---

## 🗂 Project Structure

---

## ⚙️ Technologies Used

**Frontend**
- React
- Vite
- Tailwind CSS
- html2pdf.js
- react-router
- shadcn/ui
- Clerk Auth

**Backend**
- FastAPI
- Supabase (Database & Storage)
- Pydantic
- Uvicorn

**AI**
- OpenAI or Gemini APIs (via LangChain or direct)

---

## 🧑‍💻 Local Setup Instructions

### 1️⃣ Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn src.main:app --reload

cd frontend
npm install
npm run dev


