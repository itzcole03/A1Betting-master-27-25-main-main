# A1Betting Project Instructions

## Project Overview

A1Betting is a sports betting analysis platform providing ultra-accurate predictions and analytics for users. The platform consists of a FastAPI backend (Python) and a React/TypeScript frontend.

## Features

- Real-time sports data ingestion and analysis
- PrizePicks API integration for prop projections
- Advanced ML models for prediction and value scoring
- User-friendly dashboards (Money Maker Pro, PrizePicks Pro, PropOllama)
- Error handling and graceful fallbacks for API issues
- Secure credential management (no hardcoded secrets)
- Comprehensive logging and monitoring
- Unit and integration tests for all major features

## Tech Stack

- Backend: Python, FastAPI, SQLite, ML libraries (XGBoost, etc.)
- Frontend: React, TypeScript, Vite, CSS Modules
- Testing: Pytest, Jest, React Testing Library

## Project Structure

- backend/: FastAPI app, services, models, routes
- frontend/: React app, components, services, utils
- .cursor/rules/: Cursor project and code standards

## Build & Run

- Backend: `cd backend && python main.py`
- Frontend: `cd frontend && npm run dev`

## Coding Standards

- See .cursor/rules/*.mdc for detailed standards
- Use environment variables for all secrets
- Write and maintain tests for all critical features
- Document all major changes in README.md

## Workflow

- Use Cursor Agent Mode for multi-file changes
- Reference relevant files with @-commands in prompts
- Confirm understanding of tasks before major changes
- Review all AI-generated code for correctness and security

## Contact

For questions, see README.md or contact the project maintainer.

## Cursor Workflow Best Practices

- **Agent Mode:** Use for all major features, refactors, and multi-file changes.
- **New Chats:** Start a new chat for each feature or bugfix to avoid context bloat.
- **@-Context:** Always reference relevant files, docs, or web resources using @ in your prompts.
- **Model Selection:** Use Claude 3.5 Sonnet for balanced, high-quality responses.
- **Command+K:** Use for rapid code generation, refactoring, and multi-line edits.
- **Checkpoints:** Create a checkpoint before major changes for easy rollback.
- **.gitignore:** Ensure all secrets and sensitive files are ignored.

## API Integrations and Error Handling Policy

### PrizePicks

- **Endpoint:** `https://api.prizepicks.com/projections`
- **Authentication:** No official API key required or available. This is a public, undocumented endpoint.
- **Note:** The system may be rate-limited or blocked by PrizePicks. All error handling and fallback logic should account for this.

### Sportradar / TheOdds

- **API Keys:** Required and stored in `.env` (never committed to version control).
- **Usage:** [Describe where/how these keys are used in the codebase.]

### Error Handling

- If PrizePicks API is unavailable or rate-limited, the system will:
  - Surface a clear user-facing message:  
    _"Live data unavailable. Displaying sample data. Please try again later."_
  - Only use mock data in development or as a last-resort fallback, never silently in production.
