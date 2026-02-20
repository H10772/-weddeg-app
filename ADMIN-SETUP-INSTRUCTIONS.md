# WED Admin System Setup Instructions

## Step 1: Run SQL Schema in Supabase

1. Go to your Supabase project: https://phaurxjqtggpgphscyjo.supabase.co
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase-setup.sql`
5. Paste into the SQL editor
6. Click **Run** to execute

This will create:
- `profiles` table with role management
- `categories`, `sizes`, `products`, `orders`, `order_items` tables
- Row Level Security (RLS) policies for admin-only CRUD
- Helper function `is_admin()` to check admin role
- Trigger to auto-create profiles on user signup

## Step 2: Create Your First Admin User

### Option A: Create new admin user

1. In Supabase, go to **Authentication** > **Users**
2. Click **Add user** > **Create new user**
3. Enter email and password
4. Click **Create user**
5. Copy the user's UUID from the users list
6. Go to **SQL Editor** and run:

```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE user_id = 'YOUR-USER-UUID-HERE';
```

### Option B: Promote existing user to admin

1. In Supabase, go to **Authentication** > **Users**
2. Find the user you want to make admin
3. Copy their UUID
4. Go to **SQL Editor** and run:

```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE user_id = 'YOUR-USER-UUID-HERE';
```

## Step 3: Test Admin Login

1. Go to http://localhost:5173/admin/login
2. Sign in with your admin user credentials
3. You should be redirected to the admin dashboard
4. If you see "Access denied. Admin privileges required." - check that the role was updated correctly in Step 2

## Step 4: Verify RLS Policies

Test that RLS is working:

1. Try signing in with a non-admin user - should be denied access
2. As admin, you should be able to:
   - View all products, categories, sizes, orders
   - Create, update, delete products, categories, sizes
   - View all orders

## Database Schema Overview

### profiles
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to auth.users)
- `role` (text: 'admin' or 'user')
- `created_at`, `updated_at` (timestamps)

### categories
- `id` (uuid, primary key)
- `name` (text)
- `description` (text)
- `created_at`, `updated_at` (timestamps)

### sizes
- `id` (uuid, primary key)
- `name` (text, unique)
- `created_at` (timestamp)

### products
- `id` (uuid, primary key)
- `name` (text)
- `description` (text)
- `price` (numeric)
- `category_id` (uuid, foreign key to categories)
- `images` (text array)
- `created_at`, `updated_at` (timestamps)

### orders
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to auth.users)
- `customer_email` (text)
- `customer_name`, `customer_phone`, `shipping_address` (text)
- `total` (numeric)
- `status` (text: 'pending', 'processing', 'shipped', 'delivered', 'cancelled')
- `created_at`, `updated_at` (timestamps)

### order_items
- `id` (uuid, primary key)
- `order_id` (uuid, foreign key to orders)
- `product_id` (uuid, foreign key to products)
- `product_name` (text)
- `quantity` (integer)
- `price` (numeric)
- `created_at` (timestamp)

## RLS Policies Summary

### Public Access (SELECT only)
- categories
- sizes
- products

### Admin Only (INSERT, UPDATE, DELETE)
- categories
- sizes
- products
- orders
- order_items

### User Access
- profiles: Users can view their own profile
- orders: Users can view their own orders
- order_items: Users can view items from their own orders

## Troubleshooting

### "Failed to fetch user profile" error
- Check that the profiles table exists
- Check that the user has a profile record
- Check that RLS policies allow reading profiles

### "Access denied. Admin privileges required." error
- Verify the user's role in the profiles table
- Make sure you ran the UPDATE command to set role = 'admin'

### Can't create/update/delete as admin
- Verify RLS policies are enabled
- Check that the `is_admin()` function exists
- Make sure you're signed in as an admin user

## Next Steps

After setup is complete, you can:
1. Access the admin dashboard at `/admin`
2. Manage products at `/admin/products`
3. Manage categories at `/admin/categories`
4. Manage sizes at `/admin/sizes`
5. View orders at `/admin/orders`
