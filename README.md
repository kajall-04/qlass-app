# Qlass Web Application

Welcome to the **Qlass** project repository! This repository contains the front-end source code and prototypes for the Qlass educational platform, serving students, teachers, and administrators.

## 📂 Repository Structure

- **/qlass-app** - The primary Next.js (React) application. This is where the core web application lives.
- **/qlass** - HTML/CSS/JS static prototype files.
- **index.html & styles.css** - Root prototype/proposal documents.

---

## 🚀 How to Run the Next.js Application Locally

If you are a team member looking to run, preview, or edit the main web application, follow these steps:

### Prerequisites
Make sure you have the following installed on your computer:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (Version 18 or higher recommended)

### Step 1: Clone the Repository
Open your terminal and clone this repository to your local machine:
```bash
git clone https://github.com/kajall-04/qlass-app.git
```
*(Note: If you already have the code locally from the zip file or previously, you can skip this step.)*

### Step 2: Navigate to the App Directory
Open the terminal inside the main folder, then navigate into the Next.js app directory:
```bash
cd qlass-app
```

### Step 3: Install Dependencies
Run the following command to download all required packages. (You only need to do this the first time, or if someone adds a new package):
```bash
npm install
```

### Step 4: Start the Development Server
```bash
npm run dev
```

### Step 5: View in Browser
Open your web browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

---

## 🎨 How to View the HTML Prototypes

If you or your team just want to view the static UI prototypes without installing Node.js, you can simply open the HTML files directly in your web browser!

1. Open the repository folder on your computer.
2. Double-click on `index.html` (in the root directory) or `qlass/index.html`.
3. It will open directly in your default web browser.

---

## 🤝 Contribution Workflow for the Team

When working on this project together, please follow this everyday workflow to keep everyone's code in sync:

1. **Pull the latest changes** before you start working every day, to make sure you have your team's newest updates:
   ```bash
   git pull origin main
   ```
2. Make your code edits, modifications, and test them locally.
3. **Add and commit** your changes:
   ```bash
   git add .
   git commit -m "Brief description of what you changed or added"
   ```
4. **Push** the updates up to GitHub for the rest of the team:
   ```bash
   git push origin main
   ```
