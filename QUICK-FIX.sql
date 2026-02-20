-- ========================================
-- QUICK FIX: Create profiles table and admin user
-- ========================================
-- Copy and paste this ENTIRE script into Supabase SQL Editor
-- Then click RUN
-- ========================================

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies for profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public can view all profiles" ON public.profiles;
CREATE POLICY "Public can view all profiles"
  ON public.profiles FOR SELECT
  TO public
  USING (true);

-- 4. Create profile for admin user
INSERT INTO public.profiles (user_id, role)
SELECT id, 'admin' 
FROM auth.users 
WHERE email = 'admin@wed.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- 5. Verify the result
SELECT 
  u.id as user_id,
  u.email,
  p.user_id as profile_user_id,
  p.role,
  p.created_at
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.user_id
WHERE u.email = 'admin@wed.com';

-- ========================================
-- Expected Result:
-- You should see one row with:
-- - user_id: some UUID
-- - email: admin@wed.com
-- - profile_user_id: same UUID
-- - role: admin
-- - created_at: timestamp
-- ========================================
