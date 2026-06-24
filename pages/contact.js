import Footer from '@/components/footer/footer';
import Header from '@/components/navbar/navbar';
import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender: formData.name,
                    email: formData.email,
                    subject: formData.message,
                    message: formData.message,
                }),
            });

            if (res.ok) {
                localStorage.setItem("survey_shown", "true");
                await Swal.fire("موفق", "نظر شما با موفقیت ارسال شد.", "success");
            } else {
                throw new Error("API error");
            }
        } catch (error) {
            await Swal.fire("خطا", "ارسال پیام با مشکل مواجه شد.", "error");
        }
        setFormData({
            name: '' , email: '', message: ''
        })
        document.querySelectorAll('input').forEach(inp=>inp.value='')
        document.querySelector('textarea').value=''
    };
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-12 max-w-2xl pt-30">
                <h1 className="text-3xl font-[Btitr] text-center mb-8">تماس با ما</h1>
                <p className="text-gray-600 text-center mb-10">
                    برای برقراری ارتباط با ما می‌توانید از فرم زیر استفاده کنید یا از طریق شماره‌های درج شده در سایت با ما در تماس باشید.
                </p>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">نام و نام خانوادگی</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">ایمیل</label>
                        <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">پیام شما</label>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                    </div>
                    <button
                        type="submit"

                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        ارسال پیام
                    </button>
                </form>

                {/* اطلاعات تماس */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600">تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
                    <p className="text-gray-600">ایمیل: info@yourwebsite.com</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Contact;
