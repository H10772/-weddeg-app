-- ============================================
-- WED Admin System - Database Setup
-- ============================================
-- Execute this SQL in Supabase SQL Editor
-- ============================================

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create sizes table
CREATE TABLE IF NOT EXISTS public.sizes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,
  shipping_address TEXT,
  total NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Enable Row Level Security (RLS)
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Helper Function: Check if user is admin
-- ============================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- RLS Policies for profiles
-- ============================================

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (is_admin());

-- Only admins can update profiles
CREATE POLICY "Admins can update profiles"
  ON public.profiles FOR UPDATE
  USING (is_admin());

-- ============================================
-- RLS Policies for categories
-- ============================================

-- Everyone can view categories
CREATE POLICY "Anyone can view categories"
  ON public.categories FOR SELECT
  TO public
  USING (true);

-- Only admins can insert categories
CREATE POLICY "Admins can insert categories"
  ON public.categories FOR INSERT
  WITH CHECK (is_admin());

-- Only admins can update categories
CREATE POLICY "Admins can update categories"
  ON public.categories FOR UPDATE
  USING (is_admin());

-- Only admins can delete categories
CREATE POLICY "Admins can delete categories"
  ON public.categories FOR DELETE
  USING (is_admin());

-- ============================================
-- RLS Policies for sizes
-- ============================================

-- Everyone can view sizes
CREATE POLICY "Anyone can view sizes"
  ON public.sizes FOR SELECT
  TO public
  USING (true);

-- Only admins can insert sizes
CREATE POLICY "Admins can insert sizes"
  ON public.sizes FOR INSERT
  WITH CHECK (is_admin());

-- Only admins can update sizes
CREATE POLICY "Admins can update sizes"
  ON public.sizes FOR UPDATE
  USING (is_admin());

-- Only admins can delete sizes
CREATE POLICY "Admins can delete sizes"
  ON public.sizes FOR DELETE
  USING (is_admin());

-- ============================================
-- RLS Policies for products
-- ============================================

-- Everyone can view products
CREATE POLICY "Anyone can view products"
  ON public.products FOR SELECT
  TO public
  USING (true);

-- Only admins can insert products
CREATE POLICY "Admins can insert products"
  ON public.products FOR INSERT
  WITH CHECK (is_admin());

-- Only admins can update products
CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE
  USING (is_admin());

-- Only admins can delete products
CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE
  USING (is_admin());

-- ============================================
-- RLS Policies for orders
-- ============================================

-- Everyone can view orders (admins see all, users see their own)
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id OR is_admin());

-- Only admins can insert orders (for manual order creation)
CREATE POLICY "Admins can insert orders"
  ON public.orders FOR INSERT
  WITH CHECK (is_admin());

-- Only admins can update orders
CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE
  USING (is_admin());

-- Only admins can delete orders
CREATE POLICY "Admins can delete orders"
  ON public.orders FOR DELETE
  USING (is_admin());

-- ============================================
-- RLS Policies for order_items
-- ============================================

-- Users can view their own order items, admins can view all
CREATE POLICY "Users can view own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = auth.uid() OR is_admin())
    )
  );

-- Only admins can insert order items
CREATE POLICY "Admins can insert order items"
  ON public.order_items FOR INSERT
  WITH CHECK (is_admin());

-- Only admins can update order items
CREATE POLICY "Admins can update order items"
  ON public.order_items FOR UPDATE
  USING (is_admin());

-- Only admins can delete order items
CREATE POLICY "Admins can delete order items"
  ON public.order_items FOR DELETE
  USING (is_admin());

-- ============================================
-- Trigger: Auto-create profile on user signup
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- Insert sample data (optional)
-- ============================================

-- Insert sample categories
INSERT INTO public.categories (name, description) VALUES
  ('Clothing', 'Apparel and fashion items'),
  ('Accessories', 'Fashion accessories'),
  ('Footwear', 'Shoes and sandals')
ON CONFLICT DO NOTHING;

-- Insert sample sizes
INSERT INTO public.sizes (name) VALUES
  ('XS'), ('S'), ('M'), ('L'), ('XL'), ('XXL')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- IMPORTANT: Create your first admin user
-- ============================================
-- After running this script:
-- 1. Sign up a user through Supabase Auth (or your app)
-- 2. Get the user's UUID from auth.users table
-- 3. Run this command with your user's UUID:
--
-- UPDATE public.profiles 
-- SET role = 'admin' 
-- WHERE user_id = 'YOUR-USER-UUID-HERE';
--
-- ============================================
