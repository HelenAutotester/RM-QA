# RM Interview Playwright Practice

Independent educational demo project, NOT an official RM Education application.

## Setup

```powershell
npm.cmd install
npx.cmd playwright install chromium
```

## Run

```powershell
npx.cmd playwright test
npx.cmd playwright test tests/e2e --headed
npx.cmd playwright test tests/api
npx.cmd playwright show-report
```

The Playwright config starts the local demo automatically on port 3100.
To view it manually: `npm.cmd run demo`, then open http://127.0.0.1:3100/login.

Demo credentials: `student.a@example.test` / `Demo-only-pass-123!`.

## GitHub

Use VS Code Source Control > Initialize Repository (if needed), stage files, commit, and Publish to GitHub. Verify the GitHub account and destination repository before publishing. Do not commit secrets.
