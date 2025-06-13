# 🚀 AI Resume Builder

An AI-powered resume builder that helps users create, manage, and share stunning resumes with intelligent AI-generated content and beautiful templates.

---

## ✨ Features

- 🤖 AI-generated work summaries & bullet points  
- 🎨 Multiple template options & theme color picker  
- 📄 Export resumes as PDF  
- 🔗 Share resumes via public link  
- ✅ Editable sections: Summary, Experience, Education, Projects, Skills, Achievements  
- 🧠 Editable AI-generated bullet points modal  
- 🔐 Authentication with Clerk  

---

## 📁 Project Structure

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

### **Frontend**
- React
- Vite
- Tailwind CSS
- html2pdf.js
- react-router
- shadcn/ui
- Clerk Auth

### **Backend**
- FastAPI
- Supabase (Database & Storage)
- Pydantic
- Uvicorn

### **AI**
- OpenAI / Gemini APIs (via LangChain or direct)

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

### 2️⃣ Frontend (Vite + React)

```bash
cd frontend
npm install
npm run dev
```

> Make sure to configure both `.env` and `.env.production` in the `frontend/` and `backend/` folders with the appropriate API URLs and secrets.

---

### 🌐 Deployment

- **Frontend:** Vercel / Netlify  
- **Backend:** Render.com  
- **Database & File Storage:** Supabase

---

## 📸 Screenshots

![Template Preview 1](./screenshots/ui1.jpg)  
![Template Preview 2](./screenshots/ui2.jpg)
![Template Preview 1](./screenshots/ui3.jpg)  
![Template Preview 2](./screenshots/ui4.jpg)
![Template Preview 1](./screenshots/ui5.jpg)  
![Template Preview 2](./screenshots/ui6.jpg)
![Template Preview 1](./screenshots/ui7.jpg)  
---

## 👨‍💻 Author

**Sachin Bisht**  
🔗 [LinkedIn](https://linkedin.com/in/your-profile)  
📧 your.email@example.com

---

## 📄 License

MIT License