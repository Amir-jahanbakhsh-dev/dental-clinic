import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async (searchTerm = "") => {
    try {
      setLoading(true);
      const res = await fetch(`/api/messages?search=${encodeURIComponent(searchTerm)}`);

      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchMessages(value);
  };

  const unreadCount = messages.filter((m) => m.status === "unread").length;
  const repliedCount = messages.filter((m) => m.status === "replied").length;

  const handleViewMessage = async (id) => {
    try {
      const res = await fetch(`/api/messages/${id}`);
      if (!res.ok) throw new Error("Failed to load message");

      const data = await res.json();
      setSelectedMessage(data);

      // بعد از مشاهده، لیست را دوباره بگیر تا status آپدیت شود
      fetchMessages(search);
    } catch (error) {
      console.error("View message error:", error);
    }
  };

  const handleMarkReplied = async (id) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "replied" }),
      });

      if (!res.ok) throw new Error("Failed to update message");

      fetchMessages(search);
    } catch (error) {
      console.error("Update message error:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6" dir="rtl">
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                مدیریت پیام‌ها
              </h1>
              <p className="text-slate-500 mt-1">
                مشاهده و پاسخ به پیام‌های کاربران و بیماران
              </p>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="جستجوی پیام..."
                className="w-full md:w-72 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-600 text-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm opacity-90">کل پیام‌ها</p>
            <h2 className="text-3xl font-bold mt-2">{messages.length}</h2>
          </div>
          <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">خوانده نشده</p>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">{unreadCount}</h2>
          </div>
          <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">پاسخ داده شده</p>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">{repliedCount}</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800">صندوق پیام‌ها</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">فرستنده</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">موضوع</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">تاریخ</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">وضعیت</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">عملیات</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                      در حال بارگذاری...
                    </td>
                  </tr>
                ) : messages.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                      پیامی یافت نشد
                    </td>
                  </tr>
                ) : (
                  messages.map((message) => (
                    <tr key={message._id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                        {message.sender}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {message.subject}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(message.createdAt).toLocaleDateString("fa-IR")}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            message.status === "replied"
                              ? "bg-green-100 text-green-700"
                              : message.status === "read"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {message.status === "replied"
                            ? "پاسخ داده شده"
                            : message.status === "read"
                            ? "خوانده شده"
                            : "خوانده نشده"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewMessage(message._id)}
                            className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-200"
                          >
                            مشاهده
                          </button>
                          <button
                            onClick={() => handleMarkReplied(message._id)}
                            className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs text-blue-700 hover:bg-blue-100"
                          >
                            پاسخ
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedMessage && (
          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">جزئیات پیام</h3>
            <div className="space-y-3 text-sm text-slate-700">
              <p><strong>فرستنده:</strong> {selectedMessage.sender}</p>
              <p><strong>موضوع:</strong> {selectedMessage.subject}</p>
              <p><strong>ایمیل:</strong> {selectedMessage.email || "ندارد"}</p>
              <p><strong>متن پیام:</strong> {selectedMessage.message}</p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
