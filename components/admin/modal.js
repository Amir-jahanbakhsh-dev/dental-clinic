"use client";
export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;
    return (
        <div  className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg absolute shadow-xl w-full max-w-xl overflow-hidden" dir="rtl">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}