# Vercel deployment

This static site can be deployed to Vercel for design review. It must be labelled **Prototype — not for clinical use** until a backend supplies authenticated pharmacy access, tenant-scoped inventory, prescription handling, and immutable audit logs.

## Deploy

```bash
vercel --prod
```

No API keys, Firebase write credentials, or patient data may be added to this static deployment. Production pharmacy workflows should call the shared UniHealth API over HTTPS and use server-enforced roles such as pharmacist, pharmacy manager, and support administrator.
