# WED E-Commerce Application

A modern e-commerce web application built with React, Vite, and Supabase.

## Features

- 🛍️ Product browsing with grid/list view
- 🛒 Shopping cart functionality
- 👤 User authentication
- 🔐 Admin dashboard for product management
- 📱 Fully responsive design
- 🎨 Modern UI with Bootstrap

## Tech Stack

- **Frontend**: React 18, Vite, React Router, Bootstrap
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Styling**: CSS3, Bootstrap 5

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd weddeg-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up Supabase database:
   - Go to your Supabase project SQL Editor
   - Run the SQL scripts in this order:
     1. `SIMPLE-FIX.sql` - Creates profiles table and admin user
     2. `FINAL-SETUP.sql` - Creates all tables and RLS policies
     3. `FIX-RLS-POLICIES.sql` - Fixes UPDATE permissions

5. Start the development server:
```bash
npm run dev
```

## Admin Access

Default admin credentials:
- Email: `admin@wed.com`
- Password: `Admin123!`

Access admin dashboard at: `/admin`

## Database Schema

### Tables
- `profiles` - User profiles with roles
- `products` - Product catalog
- `categories` - Product categories
- `sizes` - Product sizes
- `orders` - Customer orders
- `order_items` - Order line items

## Project Structure

```
weddeg-app/
├── src/
│   ├── components/     # Reusable components
│   │   ├── admin/      # Admin-specific components
│   │   ├── cart/       # Shopping cart components
│   │   ├── home/       # Homepage components
│   │   ├── layout/     # Layout components (Navbar, Footer)
│   │   ├── product/    # Product-related components
│   │   └── search/     # Search functionality
│   ├── pages/          # Page components
│   │   ├── admin/      # Admin dashboard pages
│   │   └── ...         # Other pages
│   ├── context/        # React context providers
│   ├── lib/            # Utility libraries (Supabase client)
│   └── styles/         # Global styles
├── public/             # Static assets
└── ...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Customer Features
- Browse products with grid/list view toggle
- View product details with image gallery
- Add products to cart
- Checkout process
- User authentication (sign up/sign in)
- Search functionality

### Admin Features
- Product management (CRUD)
- Category management (CRUD)
- Size management (CRUD)
- Order viewing
- Protected admin routes

## Security

- Row Level Security (RLS) enabled on all tables
- Admin-only access to CRUD operations
- Secure authentication with Supabase Auth
- Environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support, email support@wed.com or open an issue in the repository.
