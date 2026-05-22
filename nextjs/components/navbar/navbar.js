"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top bar */}
      <div className="hidden md:flex items-center justify-between px-6 py-2 text-sm bg-gray-50">
        <div className="flex items-center gap-4">
          <span>021_123456</span>
          <span>info@gmail.com</span>
          <span>تهران خیابان میرداماد کد17</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/icons/thin-0826_teeth_tooth_dental.png"
            alt="logo"
            width={40}
            height={40}
          />
          <span className="font-bold font-[b-titr] text-lg">
            کلینیک دندان پزشکی
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6 font-medium font-[b-titr]">
          <li className="border-b-blue-700 hover:border-b-3"><Link href="/">صفحه اصلی</Link></li>
          <li className="border-b-blue-700 hover:border-b-3"><Link href="/">درباره ما</Link></li>
          <li className="border-b-blue-700 hover:border-b-3"><Link href="/">خدمات</Link></li>
          <li className="border-b-blue-700 hover:border-b-3"><Link href="/">پزشکان</Link></li>
          <li className="border-b-blue-700 hover:border-b-3"><Link href="/">مقالات</Link></li>
          <li className="border-b-blue-700 hover:border-b-3"><Link href="/">گالری</Link></li>
          <li className="border-b-blue-700 hover:border-b-3"><Link href="/">تماس با ما</Link></li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <Link href="/login">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition w-full py-2 border rounded-lg text-sm">
                ورود | ثبت نام
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-4 py-2 hover:bg-mauve-100 transition w-full py-2 border rounded-lg text-sm">
                 ثبت نام
              </button>
            </Link>

          {/* <Link href="/adminLogin">
            <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 transition">
              ورود مدیر
            </button>
          </Link> */}

          <Link href="/rezerv">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
              رزرو نوبت
            </button>
          </Link>
        </div>

        {/* Hamburger Button */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t px-6 py-4 space-y-4">
          
          {/* Links */}
          <ul className="flex flex-col gap-4 font-medium text-center pb-2 font-[b-titr] ">
            
          <li className="border-b-blue-700 hover:border-b-3 w-50"><Link  href="/"  onClick={() => setIsOpen(false)}>صفحه اصلی</Link></li>
          <li className="border-b-blue-700 hover:border-b-3 w-50"><Link  href="/">درباره ما</Link></li>
          <li className="border-b-blue-700 hover:border-b-3 w-50"><Link  href="/">خدمات</Link></li>
          <li className="border-b-blue-700 hover:border-b-3 w-50"><Link  href="/">پزشکان</Link></li>
          <li className="border-b-blue-700 hover:border-b-3 w-50"><Link  href="/">مقالات</Link></li>
          <li className="border-b-blue-700 hover:border-b-3 w-50"><Link  href="/">گالری</Link></li>
          <li className="border-b-blue-700 hover:border-b-3 w-50"><Link  href="/">تماس با ما</Link></li>
          </ul>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-3 pt-4 border-t">
            <Link href="/login">
              <button className="w-full py-2 border rounded-lg text-sm">
                ورود | ثبت نام
              </button>
            </Link>
            <Link href="/signup">
              <button className="w-full py-2 border rounded-lg text-sm">
                 ثبت نام
              </button>
            </Link>

            {/* <Link href="/adminLogin">
              <button className="w-full py-2 border rounded-lg text-sm">
                ورود مدیر
              </button>
            </Link> */}

            <Link href="/rezerv">
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm">
                رزرو نوبت
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
