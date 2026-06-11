# Supabase Edge Functions - Environment Variables Setup

## Issue
The "Generate AI Lesson" feature requires the `OPENAI_API_KEY` to be available to Supabase Edge Functions.

## Solutions

### Option 1: Supabase Cloud Deployment (PRODUCTION) ✓ REQUIRED

If your project is connected to Supabase Cloud:

1. **Go to Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard

2. **Select Your Project**
   - Project name: `srojyfmzydftmuemlciz`

3. **Set Environment Variables**
   - Go to: **Settings** → **Functions** (or **Functions** in sidebar)
   - Scroll to **Environment Variables** section
   - Click **New Environment Variable**
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `sk-proj-your-actual-openai-key`
   - Click **Save**

4. **Redeploy Functions**
   - After setting env vars, redeploy your functions
   - Run: `supabase functions deploy generate-lesson`
   - Run: `supabase functions deploy generate-study-content`

### Option 2: Local Development (with Supabase CLI)

If you're running Supabase locally:

1. **Install Supabase CLI**
   ```bash
   npm install -g supabase
   ```

2. **Start Supabase Locally**
   ```bash
   supabase start
   ```

3. **Set Environment Variables**
   ```bash
   supabase secrets set OPENAI_API_KEY="sk-proj-your-key"
   ```

4. **Restart Dev Server**
   ```bash
   npm run dev
   ```

### Option 3: Using .env.local (Development Only)

For local testing only (not recommended for production):

1. Create `.env.local` file in project root:
   ```
   OPENAI_API_KEY="sk-proj-your-key"
   ```

2. Make sure `.env.local` is in `.gitignore` (it is ✓)

3. This only works if Supabase is running locally

## Quick Test

To verify the API key is accessible:

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Click "Generate AI Lesson"
4. Check the request to `rest/v1/functions/v1/generate-lesson`
5. Look for errors in the response

## Troubleshooting

**Error: "OpenAI API key not configured"**
- The environment variable is not set in Supabase
- Follow Option 1 (Cloud) or Option 2 (Local) above

**Error: "Failed to generate lesson from OpenAI"**
- API key exists but is invalid or expired
- Check your OpenAI account for active API quota
- Verify key format: should start with `sk-proj-`

**Error: "Invalid JSON response from OpenAI"**
- OpenAI returned unparseable response
- Check OpenAI API status
- Try increasing `max_tokens` in function code

## Security Reminder

🔒 **Never commit API keys to git!**
- ✅ Use Supabase Dashboard for production
- ✅ Use `.env.local` for local development only
- ✅ Add `.env` and `.env.local` to `.gitignore` ✓

---

**Next Steps:**
1. Choose your setup (Cloud/Local)
2. Follow the steps for your option
3. Test the "Generate AI Lesson" feature
4. Check browser console for detailed error messages
