
# Backend

This directory contains the Supabase Edge Functions that power the backend services.

## Structure
- `functions/`: Supabase Edge Functions
- `config.toml`: Supabase configuration

## Deploying functions
Deploy the functions using the Supabase CLI:

```
supabase functions deploy paypal-payment
```

Or from the root:

```
npm run deploy:functions
```
