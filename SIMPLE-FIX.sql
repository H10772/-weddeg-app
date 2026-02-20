-- ========================================
-- SIMPLE FIX - Run this step by step
-- ========================================

-- Step 1: Check if profiles table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'profiles';

-- Step 2: If table doesn't exist, create it
CREATE TABLE IF NOT EXISTS public.profiles (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop all existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow public read access" ON public.profiles;

-- Step 5: Create simple public read policy
CREATE POLICY "Allow public read access"
  ON public.profiles FOR SELECT
  TO public
  USING (true);

-- Step 6: Insert admin profile
INSERT INTO public.profiles (user_id, role)
SELECT id, 'admin' 
FROM auth.users 
WHERE email = 'admin@wed.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- Step 7: Verify
SELECT 
  u.email,
  p.role
FROM auth.users u
JOIN public.profiles p ON u.id = p.user_id
WHERE u.email = 'admin@wed.com';
