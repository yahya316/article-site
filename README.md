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

---


#### This is for V2 Branch


### Blog Content Management System
Welcome to the Blog Content Management System! This is a Next.js-based application designed to manage articles, user profiles, quotes, and search functionality, with an admin dashboard and user-facing pages. The project uses MongoDB as its database and follows the App Router structure for modern web development.

### Overview
This project provides:

User Management: Register, login, and manage user profiles.
Article Management: Create, read, update, and delete articles with categories and tags.
Quote Management: Manage mini-quotes and hero-quotes, some with associated images.
Search Functionality: Search across users, articles, and quotes.
Admin Dashboard: Admin-specific routes for content and user management.
Responsive Design: Built with reusable components and Tailwind CSS.

The application is structured to separate admin and user experiences, with API routes handling data operations and Server Components for efficient rendering.
Prerequisites

Node.js (v18 or later)
npm or yarn
MongoDB (local or remote instance)

### Installation

Clone the Repository
git clone https://github.com/your-username/your-repo.git
cd your-repo


### Install Dependencies
```
npm install
```

Set Up Environment VariablesCreate a .env.local file in the root directory and add the following:
MONGODB_URI=mongodb://localhost:27017/blog


Replace mongodb://localhost:27017/blog with your MongoDB connection string if using a remote database.
No NEXT_PUBLIC_API_URL is needed for server-side fetches; relative URLs are used.


Run MongoDBEnsure MongoDB is running locally:
mongod

Or connect to your remote MongoDB instance.

Seed the Database (Optional)If the articles, users, miniQuotes, heroQuotes, or pendingQuotes collections are empty, seed them manually using MongoDB shell commands (e.g., db.articles.insertOne({...})) or create a seed script.

## Start the Development Server
```
npm run dev
```
Open http://localhost:3000 in your browser.


### Usage

User Pages: Access articles at /articles or individual articles at /articles/[slug].
Admin Dashboard: Navigate to /dashboard (requires authentication) for content and user management.
Search: Use the search bar (e.g., on /dashboard) to find users, articles, or quotes.
API Endpoints: Interact with data via /api/articles, /api/search, etc., for CRUD operations.

### Example Routes

/articles: List all articles.
/articles/sample-article: View a specific article.
/dashboard/content: Manage articles and quotes (admin-only).
/api/articles: Fetch all articles (GET) or create a new one (POST).

### Project Structure
```
project/
├── app/
│   ├── (admin)/
│   │   ├── dashboard/
│   │   │   ├── page.js
│   │   │   ├── content/page.js
│   │   │   ├── profile/page.js
│   │   │   ├── settings/page.js
│   ├── (user)/
│   │   ├── articles/
│   │   │   ├── page.js
│   │   │   ├── [slug]/page.js
│   ├── api/
│   │   ├── articles/route.js
│   │   ├── profile/route.js
│   │   ├── settings/route.js
│   │   ├── search/route.js
│   │   ├── mini-quotes/route.js
│   │   ├── hero-quotes/route.js
│   │   ├── submit-quote/route.js
│   │   ├── get-pending-quotes/route.js
│   │   ├── pending-quotes/route.js
│   │   ├── users/route.js
├── components/
│   ├── PageHero.js
│   ├── ArticleCard.jsx
│   ├── SearchBar.jsx
│   ├── UserQuoteForm.js
│   ├── Navbar-1.js
├── models/
│   ├── User.js
│   ├── Article.js
│   ├── MiniQuote.js
│   ├── HeroQuote.js
│   ├── PendingQuote.js
├── public/
│   ├── images/
│   │   ├── default.jpg
│   │   ├── img-1.jpg
│   │   ├── img-2.jpg
│   │   ├── img-3.jpg
├── lib/
│   ├── mongoose.js
├── env.local
```

app/: Contains Next.js App Router pages and API routes.
```
/(admin)/: Admin-specific pages (e.g., dashboard, content management).
/(user)/: User-facing pages (e.g., articles).
api/: Serverless API routes for data operations.
```

components/: Reusable React components with Tailwind CSS styling.
```
models/: Mongoose schemas for MongoDB collections (e.g., articles, users, miniQuotes).
public/: Static assets like images.
lib/: Utility functions (e.g., MongoDB connection).
.env.local: Environment variables for MongoDB.
```
### Contributing

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit them (git commit -m "Add new feature").
Push to the branch (git push origin feature-branch).
Open a Pull Request with a clear description of your changes.

### Guidelines

Follow the existing code style (JavaScript, JSX, Tailwind CSS).
Add tests or update documentation for new features.
Ensure MongoDB schema changes are reflected in models.


Built with Next.js.
Styled with Tailwind CSS.
Database powered by MongoDB and Mongoose.
Icons from React Icons.

Support
For issues or questions, please open an issue on the GitHub repository or contact the maintainers.

Last updated: August 27, 2025, 05:38 PM PKT
