import { useEffect } from "react";
import Swal from "sweetalert2";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (localStorage.getItem("survey_shown")) return;

    const timer = setTimeout(() => {
      showSurveyAlert();
    }, 5000); // 5 دقیقه

    return () => clearTimeout(timer);
  }, []);

  const showSurveyAlert = async () => {
    const result = await Swal.fire({
      title: "نظر شما برای ما مهم است",
      html: `
        <input id="swal-sender" class="swal2-input" placeholder="نام شما">
        <input id="swal-email" class="swal2-input" placeholder="ایمیل شما">
        <input id="swal-subject" class="swal2-input" placeholder="موضوع">
        <textarea id="swal-message" class="swal2-textarea" placeholder="متن پیام"></textarea>
      `,
      showCancelButton: true,
      confirmButtonText: "ارسال",
      cancelButtonText: "بعداً",
      focusConfirm: false,
      preConfirm: () => {
        const sender = document.getElementById("swal-sender").value.trim();
        const email = document.getElementById("swal-email").value.trim();
        const subject = document.getElementById("swal-subject").value.trim();
        const message = document.getElementById("swal-message").value.trim();

        if (!sender || !email || !subject || !message) {
          Swal.showValidationMessage("همه فیلدها الزامی هستند");
          return false;
        }

        return { sender, email, subject, message };
      },
    });

    if (result.isConfirmed && result.value) {
      await sendToApi(result.value);
    }
  };

  const sendToApi = async ({ sender, email, subject, message }) => {
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender,
          email,
          subject,
          message,
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
  };

  return <Component {...pageProps} />;
}

export default MyApp;
