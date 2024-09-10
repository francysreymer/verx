# Verx Test

A Full-Stack Web Application

## Introduction

This project is a full-stack web application that includes a backend built with Node.js, TypeScript, Express, and PostgreSQL, and a frontend built with Next.js, TypeScript, and React. The backend is containerized using Docker, allowing for easy deployment and management. 
The frontend is accessible at `http://localhost:3000`.
The backend is accessible at `http://localhost:3002`.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Documentation](#documentation)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/)
- [npm](https://www.npmjs.com/)

### Backend Setup

1. **Clone the repository:**

    ```bash
    git clone git@github.com:francysreymer/verx.git
    cd verx
    ```

2. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

3. **Install the dependencies:**

    ```bash
    npm install
    ```

4. **Run Docker containers:**

    ```bash
    docker-compose up -d
    ```

5. **Start the backend server:**

    ```bash
    npm start
    ```
The backend should now be running at [http://localhost:3002](http://localhost:3002).

### Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

3. **Start the frontend server:**

    ```bash
    npm run dev
    ```

The frontend should now be running at [http://localhost:3000](http://localhost:3000).

## Usage

- **Backend:** Accessible at `http://localhost:3002/api`.
- **Frontend:** Accessible at `http://localhost:3000`.

## Features

- **Backend:**
  - RESTful API with Express
  - Database integration with PostgreSQL
  - Containerized environment with Docker
  - TypeScript for type safety

- **Frontend:**
  - Server-side rendering with Next.js
  - Interactive UI with React
  - TypeScript for type safety

### Backend

- Node.js
- Express
- TypeScript
- PostgreSQL
- Docker

### Frontend

- Next.js
- React
- Redux
- TypeScript

## Documentation

- **Backend API Documentation**: Available via Swagger or Postman collection.
The backend documentation should now be running at [http://localhost:3002/api-docs](http://localhost:3002/api-docs).
