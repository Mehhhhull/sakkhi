# 🌸 Sakkhi — Your Companion for Postpartum Healing

> “We ask about the baby. But who asks the mother how she’s doing?”

Sakkhi is **India’s first mother-first emotional wellness platform**, helping postpartum moms track healing through mood, voice, rituals, and community — all in a culturally sensitive, zero-judgment space.

---

## 🧠 Problem Statement

- 75%+ Indian mothers feel overwhelmed postpartum.  
- 22% suffer from postpartum depression, 80% go undiagnosed.  
- Every digital tool is baby-focused. *No one asks the mother how she’s doing.*

📰 Real stories show the urgency:
- Women setting themselves on fire
- Infanticide driven by untreated postpartum psychosis
- Young Indian mothers silently suffering

---

## 💡 Proposed Solution

Sakkhi is a digital platform that **centers the mother’s emotional healing**. Not a parenting app. Not a milestone tracker. Just a gentle space to reconnect with self.

What Sakkhi offers:
- Tracks emotional well-being (mood + voice logs)
- Builds a personal healing timeline
- Offers culturally sensitive rituals and support
- Enables optional peer support rooms based on lived experience

---

## ✨ Features

- 🎙️ **Suno Khud Ko**: Mood and voice check-ins analyzed using NLP  
- 🪞 **MyReflection**: Auto-built healing timeline  
- 🧘 **SootheSpace**: 3-min micro-rituals (breathe, affirm, ground)  
- 🫂 **Circle of One**: Anonymous support rooms based on experience  
- 📚 **Bharosa Library**: Stories from Indian moms who broke the silence  

---

## 🌈 What Makes It Unique

- 🧠 100% *mother-first* lens (no baby milestone tracking)
- 🪶 Quiet, ad-free, judgment-free healing corner
- 🇮🇳 Culturally contextual UX (joint families, stigma, language)
- 🎤 Voice journaling + emotion analysis using HuggingFace NLP
- 📈 Visual identity timeline – emotional journey becomes visible
- 🔒 Anonymous + encrypted. Built for trust and privacy

---

## 📱 Responsiveness

The entire platform is fully responsive.  
Whether you're using a phone, tablet, or desktop, the experience adapts smoothly and maintains usability across all devices.

---

---

## 🧩 Our Approach (Based on Human-Centered Design)

Sakkhi is thoughtfully built using the principles of **Human-Centered Design (HCD)** — where every decision stems from the real, lived experiences of postpartum mothers.

### 🌱 Phase-wise Development Strategy

1. **Empathize – Understanding Real Needs**
   - We explored actual case studies, journal articles, and real news stories to uncover how overlooked postpartum mental health is in India.
   - The pain points were emotional, cultural, and deeply personal — not just medical.

2. **Define – Framing the Right Problem**
   - Instead of focusing on the baby or parenting, we framed the platform entirely around the mother’s healing journey.
   - We aimed to remove pressure, judgment, and performance-based engagement from the experience.

3. **Ideate – Designing a Safe, Gentle Space**
   - Brainstormed features that respect emotional pacing: mood & voice check-ins, journaling, soothing rituals, optional support rooms.
   - Prioritized calmness, softness, and privacy over engagement or “growth hacking.”

4. **Prototype – Fast, Modular, Functional**
   - Set up a scalable React + Node architecture with clear routing and separate logic layers.
   - Created responsive, low-distraction UIs that are responsive and bandwidth-friendly.

5. **Test & Iterate – Learn & Refine**
   - Took feedback from mentors and peers at every checkpoint.
   - Improved tab functionality, responsiveness, and flow based on real-time testing.

---

> “This isn't just an MVP. Sakkhi is a space that *listens* before it speaks — built slowly, carefully, and humanely.”

## 📍 Hackathon Checkpoints

> ✏️ Filling in the updates after every checkpoint

### ✅ Checkpoint 1 – [08-07-2025 1:00 PM]

- Finalized problem, research, and solution direction  
- Defined core features and user experience  
- Set up GitHub repo and README  
- Assigned team roles and initial tech stack
- Finalized reference design for project
- Uploaded PPT of Problem Statement & Proposed Solution

---

### ✅ Checkpoint 2 – [08-07-2025 2:15 PM]

- Created folder structure
- Initialized React app and started React Router setup
- Created base routes for main pages (Home, Dashboard, etc.)
- Continued backend planning for check-in and sentiment endpoints
- Updated README

---

### ✅ Checkpoint 3 – [08-07-2025 4:09 PM]

- Started building the Home Page UI, designed other pages UI but will be enhancing it more in future
- Set up React Router with working paths for all core pages
- Now fully able to navigate between views (Landing, Dashboard, etc.)
- Frontend structure now stable for feature integration
- Updated README

