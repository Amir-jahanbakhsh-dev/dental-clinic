"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Footer from "@/components/footer/footer";
import Header from "@/components/navbar/navbar";
import Select from 'react-select';
export default function AppointmentForm() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      // 1. مستقیم از localStorage مقدار را بگیر
      const storedToken = localStorage.getItem("token");

      // 2. استیت را برای استفاده در بقیه کامپوننت‌ها آپدیت کن
      setToken(storedToken);

      // 3. برای شرطِ ریدایرکت، از خودِ متغیر 'storedToken' استفاده کن، نه از استیت 'token'
      if (!storedToken) {
        Swal.fire({
          icon: "warning",
          title: "عدم دسترسی",
          text: "برای ثبت نوبت ابتدا باید وارد حساب کاربری خود شوید.",
          confirmButtonText: "رفتن به صفحه ورود",
        }).then(() => router.push("/login"));
        return;
      }
    };

    checkAuth();
  }, []); // دقت کنید که وابستگی‌ها (dependencies) را درست مدیریت کنید

  const fetchDoctors = async () => {
    try {
      const res = await fetch('/api/admin/doctors');
      const result = await res.json();

      // دقت کنید: اگر API شما خروجی را داخل یک آبجکت مثل { data: [...] } می‌فرستد
      // حتما باید result.data را ست کنید، نه خودِ result را.
      if (result.success) {
        setDoctors(result.data);
      } else {
        setDoctors([]); // اگر خطا داشت، آرایه خالی قرار بده
      }
    } catch (error) {
      console.error(error);
      setDoctors([]); // در صورت خطای شبکه، آرایه خالی قرار بده
    }
  };

  useEffect(() => { fetchDoctors(); }, []);
  const doctorOptions = doctors.map(doc => ({
    value: doc._id, // یا هر فیلد شناسه‌ای که دارید
    label: doc.name
  }));
  const handleDoctorChange = (selectedOption) => {
    setFormData(prev => ({
      ...prev,
      doctor: selectedOption ? selectedOption.value : "" // ذخیره ID پزشک در فرم
    }));
  };
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    service: "",
    doctor: "",
    date: "",
    time: "",
    description: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const token = localStorage.getItem("token");


  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();



    try {
      const res = await fetch("/api/appointment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/userpanel");
        Swal.fire({
          icon: "success",
          title: "موفقیت‌آمیز",
          text: "نوبت شما با موفقیت ثبت شد.",
        });
        setFormData({
          fullName: "",
          phone: "",
          service: "",
          doctor: "",
          date: "",
          time: "",
          description: "",
        });
      } else {
        Swal.fire("خطا", data.message || "مشکلی در ثبت نوبت رخ داد.", "error");
      }
    } catch (error) {
      Swal.fire("خطا", "اتصال به سرور برقرار نشد.", "error");
    }
  };

  return (
    <>
      <Header />
      <section className="min-h-screen bg-gray-50 py-12 px-4 pt-30">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-[Btitr] text-gray-800 mb-3">فرم ثبت نوبت</h1>
            <p className="text-gray-500">لطفاً اطلاعات خود را وارد کنید تا همکاران ما جهت تأیید نوبت با شما تماس بگیرند.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
                <input name="fullName" required onChange={handleChange} value={formData.fullName} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="نام کامل خود را وارد کنید" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">شماره تماس</label>
                <input name="phone" required onChange={handleChange} value={formData.phone} type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="09xxxxxxxxx" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">انتخاب خدمت</label>
                <select name="service" required onChange={handleChange} value={formData.service} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white">
                  <option value="">لطفاً انتخاب کنید</option>
                  <option value="ایمپلنت">ایمپلنت</option>
                  <option value="جرم گیری">جرم گیری</option>
                  <option value="ارتودنسی">ارتودنسی</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">انتخاب پزشک</label>
                <Select
                  options={doctorOptions}
                  onChange={handleDoctorChange}
                  placeholder="جستجو و انتخاب پزشک..."
                  isClearable
                  className="text-right" // راست‌چین کردن متن داخل باکس
                  styles={{
                    control: (base) => ({
                      ...base,
                      padding: '2px',
                      borderRadius: '0.5rem',
                      borderColor: '#d1d5db',
                      boxShadow: 'none',
                      '&:hover': { borderColor: '#3b82f6' }
                    })
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">انتخاب تاریخ</label>
                  <input name="date" required onChange={handleChange} value={formData.date} type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">انتخاب ساعت</label>
                  <select name="time" required onChange={handleChange} value={formData.time} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white">
                    <option value="">لطفاً انتخاب کنید</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">توضیحات (اختیاری)</label>
                <textarea name="description" onChange={handleChange} value={formData.description} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="در صورت نیاز توضیحی وارد کنید..."></textarea>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-[Btitr] py-3 rounded-lg shadow-md transition duration-300">
                ثبت نهایی نوبت
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
