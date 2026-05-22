# AI Integrity Hub - Tilburg University

An educational platform for students to understand, recognize, and prevent AI hallucinations.

## Local Development

1. Clone the repository.
2. Run `docker compose up --build`.
3. Access the frontend at `http://localhost:3000`.
4. Access the API at `http://localhost:5000/api/health`.

## Deployment

This stack is designed to be deployed on Coolify as a Docker Compose project.
Ensure `NEXT_PUBLIC_API_URL` is set to your public API domain during build.