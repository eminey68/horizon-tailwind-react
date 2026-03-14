import React, { useState, useEffect } from "react";
import MiniCalendar from "components/calendar/MiniCalendar";
import { IoDocuments } from "react-icons/io5";
import { MdCheckCircle, MdWarning } from "react-icons/md";
import { FiClock, FiPlusCircle, FiCalendar } from "react-icons/fi"; 

import Widget from "components/widget/Widget";
import Card from "components/card";

const Dashboard = () => {
  const [role, setRole] = useState("student");
  
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const allReservations = [
    { id: 1, resource: "Z-04 Yazılım Laboratuvarı", time: "10:00 - 12:00", user: "Emine Yenil", status: "Onaylandı" },
    { id: 2, resource: "Toplantı Odası A", time: "14:00 - 15:30", user: "Ahmet Yılmaz", status: "Beklemede" },
    { id: 3, resource: "Amfi 101", time: "16:00 - 18:00", user: "Dr. Ayşe Kaya", status: "Onaylandı" },
    { id: 4, resource: "Konferans Salonu", time: "09:00 - 11:00", user: "Emine Yenil", status: "Beklemede" },
  ];

  const displayedReservations = role === "admin" 
    ? allReservations 
    : allReservations.filter(res => res.user === "Emine Yenil");

  return (
    <div>
      {/* --- ÜST KISIM: AKILLI VE İŞLEVLİ BİLGİ KARTLARI --- */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        
        {role === "admin" ? (
          // YÖNETİCİ KARTLARI
          <>
            <Widget
              icon={<IoDocuments className="h-7 w-7 text-orange-500" />}
              title={"Aksiyon Bekleyen"}
              subtitle={"5 Yeni Talep"}
            />
            <Widget
              icon={<FiCalendar className="h-6 w-6 text-brand-500" />}
              title={"Bugünkü Yoğunluk"}
              subtitle={"12 Aktif Kullanım"}
            />
            <Widget
              icon={<MdWarning className="h-7 w-7 text-red-500" />}
              title={"Arızalı / Bakımda"}
              subtitle={"2 Kaynak Devre Dışı"}
            />
          </>
        ) : (
          // ÖĞRENCİ / AKADEMİSYEN KARTLARI
          <>
            <Widget
              icon={<FiClock className="h-7 w-7 text-brand-500" />}
              title={"Sıradaki Rezervasyonum"}
              subtitle={"Bugün, 10:00 (Z-04 Lab)"}
            />
            <Widget
              icon={<MdCheckCircle className="h-7 w-7 text-green-500" />}
              title={"Onaylanan Taleplerim"}
              subtitle={"Toplam 3 Adet"}
            />
            {/* Tıklanabilir Hızlı Rezervasyon Butonu */}
            <button 
              onClick={() => alert("Hızlı rezervasyon sayfasına yönlendiriliyor...")}
              className="!flex flex-row flex-grow items-center rounded-[20px] border-2 border-dashed border-brand-500 bg-white p-4 shadow-3xl shadow-shadow-500 transition-colors hover:bg-gray-50 cursor-pointer dark:!bg-navy-800 dark:hover:!bg-navy-700 dark:shadow-none"
            >
              <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div className="rounded-full bg-brand-50 p-3 dark:bg-navy-700">
                  <FiPlusCircle className="h-7 w-7 text-brand-500" />
                </div>
              </div>
              <div className="h-50 ml-4 flex w-auto flex-col justify-center text-left">
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                  Yeni Talep Oluştur
                </h4>
                <p className="text-sm font-medium text-gray-500">
                  Hızlıca kaynak rezerve et
                </p>
              </div>
            </button>
          </>
        )}
      </div>

      {/* --- ORTA KISIM: LİSTE VE TAKVİM --- */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card extra={"w-full p-6 h-full"}>
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              {role === "admin" ? "Tüm Yaklaşan Rezervasyonlar" : "Yaklaşan Rezervasyonlarım"}
            </h4>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
              {role === "admin" ? "Yönetici Görünümü" : "Kişisel Görünüm"}
            </span>
          </div>
          
          <div className="flex flex-col gap-4">
            {displayedReservations.length > 0 ? (
              displayedReservations.map((res) => (
                <div key={res.id} className="flex items-center justify-between rounded-2xl bg-lightPrimary p-4 shadow-sm transition hover:bg-gray-50 dark:bg-navy-800 dark:hover:bg-navy-700">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white dark:bg-brand-400">
                      <FiClock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-navy-700 dark:text-white">{res.resource}</p>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {role === "admin" && <span className="font-bold text-gray-800 dark:text-gray-100">{res.user} • </span>} 
                        {res.time}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      res.status === "Onaylandı" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {res.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="mt-4 text-sm text-gray-500">Henüz yaklaşan bir rezervasyonunuz bulunmuyor.</p>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-1 rounded-[20px]">
          <MiniCalendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;