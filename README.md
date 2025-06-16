# BuildInPubliq 🚀

A tool to **build in public** — easily craft, schedule, and share your project updates with the world.

---

## 🧭 Overview

**BuildInPubliq** lets developers and creators publicly share their progress, setbacks, and wins—whenever they want. Whether you're tweeting, blogging, or updating a community feed, this tool simplifies the process with manual and scheduled posts.

---

## ✨ Features

- **Manual posts** – Share updates instantly
- **Scheduled posts** – Plan your public updates ahead of time
- Built with **Next.js** (frontend) & a separate **backend API**
- Responsive, modern UI—built with the latest web tech

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Shadcn
- **Backend**: Node.js / Express API
- **Database**: PostgreSQL, Redis
- **Deployment**: Vercel / Cloudflare

---

## 🚀 Demo

_Deployed version coming soon!_  
Follow updates on Twitter: [@manishdevrani77](https://twitter.com/manishdevrani77)

---

## 🧩 Installation

1. Clone this repo:

   ```bash
   git clone https://github.com/manish591/buildinpubliq.git
   cd buildinpubliq
   ```

2. Insall dependencies:

   ```bash
   npm install
   ```

3. Running postgres locally and update env with database url

   ```bash
   docker run --name my-postgres -e POSTGRES_PASSWORD=my-password -p 5432:5432 -d postgres
   ```

4. Generate prisma client:

   ```bash
   npx prisma generate
   ```

5. Run application:
   ```bash
   npm run dev
   ```

## 🧩 Github oauth app creation guide

Our application authorizes users using GitHub OAuth. To create a GitHub OAuth application, please refer to [this guide](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app).

To access repositories, we need to create a GitHub App that users can install on their GitHub account. To create a GitHub App, refer to [this guide](https://docs.github.com/en/apps/creating-github-apps).
