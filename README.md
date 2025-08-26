# Quotes & Articles Platform

A modern web application built with **Next.js** and **Tailwind CSS**, where users can:

- Explore motivational **quotes**
- Read **articles**
- Submit their own **quotes**
- View content served via **API routes**

Instead of a traditional database, this project uses **JSON files** stored inside the project as a lightweight data source.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Source**: JSON files (in `/data`)
- **APIs**: Next.js API routes for sharing data between pages and components

---

## Project Structure
```
├── app/
│ ├── admin/ # Admin-related pages
│ │ ├── dashboard/ # Dashboard view
│ │ ├── manage-quote/ # Manage submitted quotes
│ │ ├── submit-quote/ # User quote submission
│ │ └── ...
│ ├── api/ # API routes (serving JSON data)
│ ├── quotes/ # Quotes page
│ ├── articles/ # Articles page
│ ├── layout.js # Main layout
│ └── page.js # Homepage
│
├── components/ # Reusable UI components
├── data/ # JSON files acting as database
├── public/ # Static assets
├── styles/ # Global styles
└── ...
```
---

## Installation & Setup

Follow these steps to run the project locally:

### Clone the repository
```bash
git clone https://github.com/yahya316/blog-site
cd blog-site
npm install
npm run dev
Go-to: 'http://localhost:3000'
```

---

## API Endpoints

This project serves JSON data through Next.js API routes. Example endpoints:
```
/api/quotes → Get all quotes
/api/articles → Get all articles
/api/submit-quote → Submit a new quote
```
---

# Developer

## Muhammad Yahya Khan
Developed by https://github.com/yahya316
