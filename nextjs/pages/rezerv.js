export default function AppointmentForm() {
  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">فرم ثبت نوبت</h1>
          <p className="text-gray-500">لطفاً اطلاعات خود را وارد کنید تا همکاران ما جهت تأیید نوبت با شما تماس بگیرند.</p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          
          {/* ردیف اول: نام و شماره تماس */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="نام کامل خود را وارد کنید" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">شماره تماس</label>
              <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="09xxxxxxxxx" />
            </div>
          </div>

          {/* ردیف دوم: خدمت و پزشک */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">انتخاب خدمت</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white">
                <option>لطفاً انتخاب کنید</option>
                <option>ایمپلنت</option>
                <option>جرم گیری</option>
                <option>ارتودنسی</option>
                <option>کامپوزیت</option>
                <option>بلیچینگ</option>
                <option>عصب کشی</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">انتخاب پزشک</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white">
                <option>لطفاً انتخاب کنید</option>
                <option>دکتر احمدی</option>
                <option>دکتر مرادی</option>
                <option>دکتر رضایی</option>
              </select>
            </div>
          </div>

          {/* ردیف سوم: تاریخ و ساعت */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">انتخاب تاریخ</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">انتخاب ساعت</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white">
                <option>لطفاً انتخاب کنید</option>
                <option>09:00</option>
                <option>10:00</option>
                <option>11:00</option>
                <option>12:00</option>
                <option>16:00</option>
                <option>17:00</option>
              </select>
            </div>
          </div>

          {/* توضیحات */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">توضیحات (اختیاری)</label>
            <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="در صورت نیاز توضیحی وارد کنید..."></textarea>
          </div>

          {/* دکمه */}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300">
            ثبت نهایی نوبت
          </button>

        </form>
      </div>
    </section>
  );
}
