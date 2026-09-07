# 🚀 Supabase Backend Integration - Quick Start

Your portfolio is now connected to Supabase for persistent cloud storage!

## ⚡ Quick Setup (5 minutes)

### 1. Create Supabase Project
- Go to [supabase.com](https://supabase.com)
- Click "New Project"
- Name it `esther-portfolio`
- Set a database password (save it!)
- Choose free tier

### 2. Set Up Database
- Go to **SQL Editor** in Supabase dashboard
- Click **New query**
- Copy ALL content from `supabase-schema.sql`
- Paste and click **Run**
- ✅ Tables created!

### 3. Get API Credentials
- Go to **Settings** → **API**
- Copy **Project URL** and **anon public key**

### 4. Configure Environment
- Open `.env` file in project root
- Replace placeholders:
  ```env
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=your-anon-key-here
  ```

### 5. Test It
```bash
npm run dev
```
- Open `http://localhost:3000`
- Go to `/admin`
- Make a change
- Refresh page → Changes persist! ✅

## 📁 Files Created

- `src/lib/supabase.ts` - Supabase client configuration
- `src/store-supabase.tsx` - New store using Supabase
- `src/vite-env.d.ts` - TypeScript types for env variables
- `.env` - Your environment variables (DO NOT COMMIT)
- `.env.example` - Template file
- `supabase-schema.sql` - Database schema
- `SUPABASE_SETUP.md` - Detailed setup guide

## 🎯 What Changed

### Before (localStorage)
- ❌ Data stored in browser only
- ❌ Lost when clearing cache
- ❌ Not synced across devices
- ❌ No backup

### After (Supabase)
- ✅ Cloud database storage
- ✅ Persists across devices
- ✅ Real-time synchronization
- ✅ Automatic backups
- ✅ Professional backend

## 🔍 Database Tables

| Table | Purpose |
|-------|---------|
| `hero_content` | Hero section (greeting, portrait, tags) |
| `about_content` | About section (bio, image, stats) |
| `services` | Service offerings |
| `projects` | Portfolio projects |
| `articles` | Blog posts |
| `testimonials` | Client testimonials |
| `social_links` | Social media links |

## 🛠️ How It Works

```
Admin Panel → React State → Supabase Client → Cloud Database
                                              ↓
                              Next page load ← Fetch data
```

1. **Load**: App fetches data from Supabase on mount
2. **Edit**: Admin makes changes → updates local state
3. **Save**: Changes automatically sync to Supabase
4. **Persist**: Data stored in cloud database permanently

## 🔧 Troubleshooting

### "Missing Supabase environment variables"
- Check `.env` file exists
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart dev server

### "Failed to load data"
- Verify Supabase project is active
- Check API credentials are correct
- Review browser console for errors

### Changes not persisting
- Check browser console for errors
- Verify database tables exist
- Clear browser cache and reload

## 📚 Full Documentation

See `SUPABASE_SETUP.md` for:
- Detailed step-by-step guide
- Database schema explanation
- Security best practices
- Deployment instructions
- Advanced configuration

## 🚢 Deployment

When deploying to production:

### GitHub Pages
Add secrets in repository settings:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Netlify/Vercel
Add environment variables in dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🔒 Security

- ✅ **anon key** is safe to expose (designed for frontend)
- ❌ **service_role key** - NEVER expose (has full access)
- RLS policies configured for public read access
- Write operations currently open (add auth for production)

## 🎉 You're Done!

Your portfolio now has:
- ✅ Cloud database backend
- ✅ Persistent content storage
- ✅ Cross-device synchronization
- ✅ Production-ready architecture

**Next steps:**
1. Test all admin features
2. Verify changes persist
3. Deploy to production
4. Celebrate! 🎊

---

**Need help?** Check `SUPABASE_SETUP.md` for detailed instructions.
