# إنشاء أول Admin User

## الطريقة الصحيحة:

### الخطوة 1: شغل SQL Script
1. افتح Supabase Dashboard: https://phaurxjqtggpgphscyjo.supabase.co
2. اضغط على **SQL Editor** من القائمة الجانبية
3. اضغط **New Query**
4. انسخ كل محتوى ملف `supabase-setup.sql`
5. الصقه في الـ SQL Editor
6. اضغط **Run** أو **F5**

هذا سيعمل:
- إنشاء جدول profiles
- إنشاء جداول products, categories, sizes, orders
- تفعيل Row Level Security
- إنشاء Policies للأدمن فقط

### الخطوة 2: إنشاء User في Supabase Auth
1. في Supabase Dashboard، اذهب إلى **Authentication** > **Users**
2. اضغط **Add user** > **Create new user**
3. أدخل:
   - Email: `admin@wed.com` (أو أي إيميل تريده)
   - Password: `Admin123!` (أو أي باسورد قوي)
   - ✅ تأكد من تفعيل **Auto Confirm User** (مهم جداً!)
4. اضغط **Create user**
5. **انسخ الـ UUID** الخاص بالـ user (ستحتاجه في الخطوة التالية)

### الخطوة 3: ترقية الـ User لـ Admin
1. ارجع لـ **SQL Editor**
2. اكتب هذا الكود (استبدل YOUR-USER-UUID بالـ UUID اللي نسخته):

```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE user_id = 'YOUR-USER-UUID-HERE';
```

مثال:
```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE user_id = '123e4567-e89b-12d3-a456-426614174000';
```

3. اضغط **Run**

### الخطوة 4: تأكد من نجاح العملية
شغل هذا الكود للتأكد:

```sql
SELECT * FROM public.profiles WHERE role = 'admin';
```

يجب أن ترى الـ user بتاعك بـ role = 'admin'

### الخطوة 5: جرب تسجيل الدخول
1. شغل التطبيق: `npm run dev`
2. اذهب إلى: http://localhost:5173/admin/login
3. سجل دخول بـ:
   - Email: `admin@wed.com`
   - Password: `Admin123!`
4. يجب أن تدخل على Admin Dashboard

---

## بيانات تسجيل الدخول المقترحة:

```
Email: admin@wed.com
Password: Admin123!
```

أو استخدم أي بيانات تريدها، المهم تتبع الخطوات أعلاه.

---

## إذا واجهت مشكلة "Access denied":

1. تأكد أن الـ user تم تأكيده (Auto Confirm User مفعل)
2. تأكد أن الـ UUID صحيح في الـ UPDATE command
3. تأكد أن جدول profiles موجود
4. شغل هذا الكود للتحقق:

```sql
SELECT u.email, p.role 
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.user_id
WHERE u.email = 'admin@wed.com';
```

يجب أن ترى:
- email: admin@wed.com
- role: admin

---

## ملاحظات مهمة:

1. **لا يمكن** إنشاء admin من صفحة التسجيل (تم إزالة Sign Up من /admin/login)
2. **يجب** إنشاء أول admin يدوياً من Supabase Dashboard
3. بعد ذلك، يمكن للأدمن إنشاء admins آخرين من خلال تعديل الـ profiles table
4. كل user جديد يتم إنشاؤه تلقائياً بـ role = 'user'
5. فقط الأدمن يمكنه تغيير الـ roles

---

## إذا نسيت الباسورد:

1. اذهب إلى **Authentication** > **Users** في Supabase
2. اضغط على الـ user
3. اضغط **Send password recovery**
4. أو احذف الـ user وأنشئ واحد جديد
