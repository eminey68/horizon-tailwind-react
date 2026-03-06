/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import routes from "routes.js";
import logo from "assets/img/layout/kyp_logo.png"; 

const Sidebar = ({ open, onClose }) => {

  // SADECE GÖRÜNMESİNİ İSTEMEDİĞİMİZ SAYFALARI FİLTRELİYORUZ
  // Sayfalar arka planda çalışmaya devam edecek ama sol menüde listelenmeyecek.
  const filteredRoutes = routes.filter(
    (route) => 
      route.name !== "Profilim" && 
      route.name !== "Giriş Yap" &&
      route.name !== "Kaynak Detay" && // YENİ EKLENDİ
      route.path !== "profile" && 
      route.path !== "sign-in" &&
      route.path !== "resource-detail" // YENİ EKLENDİ
  );

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      {/* --- LOGO ALANI --- */}
      {/* --- LOGO ALANI --- */}
      <div className={`mt-8 flex flex-col items-center justify-center`}>
        
        {/* Çemberi h-32 w-32 yaparak büyüttük. 
            İç boşluğu p-1'e düşürdük. 
            Taşmaları engellemek için overflow-hidden ekledik. */}
        <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-white p-1 shadow-xl dark:bg-navy-900">
          
          {/* scale-125 ile logoyu %25 oranında yakınlaştırdık (Zoom yaptık) */}
          <img 
            src={logo} 
            alt="KYP Logo" 
            className="h-full w-full object-contain scale-125" 
          />
        </div>

        {/* Alt Yazılar */}
        <div className="mt-3 text-center">
           <h1 className="text-xl font-bold text-navy-700 dark:text-white">KYP</h1>
           <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">Kaynak Yönetim Platformu</h2>
        </div>

      </div>
      
      
      {/* Nav item - SADECE FİLTRELENMİŞ LİNKLERİ GÖSTER */}
      <ul className="mb-auto pt-1">
        <Links routes={filteredRoutes} />
      </ul>

      <div className="flex justify-center">
      </div>
    </div>
  );
};

export default Sidebar;