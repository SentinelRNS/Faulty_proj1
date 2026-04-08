# QuickNote - Intentionally Flawed Web App

This is a note-taking application designed for testing AI code review tools. It contains multiple intentional security vulnerabilities, architectural flaws, and bad practices.

## Features
- Create Notes
- View All Notes
- Filter Notes by User
- Delete Notes

## Intentional Flaws Included
1. **SQL Injection**: The filtering and note creation endpoints use string concatenation for SQL queries.
2. **Cross-Site Scripting (XSS)**: Notes are rendered using `innerHTML` without sanitization.
3. **Hardcoded Secrets**: The admin password is hardcoded in the server.
4. **Poor Architecture**: All logic is in `server.js`.
5. **No Authentication**: The delete endpoint is unprotected.
6. **No Input Validation**: Any data can be sent to the database.
7. **Minimal Error Handling**: Generic error messages and lack of try/catch.
8. **Duplicate Code**: Logic is repeated across different endpoints.
9. **Inefficient Logic**: Client-side filtering and redundant fetches.
10. **TODO Comments**: Leftover comments for obvious fixes.

## Prerequisites
- Node.js (v14 or later recommended)
- npm

## How to Run

1. Navigate to the project directory:
   ```bash
   cd quicknote
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## WARNING
This application is **insecure by design**. Do not use it for anything other than testing code analysis tools. Do not host it on a public network.
