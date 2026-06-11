# OpenAI API Integration Setup Guide

## Overview
The "Generate AI Lessons" feature uses OpenAI's API to create educational content. This guide will help you properly configure the integration.

## Prerequisites
- OpenAI account with API access
- Active API key from OpenAI
- Access to Supabase project dashboard
- Basic understanding of environment variables

## Step 1: Get Your OpenAI API Key

1. Visit [OpenAI API Keys Page](https://platform.openai.com/api/keys)
2. Sign in with your OpenAI account
3. Click "Create new secret key"
4. Copy the generated key (save it securely - you won't see it again)

## Step 2: Configure Locally

### Option A: Using Environment File (Local Development)

1. Open `.env` in the root directory
2. Replace the placeholder with your actual API key:
```
OPENAI_API_KEY="sk-proj-your-actual-api-key-here"
```

3. Restart your development server:
```bash
npm run dev
# or
bun run dev
```

### Option B: Configure in Supabase Console (Production/Deployment)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (`srojyfmzydftmuemlciz`)
3. Navigate to **Settings → Functions**
4. Under **Environment Variables**, add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `sk-proj-your-actual-api-key-here`
5. Click **Add** and then **Save**

## Step 3: Verify the Setup

### Test the Generate Lesson Function Locally

```bash
# Run the development server
npm run dev
```

1. Navigate to the Feed section in your app
2. Click the "Generate AI Lesson" button
3. Fill in:
   - Topic: "Newton's Laws"
   - Subject: "Physics"
   - Exam Type: "JEE Main"
4. Click "Generate"

**Expected Result**: A lesson should be generated with title, content, key points, examples, and practice questions.

### Test via Supabase CLI

```bash
# If you have supabase CLI installed
supabase functions invoke generate-lesson --body '{
  "topic": "Photosynthesis",
  "subject": "Biology",
  "exam_type": "neet"
}'
```

## API Models Used

- **Model**: `gpt-4o-mini` (cost-effective and fast)
- **Alternative**: `gpt-4-turbo` (higher quality, higher cost)
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Max Tokens**: 2000 for lessons, 3000 for study content

## Cost Estimation

For `gpt-4o-mini`:
- ~1000 tokens per lesson generation ≈ $0.00015 USD
- ~2000 tokens per study content ≈ $0.0003 USD

## Features Implemented

### 1. Generate Lesson Function
- **Endpoint**: `generate-lesson` Supabase Edge Function
- **Input**: topic, exam_type, subject
- **Output**: Structured lesson with content, key points, examples, and practice questions
- **Located in**: [supabase/functions/generate-lesson/index.ts](supabase/functions/generate-lesson/index.ts)

### 2. Generate Study Content Function
- **Endpoint**: `generate-study-content` Supabase Edge Function
- **Input**: chapter, subject, exam_type, content_type (notes/questions/mock)
- **Output**: Study materials in requested format
- **Located in**: [supabase/functions/generate-study-content/index.ts](supabase/functions/generate-study-content/index.ts)

## Troubleshooting

### Error: "OpenAI API key not configured"
- **Cause**: `OPENAI_API_KEY` environment variable is missing
- **Solution**: Add it to `.env` file or Supabase environment variables

### Error: "Failed to generate lesson from OpenAI"
- **Cause**: Invalid API key or insufficient API credits
- **Solution**: 
  - Verify your API key is correct
  - Check OpenAI dashboard for active API quota
  - Ensure account has billing enabled

### Error: "Invalid JSON response from OpenAI"
- **Cause**: OpenAI returned unparseable response
- **Solution**: 
  - Check function logs: `supabase functions list`
  - Try adjusting the prompt or increasing max_tokens
  - Switch to `gpt-4-turbo` model if issues persist

### Function Takes Too Long
- **Cause**: OpenAI API is slow or max_tokens is too high
- **Solution**:
  - Reduce max_tokens (currently 2000 for lessons)
  - Increase temperature for shorter responses
  - Consider caching generated lessons

## Security Notes

⚠️ **IMPORTANT**:
1. Never commit `.env` files with real API keys to git
2. Never share your API key publicly
3. Use Supabase environment variables for production
4. Rotate API keys periodically
5. Monitor API usage in OpenAI dashboard

## Next Steps

1. ✅ Add OpenAI API key to `.env`
2. ✅ Restart development server
3. ✅ Test the "Generate AI Lesson" feature
4. ✅ Deploy to production with Supabase environment variables
5. 📊 Monitor usage and costs in OpenAI dashboard

## Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [gpt-4o-mini Model Info](https://platform.openai.com/docs/models/gpt-4o-mini)

---

**Last Updated**: June 2026
