"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { btitr,bnazanin } from "../fonts/fonts";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="w-full bg-white shadow-sm fixed z-50">
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
        <Link href="/">

          <div className="flex items-center gap-2">
            <Image
              src="/icons/thin-0826_teeth_tooth_dental.png"
              alt="logo"
              width={40}
              height={40}
            />
            <span className='text-lg font-[Btitr]'>
              کلینیک دندان پزشکی
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6 font-medium font-[Btitr] ">
          <li className="transition-all ease-in-out transition-discrete border-b-blue-600 hover:border-b-3 hover:text-blue-500"><Link href="/">صفحه اصلی</Link></li>
          <li className="transition-all ease-in-out transition-discrete border-b-blue-600 hover:border-b-3 hover:text-blue-500"><Link href="/about">درباره ما</Link></li>
          <li className="transition-all ease-in-out transition-discrete border-b-blue-600 hover:border-b-3 hover:text-blue-500"><Link href="/services">خدمات</Link></li>
          <li className="transition-all ease-in-out transition-discrete border-b-blue-600 hover:border-b-3 hover:text-blue-500"><Link href="/doctors">پزشکان</Link></li>
          <li className="transition-all ease-in-out transition-discrete border-b-blue-600 hover:border-b-3 hover:text-blue-500"><Link href="/articles">مقالات</Link></li>
          <li className="transition-all ease-in-out transition-discrete border-b-blue-600 hover:border-b-3 hover:text-blue-500"><Link href="/galery">گالری</Link></li>
          <li className="transition-all ease-in-out transition-discrete border-b-blue-600 hover:border-b-3 hover:text-blue-500"><Link href="/contact">تماس با ما</Link></li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <Link href="/login">
            <button className="px-4 py-2 bg-blue-600 font-[Btitr] text-white rounded-lg text-sm hover:bg-blue-700 transition w-full py-2 border rounded-lg text-sm">
              ورود
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 font-[Btitr] hover:bg-mauve-100 transition w-full py-2 border rounded-lg text-sm">
              ثبت نام
            </button>
          </Link>

          {/* <Link href="/adminLogin">
            <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 transition">
              ورود مدیر
            </button>
          </Link> */}

          <Link href="/rezerv">
            <button className="px-4 py-2 font-[Btitr] bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
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
          <ul className="flex flex-col gap-4 font-medium text-center pb-2 font-[Btitr] ">

            <li className="transition-all ease-in-out transition-discrete border-b-blue-600 hover:border-b-3 hover:text-blue-500"><Link href="/" onClick={() => setIsOpen(false)}>صفحه اصلی</Link></li>
            <li className="transition-all ease-in-out transition-discrete border-b-blue-600 hover:border-b-3 hover:text-blue-500"><Link href="/about">درباره ما</Link></li>
            <li className="transition-all ease-in-out transition-discrete border-b-blue-600 hover:border-b-3 hover:text-blue-500"><Link href="/services">خدمات</Link></li>
            <li className="transition-all ease-in-out transition-discrete border-b-blue-600 hover:border-b-3 hover:text-blue-500"><Link href="/doctors">پزشکان</Link></li>
            <li className="transition-all ease-in-out transition-discrete border-b-blue-600 hover:border-b-3 hover:text-blue-500"><Link href="/articles">مقالات</Link></li>
            <li className="transition-all ease-in-out transition-discrete border-b-blue-600 hover:border-b-3 hover:text-blue-500"><Link href="/galery">گالری</Link></li>
            <li className="transition-all ease-in-out transition-discrete border-b-blue-600 hover:border-b-3 hover:text-blue-500"><Link href="/contact">تماس با ما</Link></li>
          </ul>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-3 pt-4 border-t">
            <Link href="/login">
              <button className="w-full py-2 border font-[Btitr] rounded-lg text-sm">
                ورود
              </button>
            </Link> 
            <Link href="/signup">
              <button className="w-full py-2 border font-[Btitr] rounded-lg text-sm">
                ثبت نام
              </button>
            </Link>

            {/* <Link href="/adminLogin">
              <button className="w-full py-2 border rounded-lg text-sm">
                ورود مدیر
              </button>
            </Link> */}

            <Link href="/rezerv">
              <button className="w-full py-2 font-[Btitr] bg-blue-600 text-white rounded-lg text-sm">
                رزرو نوبت
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
