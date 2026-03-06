import React from "react";

export default function SignIn() {
  
  // Backend'e bağlanana kadar arayüzü test edebilmek için rolü hafızaya alıp yönlendiriyoruz.
  // Backend eklendiğinde bu kısım API isteği atacak şekilde güncellenecektir.
  const handleLogin = (role) => {
    localStorage.setItem("userRole", role);
    window.location.href = "/admin/default";
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          KİÜ Kaynak Yönetimi
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Lütfen giriş yapmak istediğiniz rolü seçin.
        </p>

        {/* --- GİRİŞ BUTONLARI --- */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleLogin("student")}
            className="linear w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600"
          >
            Öğrenci Olarak Giriş Yap
          </button>

          <button
            onClick={() => handleLogin("academic")}
            className="linear w-full rounded-xl bg-blue-600 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-blue-700"
          >
            Akademisyen Olarak Giriş Yap
          </button>

          <button
            onClick={() => handleLogin("admin")}
            className="linear w-full rounded-xl border-2 border-brand-500 bg-transparent py-[12px] text-base font-medium text-brand-500 transition duration-200 hover:bg-brand-50 dark:border-brand-400 dark:text-brand-400 dark:hover:bg-brand-900"
          >
            Yönetici Olarak Giriş Yap
          </button>
        </div>
      </div>
    </div>
  );
}