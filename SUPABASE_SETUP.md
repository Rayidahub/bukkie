# Supabase Backend Setup Guide

This guide will help you connect your portfolio to Supabase for persistent cloud storage.

## 🎯 What You'll Get

- **Cloud Database**: All your content stored securely in the cloud
- **Real-time Updates**: Changes sync instantly across all devices
- **No Data Loss**: Content persists even if you clear browser data
- **Professional Backend**: Production-ready database with proper schema

## 📋 Prerequisites

- A Supabase account (free tier is sufficient)
- Your portfolio project files
- Basic understanding of SQL (don't worry, we'll provide everything)

## 🚀 Step-by-Step Setup

### Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click **"New Project"**
4. Fill in the details:
   - **Name**: `esther-portfolio` (or any name you prefer)
   - **Database Password**: Choose a strong password (save it somewhere safe!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Free (perfect for this project)
5. Click **"Create new project"**
6. Wait for the project to initialize (takes about 2 minutes)

### Step 2: Set Up the Database Schema

1. In your Supabase dashboard, click on **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the file `supabase-schema.sql` from your project
4. Copy **ALL** the SQL code
5. Paste it into the Supabase SQL Editor
6. Click **"Run"** (or press Ctrl+Enter / Cmd+Enter)
7. You should see "Success. No rows returned" for each statement

✅ Your database tables are now created!

### Step 3: Get Your API Credentials

1. In your Supabase dashboard, click on **"Settings"** (gear icon) in the left sidebar
2. Click on **"API"**
3. You'll see two important values:
   - **Project URL**: Looks like `https://xxxxx.supabase.co`
   - **anon public key**: A long string starting with `eyJ...`

4. Copy both values

### Step 4: Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual credentials:

```env
VITE_SUPABASE_URL=https://your-actual-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ your-actual-anon-key-here...
```

3. Save the file

⚠️ **Important**: Never commit your `.env` file to Git! It's already in `.gitignore`.

### Step 5: Test the Connection

1. Make sure your development server is running:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3000`

3. If everything is set up correctly, you should see your portfolio loading normally

4. Go to the admin panel (`http://localhost:3000/admin`)
5. Make a change (e.g., edit the hero text)
6. Refresh the page - your changes should persist!

## 🔍 Verifying the Setup

### Check Database Tables

1. In Supabase dashboard, click **"Table Editor"** in the left sidebar
2. You should see these tables:
   - `hero_content`
   - `about_content`
   - `services`
   - `projects`
   - `articles`
   - `testimonials`
   - `social_links`

3. Click on any table to see the data

### Check API Connection

1. In Supabase dashboard, click **"API"** in the left sidebar
2. You should see your project URL and API keys
3. The **anon key** should match what you put in `.env`

## 🎨 How It Works

### Data Flow

```
┌─────────────┐
│   Browser   │
│  (React)    │
└──────┬──────┘
       │
       │ Read/Write
       ▼
┌─────────────┐
│  Supabase   │
│   Client    │
└──────┬──────┘
       │
       │ REST API
       ▼
┌─────────────┐
│  Supabase   │
│  Database   │
│ (PostgreSQL)│
└─────────────┘
```

### What Happens When You Edit Content

1. **Admin makes a change** in the admin panel
2. **React updates local state** immediately (instant UI feedback)
3. **Supabase client sends data** to the cloud database
4. **Database stores the data** permanently
5. **Next time you load the page**, data is fetched from Supabase

### Fallback Behavior

If Supabase is not configured or unavailable:
- The app will use default data from `src/data.tsx`
- Changes will NOT persist
- You'll see a console error (but the app still works)

## 🔧 Troubleshooting

### Error: "Missing Supabase environment variables"

**Problem**: The app can't find your Supabase credentials

**Solution**:
1. Check that `.env` file exists in your project root
2. Verify it contains:
   ```env
   VITE_SUPABASE_URL=https://...
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
3. Restart your dev server: `npm run dev`

### Error: "Failed to load data from Supabase"

**Problem**: Can't connect to Supabase

**Solution**:
1. Verify your Project URL is correct
2. Check that your anon key is correct (no extra spaces)
3. Make sure your Supabase project is active (not paused)
4. Check browser console for detailed error messages

### Changes Not Persisting

**Problem**: You make changes but they disappear on refresh

**Solution**:
1. Check browser console for errors
2. Verify the database tables exist (Table Editor in Supabase)
3. Check that RLS policies are enabled (they should be by default)
4. Try clearing browser cache and reloading

### Tables Are Empty

**Problem**: Database tables exist but have no data

**Solution**:
1. The tables start empty by default
2. Use the admin panel to add content
3. Or run the default data insert statements from `supabase-schema.sql`

## 🚢 Deploying to Production

When you deploy to GitHub Pages or another hosting service:

### Option 1: Use Environment Variables (Recommended)

Most hosting platforms support environment variables:

**GitHub Pages** (via GitHub Actions):
1. Go to your repository → Settings → Secrets and variables → Actions
2. Add two secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Update `.github/workflows/deploy.yml` to use these secrets

**Netlify**:
1. Go to Site settings → Environment variables
2. Add the two variables
3. Deploy

**Vercel**:
1. Go to Project settings → Environment Variables
2. Add the two variables
3. Deploy

### Option 2: Create .env.production

Create a `.env.production` file with your production Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-production-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

⚠️ **Security Note**: The anon key is safe to expose in frontend code. It's designed to be used in client-side applications. For additional security, you can set up Row Level Security (RLS) policies in Supabase.

## 🔒 Security Best Practices

### Row Level Security (RLS)

The schema includes RLS policies that allow:
- **Public read access**: Anyone can view your portfolio content
- **Authenticated write access**: Only you can edit content (future enhancement)

For now, the policies allow all operations for simplicity. In production, you should:

1. Enable Supabase Authentication
2. Update RLS policies to require authentication for write operations
3. Use the Supabase client with authentication tokens

### API Key Security

- ✅ **anon key**: Safe to expose in frontend (designed for this)
- ❌ **service_role key**: NEVER expose this (has full database access)

## 📊 Database Schema Overview

### Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `hero_content` | Hero section content | greeting, paragraph, portrait, tags |
| `about_content` | About section content | image, intro, approach, mission |
| `services` | Service offerings | title, description, tags, icon |
| `projects` | Portfolio projects | title, org, category, image, study |
| `articles` | Blog posts | title, excerpt, cover, body |
| `testimonials` | Client testimonials | quote, name, role, org, avatar |
| `social_links` | Social media links | platform, url, label |

### Relationships

- All tables are independent (no foreign keys)
- Each table has `created_at` and `updated_at` timestamps
- JSON fields store arrays (tags, deliverables, tools, etc.)

## 🎯 Next Steps

After setting up Supabase:

1. **Test all features**: Edit hero, about, services, projects, etc.
2. **Verify persistence**: Refresh page and check changes persist
3. **Check multiple devices**: Changes should sync across devices
4. **Deploy to production**: Follow the deployment guide above
5. **Set up authentication** (optional): For additional security

## 📞 Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify your Supabase project is active
3. Double-check your `.env` file values
4. Review the troubleshooting section above
5. Check Supabase logs in the dashboard

## 🎉 You're All Set!

Your portfolio now has a professional backend with:
- ✅ Cloud database storage
- ✅ Real-time synchronization
- ✅ Persistent content across devices
- ✅ Production-ready architecture

Happy coding! 🚀
