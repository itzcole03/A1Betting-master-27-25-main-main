# Cursor Workflow Best Practices

## 1. Agent Mode
- Use Agent Mode for all major features, refactors, and multi-file changes.
- Let the agent handle end-to-end tasks, dependency installation, and complex refactoring.

## 2. Start New Chats for New Features
- Always start a new chat for each feature or bugfix to avoid context bloat.
- Use the "Add" button and select "Recent Changes" for context continuity.

## 3. Context Management with @ Symbols
- Use @code, @web, @docs, @files, @cursor rules, and images to give Cursor precise context.
- Example: `@UserProfile.tsx Add an edit button` or `@auth.js @docs Why am I getting 401 errors?`

## 4. Model Selection
- Choose the best model for your task. Claude 3.5 Sonnet is recommended for balanced, high-quality responses.

## 5. Advanced Autocomplete and Command+K
- Use Command+K for rapid code generation, refactoring, and multi-line edits.

## 6. Custom Rules for Consistency
- Leverage `.cursor/rules` for project-specific standards. Refine and add rules as the project evolves.

## 7. Restore Checkpoints
- Use Cursor's checkpoint/restore feature to quickly revert to previous states if an iteration goes off track.
- Create a checkpoint before major changes.

## 8. .gitignore Awareness
- Ensure all secrets and sensitive files (like `.env`) are included in `.gitignore`.
- Cursor respects `.gitignore` and avoids adding ignored content to its context window.

## 9. Review and Iterate
- Regularly review AI output and update rules and workflow as needed.
- Use rule validation and monitoring tools if available. 