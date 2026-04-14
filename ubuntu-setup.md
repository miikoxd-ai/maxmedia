# Run Max Media Marketing locally on Ubuntu

This guide covers the current version of the site, including the editable backend content model and admin editor.

## 1. Install prerequisites

Open a terminal and install the required tooling.

```bash
sudo apt update
sudo apt install -y curl git
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo corepack enable
sudo corepack prepare pnpm@latest --activate
```

Verify the toolchain.

```bash
node -v
pnpm -v
git --version
```

## 2. Get the code

```bash
git clone <YOUR_REPOSITORY_URL>
cd max-media-marketing-site
```

## 3. Install packages

```bash
pnpm install
```

## 4. Add environment variables

If you are running this outside Manus, create a `.env` file with the variables required by the app.

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

Inside Manus these values are already injected, so no manual `.env` work is needed there.

## 5. Push the schema

```bash
pnpm db:push
```

This ensures the `siteContent` table exists and the auth/user schema is current.

## 6. Start the app

```bash
pnpm dev
```

Open the local URL printed by the terminal.

## 7. Open the admin editor

The public site loads at the root path, and the content editor is available at:

```text
/admin
```

You must be logged in as an `admin` user to save content changes.

## 8. Run tests

```bash
pnpm test
```

## Troubleshooting

| Problem | Likely cause | Fix |
| --- | --- | --- |
| `pnpm db:push` fails | Missing database connection | Recheck `DATABASE_URL` |
| OAuth login does not work | Missing Manus auth variables | Confirm `VITE_APP_ID`, `OAUTH_SERVER_URL`, and `VITE_OAUTH_PORTAL_URL` |
| Admin save fails | User is not an admin | Update the user role in the database |
| Port conflict | Another process is using the dev port | Stop the conflicting process or rerun after freeing the port |

## Copy-paste quick start

```bash
sudo apt update
sudo apt install -y curl git
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo corepack enable
sudo corepack prepare pnpm@latest --activate
git clone <YOUR_REPOSITORY_URL>
cd max-media-marketing-site
pnpm install
pnpm db:push
pnpm dev
```
