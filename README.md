# Coopers To-Do List — Frontend

A full-stack technical challenge for Coopers Digital. A responsive single-page application featuring user authentication, a drag-and-drop to-do list, a horizontal carousel, and a contact form.

## Features

- **Authentication** — user registration and login with JWT-based session management
- **To-Do List** — create, edit inline, mark as done, and delete tasks; items move between pending and completed lists automatically
- **Drag & Drop** — reorder tasks with smooth drag-and-drop powered by @dnd-kit
- **Good Things Carousel** — horizontal card navigation with Swiper
- **Contact Form** — validated form with Zod + React Hook Form
- **Responsive** — mobile-first layout built with Tailwind CSS v4

## Tech Stack

| Category    | Library / Tool                   |
| ----------- | -------------------------------- |
| UI          | React 19, TypeScript             |
| Styling     | Tailwind CSS v4                  |
| Build       | Vite 8                           |
| Routing     | React Router v7                  |
| HTTP        | Axios                            |
| Forms       | React Hook Form + Zod            |
| Drag & Drop | @dnd-kit/core, @dnd-kit/sortable |
| Carousel    | Swiper                           |

## Prerequisites

- [Node.js](https://nodejs.org) 20+
- [NPM](https://www.npmjs.com/) 11+
- Backend API running (see [backend setup](#backend))

## Installation

```bash
git clone <repository-url>
cd front-to-do-list
npm install
```

## Environment Variables

Create a `.env` file at the project root:

```env
VITE_API_URL=http://localhost:3334
```

## Backend

This frontend consumes a REST API. The default base URL is `http://localhost:3334`. Make sure the backend is running before starting the dev server.

Backend repository: [MatheusKerscher/back-to-do-list](https://github.com/MatheusKerscher/back-to-do-list)

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Type-check and build for production
npm run preview      # Preview the production build locally
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with --fix flag
npm run format       # Format code with Prettier
```

## Project Structure

```
src/
├── assets/            # Images and static files
├── components/
│   ├── auth/          # LoginForm, RegisterForm, AuthModal
│   ├── layout/        # Navbar, Footer
│   ├── sections/      # HeroSection, TodoSection, GoodThingsSection, ContactSection
│   ├── todo/          # TodoList, TodoColumn, TodoItem, AddTodoInput
│   └── ui/            # Shared primitives (Button, Input)
├── contexts/          # AuthContext — global auth state
├── hooks/             # useAuth
├── pages/             # HomePage
├── services/          # Axios instance, authService, todoService
└── types/             # Shared TypeScript types
```

## License

[MIT](./LICENSE)
