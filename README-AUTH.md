# Authentication Setup with Better Auth

This project uses [Better Auth](https://www.better-auth.com/) for authentication with support for email/password and social login (Google and Facebook).

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Better Auth Configuration
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Google OAuth Configuration
# Get these from: https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Facebook OAuth Configuration
# Get these from: https://developers.facebook.com/apps/
FACEBOOK_CLIENT_ID=your_facebook_app_id_here
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret_here
```

## Setting Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Configure the OAuth consent screen if prompted
6. Choose **Web application** as the application type
7. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
8. Copy the **Client ID** and **Client Secret** to your `.env.local` file

## Setting Up Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or select an existing one
3. Add **Facebook Login** product to your app
4. Go to **Settings** > **Basic** and note your **App ID** and **App Secret**
5. In **Facebook Login** settings, add valid OAuth redirect URIs:
   - `http://localhost:3000/api/auth/callback/facebook` (for development)
   - `https://yourdomain.com/api/auth/callback/facebook` (for production)
6. Copy the **App ID** and **App Secret** to your `.env.local` file

## Usage

The social login buttons are available on the login page. Users can sign in with:
- Email and password
- Google account
- Facebook account

## API Routes

Better Auth handles authentication through the `/api/auth/*` routes automatically. The main route handler is located at `app/api/auth/[...all]/route.ts`.

## Client Usage

The auth client is available in client components via:

```typescript
import { authClient } from "@/lib/auth-client";

// Sign in with social provider
await authClient.signIn.social({
  provider: "google", // or "facebook"
  callbackURL: "/home",
});
```

