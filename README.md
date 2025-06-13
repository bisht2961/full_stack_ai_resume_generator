# 🧠 AI Resume Builder

An intelligent resume builder that uses AI to generate job-ready, professional resumes with customizable templates, export options, and sharing capabilities.

---

## 📸 Preview

![Template Preview 1](./screenshots/ui1.jpg)  
![Template Preview 2](./screenshots/ui2.jpg)
![Template Preview 1](./screenshots/ui3.jpg)  
![Template Preview 2](./screenshots/ui4.jpg)
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


```
.
├── backend/
│   └── src/
│       ├── main.py
│       └── ...other FastAPI routes & logic
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.jsx
│   ├── .env
│   ├── .env.production
│   └── vite.config.js
├── README.md
```

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
```

> API runs on `http://localhost:8000`

---

### 2️⃣ Frontend (Vite + React)

```bash
cd frontend
npm install
npm run dev
```

> Frontend runs on `http://localhost:5173`

---

## 🌍 Environment Setup

### Frontend `.env`:

```
VITE_API_BASE_URL=http://localhost:8000
```

### Frontend `.env.production`:

```
VITE_API_BASE_URL=https://your-backend.onrender.com
```

---

## 🧪 API Routes (Sample)

- `POST /personal-info`
- `POST /experience`
- `POST /generate-summary`
- `POST /upload-resume` (PDF)
- `GET /resume/{resume_id}`

---

## 🧾 Deployment

### Frontend
- Deployed via **Vercel** or **Netlify**
- Set `VITE_API_BASE_URL` to Render backend URL in production

### Backend
- Deployed on **Render**
- Add `requirements.txt`, `render.yaml`, and `start command`:
  ```
  uvicorn src.main:app --host 0.0.0.0 --port 10000
  ```

---

## 📚 Future Enhancements

- Multi-language support
- Role-based resume suggestions
- Resume analytics
- Drag-and-drop layout editor

---

## 📄 License

MIT License