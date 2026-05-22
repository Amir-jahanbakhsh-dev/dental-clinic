// فیلتر وضعیت
const statusFilter = document.getElementById('statusFilter');
const rows = document.querySelectorAll('#appointmentTable tr');

statusFilter.addEventListener('change', () => {
  const filter = statusFilter.value.trim();
  rows.forEach(row => {
    const statusCell = row.querySelector('.status').textContent.trim();
    if (filter === 'همه وضعیت‌ها' || filter === statusCell) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});

// دکمه نوبت جدید
document.getElementById('newAppointment').addEventListener('click', () => {
  alert('فرم ثبت نوبت جدید باز می‌شود (در نسخه کامل قابل اتصال به فرم ثبت)');
});

// دکمه مشاهده
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('جزئیات نوبت نمایش داده می‌شود (در نسخه کامل)');
  });
});

// خروج از حساب
document.getElementById('logoutBtn').addEventListener('click', () => {
  if (confirm('آیا مطمئن هستید می‌خواهید خارج شوید؟')) {
    window.location.href = 'login.html';
  }
});