---

### ✅ Checkpoint 4 – [08-07-2025 6:04 PM]

- Completed the full Landing Page UI
- Designed all remaining pages (Dashboard, Check-in, Peer Room, etc.)
- Started implementing authentication flow
- Frontend structure now fully ready for functional integration
- Updated README

---

### ✅ Checkpoint 5 – [08-07-2025 8:18 PM]

- Completed all three main pages
- Started working on backend logic (routes & controllers)
- Prepared frontend to start connecting with backend functions
- Updated README

---

## 🔄 Additional Commits (Between Checkpoints)

#### 📌 [09-07-2025 12:37 AM] 
- Set up backend file structure
- Added frontend microinteractions for smoother user experience
- Updated README

---

### ✅ Checkpoint 1 – [09-07-2025 2:17 PM]

- No commits made at this time
- Implemented feedback received from mentor session
- Made changes locally based on suggestions
- Tested minor improvements, but did not push any files to GitHub
- Updated README

---

### ✅ Checkpoint 2 – [09-07-2025 4:18 PM]

- Made core features functional
- Connected UI elements with functional logic
- Improved interaction between components (basic working structure done)
- Prepared pages for upcoming integrations
- Updated README

---

### ✅ Checkpoint 3 – [09-07-2025 6:38 PM]

- Fixed major and minor UI/UX bugs across pages
- Added relevant media (images/icons) where required
- Made 4 main tabs fully functional with proper routing and working logic
- Improved overall frontend experience and responsiveness
- Updated README

---

### ✅ Checkpoint 4 – [09-07-2025 9:07 PM]

- Gave final UI and UX polish to the entire platform
- All tabs are now built and functional (Almost)
- Integrated remaining features as planned (Almost)
- Verified responsiveness across devices
- Cleaned up codebase and finalized layouts
- Updated README

---

# 🌸 Sakkhi — Frontend Overview

This is the frontend of **Sakkhi**, a wellness platform focused on postpartum healing.  
Built with a clean tech stack, responsive design, and meaningful UI to serve users with softness and purpose.

---

## 🛠️ Tech Stack

| Tool / Library         | Purpose                            |
|------------------------|------------------------------------|
| **React 19**           | UI development                     |
| **Vite**               | Lightning-fast build tool          |
| **Tailwind CSS 4**     | Utility-first CSS framework        |
| **React Router v7**    | Routing between pages              |
| **Framer Motion**      | Page and element animations        |
| **Lucide React**       | Lightweight modern icon library    |
| **React Icons**        | Extended icon pack for components  |
| **Recharts**           | Graphs and data visualization      |
| **Date-fns**           | Date utilities                     |
| **ESLint**             | Linting and code quality checks    |

---

## ✨ Features Implemented in Frontend

- ✅ Fully responsive layout for mobile, tablet, and desktop  
- ✅ Functional routing between all main pages  
- ✅ Smooth page transitions using Framer Motion  
- ✅ Emotion timeline graphs using Recharts  
- ✅ Tailwind-powered, scalable component styling  
- ✅ Icons and visuals integrated using Lucide and React Icons  
- ✅ Micro-interactions for cleaner UX  
- ✅ Organized folder structure for scalability

---

## 📚 References & Acknowledgements

This project was built with deep respect for open-source tools and emotional wellness design.

- [Heroicons](https://heroicons.com) for icons  
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling  
- [Lucide Icons](https://lucide.dev) and [React Icons](https://react-icons.github.io/react-icons)  
- [Recharts](https://recharts.org/) for data visualization  
- Google Fonts and system fonts for clean typography  
- Inspiration drawn from wellness, journaling, and community-based platforms

🧡 All visual and code adaptations are original, with no direct reuse of copyrighted material

---

# 🌸 Sakkhi — Local Setup Guide

This is the official repository for **Sakkhi**, a self-love and emotional wellness platform for postpartum mothers.  
Follow the steps below to run the project locally.

---

## 📁 Folder Structure

sakkhi/
├── client/ → React frontend
├── server/ → Node.js backend

---

## 🚀 How to Run the Project Locally

### 1️⃣ Clone the Repository

- git clone https://github.com/Mehhhhull/sakkhi.git
- cd sakkhi

### 2️⃣ Run the Frontend

- cd client
- npm install
- npm run dev

### 3️⃣ Run the Backend

- cd server
- npm install
- npm run dev

---

# 💬 Need Help?
Contact the developers:

- Mehul Kumar Singh – mehulkumarsingh6@gmail.com
- Tanush Gupta – tanushgupta006work@gmail.com


