export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // در سیستم JWT، سرور نیازی به حذف چیزی از دیتابیس ندارد
  // وظیفه پاک کردن توکن از مرورگر کاربر با کلاینت است.
  
  return res.status(200).json({ message: 'خروج با موفقیت انجام شد' });
}
