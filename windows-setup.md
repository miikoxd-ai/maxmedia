# Run Max Media Marketing locally on Windows

This guide assumes you want to run the current project with the editable backend, database integration, and admin editor.

## 1. Install prerequisites

Install the following tools first.

| Tool | Recommended version | Notes |
| --- | --- | --- |
| Node.js | 22.x | Includes `corepack` support for pnpm |
| pnpm | latest via corepack | Package manager used by the project |
| Git | latest | Needed to clone the repository |

Open **PowerShell** and run:

```powershell
node -v
corepack enable
pnpm -v
git --version
```

If `pnpm` is not available after enabling corepack, run:

```powershell
corepack prepare pnpm@latest --activate
```

## 2. Get the project code

```powershell
git clone <YOUR_REPOSITORY_URL>
cd max-media-marketing-site
```

If you downloaded a ZIP instead, extract it and open PowerShell inside the project folder.

## 3. Install dependencies

```powershell
pnpm install
```

## 4. Add environment variables

Create a `.env` file only for local development if your deployment platform does not inject variables automatically.

You will need values for the following variables used by the app:

```env
DATABASE_URL=
JWT_SECRET=
VITE_APP_ID=
OAUTH_SERVER_URL=
VITE_OAUTH_PORTAL_URL=
OWNER_OPEN_ID=
OWNER_NAME=
BUILT_IN_FORGE_API_URL=
BUILT_IN_FORGE_API_KEY=
VITE_FRONTEND_FORGE_API_URL=
VITE_FRONTEND_FORGE_API_KEY=
```

If you are running the project inside Manus, these values are already managed for you. For an external local clone, copy the same values from your environment management panel.

## 5. Push the database schema

```powershell
pnpm db:push
```

This creates or updates the `siteContent` table and keeps the user/auth tables aligned with the current schema.

## 6. Start the development server

```powershell
pnpm dev
```

When the server starts, open the local URL shown in the terminal.

## 7. Use the website

The public homepage reads editable content from the backend. The admin editor is available at:

```text
/admin
```

Log in with an account that has the `admin` role if you want to update the site content.

## 8. Run tests

```powershell
pnpm test
```

## Troubleshooting

| Problem | Likely cause | Fix |
| --- | --- | --- |
| `pnpm` not found | Corepack not enabled | Run `corepack enable` and `corepack prepare pnpm@latest --activate` |
| Database migration fails | `DATABASE_URL` missing or invalid | Recheck your environment variables |
| Login redirects fail | OAuth variables missing | Confirm `VITE_APP_ID`, `OAUTH_SERVER_URL`, and `VITE_OAUTH_PORTAL_URL` |
| Admin page opens but cannot save | Current user is not an admin | Promote the user role in the database before testing admin edits |

## Copy-paste quick start

```powershell
corepack enable
corepack prepare pnpm@latest --activate
git clone <YOUR_REPOSITORY_URL>
cd max-media-marketing-site
pnpm install
pnpm db:push
pnpm dev
```
