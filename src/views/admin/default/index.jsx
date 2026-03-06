import React, { useState, useEffect } from "react";
import MiniCalendar from "components/calendar/MiniCalendar";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard, MdPerson } from "react-icons/md";
import { FiClock } from "react-icons/fi"; 

import Widget from "components/widget/Widget";
import Card from "components/card";

const Dashboard = () => {
  // 1. SİSTEME GİREN KİŞİNİN ROLÜNÜ ÇEKİYORUZ
  const [role, setRole] = useState("student");
  
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  // 2. TÜM VERİTABANI SİMÜLASYONU
  const allReservations = [
    { id: 1, resource: "Z-04 Yazılım Laboratuvarı", time: "10:00 - 12:00", user: "Emine Yenil", status: "Onaylandı" },
    { id: 2, resource: "Toplantı Odası A", time: "14:00 - 15:30", user: "Ahmet Yılmaz", status: "Beklemede" },
    { id: 3, resource: "Amfi 101", time: "16:00 - 18:00", user: "Dr. Ayşe Kaya", status: "Onaylandı" },
    { id: 4, resource: "Konferans Salonu", time: "09:00 - 11:00", user: "Emine Yenil", status: "Beklemede" },
  ];

  // 3. FİLTRELEME MANTIĞI (Sihrin Gerçekleştiği Yer)
  // Eğer giren yöneticiyse hepsini göster, değilse SADECE Emine Yenil'in rezervasyonlarını göster.
  const displayedReservations = role === "admin" 
    ? allReservations 
    : allReservations.filter(res => res.user === "Emine Yenil");

  return (
    <div>
      {/* --- ÜST KISIM: İSTATİSTİK KARTLARI --- */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Toplam Laboratuvar"}
          subtitle={"12 Adet"}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Toplantı Odası"}
          subtitle={"8 Adet"}
        />
        <Widget
          icon={<IoDocuments className="h-7 w-7" />}
          title={"Onay Bekleyen"}
          subtitle={"5 Talep"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Günlük Doluluk"}
          subtitle={"%75"}
        />
        <Widget
          icon={<MdPerson className="h-7 w-7" />}
          title={"Akademisyen"}
          subtitle={"42 Kişi"}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Toplam Rezervasyon"}
          subtitle={"1,245"}
        />
      </div>

      {/* --- ORTA KISIM: LİSTE VE TAKVİM --- */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        
        {/* Sol Taraf: REZERVASYON LİSTESİ */}
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
                <div key={res.id} className="flex items-center justify-between rounded-2xl bg-lightPrimary p-4 shadow-sm dark:bg-navy-800 transition hover:bg-gray-50 dark:hover:bg-navy-700">
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
              <p className="text-gray-500 text-sm mt-4">Henüz yaklaşan bir rezervasyonunuz bulunmuyor.</p>
            )}
          </div>
        </Card>

        {/* Sağ Taraf: TAKVİM */}
        <div className="grid grid-cols-1 rounded-[20px]">
          <MiniCalendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;