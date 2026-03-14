import React, { useState, useEffect } from "react";
import Dropdown from "components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiSearch, FiBell, FiCheckCircle, FiInfo, FiClock, FiCheck } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { MdPerson } from "react-icons/md"; 

const Navbar = (props) => {
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = useState(false);
  const [role, setRole] = useState("student");
  
  // Bildirim State'leri
  const [unreadCount, setUnreadCount] = useState(3);

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  // Sahte Bildirim Verileri
  const notifications = [
    {
      id: 1,
      title: "Rezervasyon Onaylandı",
      desc: "Z-04 Yazılım Laboratuvarı talebiniz onaylandı.",
      time: "10 dk önce",
      icon: <FiCheckCircle className="text-green-500 h-5 w-5" />,
      bg: "bg-green-50 dark:bg-green-500/10",
    },
    {
      id: 2,
      title: "Sistem Uyarısı",
      desc: "Pazar günü 02:00'de planlı sunucu bakımı yapılacaktır.",
      time: "2 saat önce",
      icon: <FiInfo className="text-orange-500 h-5 w-5" />,
      bg: "bg-orange-50 dark:bg-orange-500/10",
    },
    {
      id: 3,
      title: "Hatırlatma",
      desc: "Amfi 101 rezervasyonunuz 1 saat sonra başlıyor.",
      time: "5 saat önce",
      icon: <FiClock className="text-blue-500 h-5 w-5" />,
      bg: "bg-blue-50 dark:bg-blue-500/10",
    },
  ];

  const handleMarkAllAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Sayfalar
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        
        {/* ARAMA ÇUBUĞU */}
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Ara..."
            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />
        </div>

        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        
        {/* --- YENİ BİLDİRİM MENÜSÜ --- */}
        <Dropdown
          button={
            <div className="relative flex cursor-pointer items-center justify-center rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-white/20">
              <FiBell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white shadow-sm border border-white dark:border-navy-900">
                  {unreadCount}
                </span>
              )}
            </div>
          }
          animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
          children={
            <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
              
              {/* Bildirim Başlığı ve Tümünü Okundu İşaretle */}
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/10">
                <p className="text-base font-bold text-navy-700 dark:text-white">
                  Bildirimler
                </p>
                {unreadCount > 0 && (
                  <button 
                    onClick={handleMarkAllAsRead}
                    className="flex items-center gap-1 text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors"
                  >
                    <FiCheck className="h-4 w-4" /> Tümünü Okundu İşaretle
                  </button>
                )}
              </div>

              {/* Bildirim İçerikleri */}
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className="mb-2 flex w-full items-start gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-navy-800 cursor-pointer">
                    <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${notif.bg}`}>
                      {notif.icon}
                    </div>
                    <div className="flex w-full flex-col">
                      <h5 className="text-sm font-bold text-navy-700 dark:text-white">{notif.title}</h5>
                      <p className="mt-1 text-xs text-gray-600 dark:text-gray-300 line-clamp-2">{notif.desc}</p>
                      <span className="mt-1 text-[10px] font-bold text-gray-400">{notif.time}</span>
                    </div>
                  </div>
                ))}
                
                {notifications.length === 0 && (
                  <p className="text-center text-sm text-gray-500 py-4">Yeni bildiriminiz bulunmuyor.</p>
                )}
              </div>

              {/* Tümünü Gör Butonu */}
              <button className="mt-2 w-full rounded-xl bg-gray-50 py-2 text-center text-sm font-bold text-navy-700 transition hover:bg-gray-100 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-900">
                Tüm Bildirimleri Görüntüle
              </button>
            </div>
          }
          classNames={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
        />
        
        {/* --- TEMA DEĞİŞTİRME --- */}
        <div
          className="cursor-pointer text-gray-600 p-2 hover:bg-gray-100 dark:hover:bg-white/20 rounded-full transition-colors"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>

        {/* --- PROFİL MENÜSÜ --- */}
        <Dropdown
          button={
            <div className="cursor-pointer p-2 text-gray-600 hover:text-navy-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/20 rounded-full transition-colors">
              <MdPerson className="h-5 w-5" />
            </div>
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    👋 Merhaba, {role === "admin" ? "Yönetici" : "Emine Yenil"}
                  </p>{" "}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="flex flex-col p-4">
                <a
                  href="/admin/profile"
                  className="text-sm font-medium text-gray-800 dark:text-white hover:text-brand-500 transition-colors"
                >
                  Profil Ayarları
                </a>
                
                <a
                  href="/admin/reservations" 
                  className="mt-3 text-sm font-medium text-gray-800 dark:text-white hover:text-brand-500 transition-colors"
                >
                  {role === "admin" ? "Gelen Talepler" : "Rezervasyonlarım"}
                </a>
                
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("userRole"); 
                    localStorage.removeItem("selectedResource"); 
                    window.location.href = "/auth/sign-in"; 
                  }}
                  className="mt-4 flex items-center gap-2 text-left text-sm font-bold text-red-500 hover:text-red-600 transition duration-150 ease-out hover:ease-in pt-3 border-t border-gray-100 dark:border-white/10"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;