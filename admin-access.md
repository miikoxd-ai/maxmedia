# Admin Access Notes

The public marketing site is intended to live on the main domain, for example `maxmedia.com`.

The protected editor is now implemented in two compatible ways:

1. `https://your-domain/admin` on the main website host.
2. `https://admin.your-domain/` when an `admin.` subdomain is pointed at the same Manus project.

## How it works

The frontend routing now checks the hostname at runtime.

- On the main host, `/` renders the public website and `/admin` renders the password-protected dashboard.
- On an `admin.` host, `/` renders the password-protected dashboard directly.

## Important constraint

`maxmedia/admin.com` is not a valid subdomain format. If you want a separate admin domain, the correct structure is `admin.maxmedia.com`.

## Recommended setup

- Bind `maxmedia.com` to the public website.
- Bind `admin.maxmedia.com` to the same project in the domain settings.
- Share the admin password only with trusted editors.
- Keep the public site free of any edit buttons or editing affordances.
