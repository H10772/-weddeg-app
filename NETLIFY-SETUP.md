# Netlify Deployment Setup

## خطوات رفع المشروع على Netlify

### 1. تجهيز المشروع
✅ تم إنشاء ملف `public/_redirects` لحل مشكلة React Router

### 2. رفع على Netlify

#### الطريقة الأولى: من خلال GitHub (موصى بها)
1. ارفع الكود على GitHub أولاً
2. اذهب إلى [Netlify](https://app.netlify.com)
3. اضغط "Add new site" > "Import an existing project"
4. اختر GitHub واختر الـ repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. اضغط "Deploy site"

#### الطريقة الثانية: Drag & Drop
1. شغل `npm run build` في المشروع
2. اذهب إلى [Netlify](https://app.netlify.com)
3. اسحب مجلد `dist` على Netlify

### 3. إضافة Environment Variables (مهم جداً!)

بعد رفع الموقع:
1. اذهب إلى Site settings > Environment variables
2. أضف المتغيرات دي:

```
VITE_SUPABASE_URL = https://phaurxjqtggpgphscyjo.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoYXVyeGpxdGdncGdwaHNjeWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNDY3NjgsImV4cCI6MjA4NjgyMjc2OH0.1b7f9pPtd_X-88SJqvGnyZfTYgWWmhuthSa-vB0J3NQ
```

3. اضغط "Save"
4. اعمل Redeploy للموقع عشان يستخدم المتغيرات الجديدة

### 4. اختبار الموقع

بعد الـ deployment:
- الصفحة الرئيسية: `https://your-site.netlify.app/`
- صفحة الأدمن: `https://your-site.netlify.app/admin/login`
- لوحة التحكم: `https://your-site.netlify.app/admin`

### 5. تحديث Supabase URL (اختياري)

إذا كنت تريد تقييد الوصول لـ Supabase من نطاق Netlify فقط:
1. اذهب إلى Supabase Dashboard
2. Settings > API
3. أضف URL موقعك على Netlify في "Site URL"

## ملاحظات مهمة

- ملف `_redirects` يحل مشكلة 404 عند تحديث الصفحة
- Environment variables لازم تتضاف على Netlify عشان الموقع يشتغل
- لو عملت تحديث في الكود، ارفعه على GitHub وNetlify هيعمل deploy تلقائي
- Admin login: `admin@wed.com` / `Admin123!`

## استكشاف الأخطاء

### المشكلة: صفحة 404 عند الدخول على /admin
**الحل**: تأكد من وجود ملف `public/_redirects`

### المشكلة: الموقع مش بيتصل بـ Supabase
**الحل**: تأكد من إضافة Environment Variables على Netlify

### المشكلة: Admin login مش شغال
**الحل**: 
1. تأكد من تشغيل SQL scripts على Supabase
2. تأكد من وجود admin user في جدول profiles
3. افتح Console (F12) وشوف الأخطاء
