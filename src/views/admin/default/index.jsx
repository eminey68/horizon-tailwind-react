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

  // --- YENİ: ER DİYAGRAMINA UYGUN BİRLEŞTİRİLMİŞ SAHTE VERİ (Randevular + Kullanıcılar) ---
  const allReservations = [
    { reservation_id: 1, kaynak_adi: "Z-04 Yazılım Laboratuvarı", baslangic_saati: "2026-03-16T10:00:00", bitis_saati: "2026-03-16T12:00:00", kullanici_ad_soyad: "Emine Yenil", durum: "APPROVED" },
    { reservation_id: 2, kaynak_adi: "Toplantı Odası A", baslangic_saati: "2026-03-18T14:00:00", bitis_saati: "2026-03-18T15:30:00", kullanici_ad_soyad: "Ahmet Yılmaz", durum: "PENDING" },
    { reservation_id: 3, kaynak_adi: "Amfi 101", baslangic_saati: "2026-03-20T16:00:00", bitis_saati: "2026-03-20T18:00:00", kullanici_ad_soyad: "Dr. Ayşe Kaya", durum: "APPROVED" },
    { reservation_id: 4, kaynak_adi: "Konferans Salonu", baslangic_saati: "2026-03-25T09:00:00", bitis_saati: "2026-03-25T11:00:00", kullanici_ad_soyad: "Emine Yenil", durum: "PENDING" },
  ];

  // --- YENİ: YARDIMCI FORMATLAYICILAR ---
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  };

  // --- DİNAMİK İSTATİSTİK HESAPLAMALARI (Backend'den geliyormuş gibi) ---
  
  // 1. Yönetici İstatistikleri
  const pendingCount = allReservations.filter(res => res.durum === "PENDING").length;
  const maintenanceCount = 2; // Bu değer ileride 'kaynaklar' tablosundan is_under_maintenance = true olanlardan çekilecek
  
  // 2. Öğrenci İstatistikleri
  const studentReservations = allReservations.filter(res => res.kullanici_ad_soyad === "Emine Yenil");
  const approvedCount = studentReservations.filter(res => res.durum === "APPROVED").length;
  
  // Öğrencinin sıradaki onaylanmış rezervasyonunu bulma
  const nextRes = studentReservations.find(res => res.durum === "APPROVED");
  const nextResText = nextRes ? `${formatDate(nextRes.baslangic_saati)}, ${formatTime(nextRes.baslangic_saati)} (${nextRes.kaynak_adi})` : "Planlanmış rezervasyon yok";

  // Tabloda gösterilecek liste ayrımı
  const displayedReservations = role === "admin" ? allReservations : studentReservations;

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
              subtitle={`${pendingCount} Yeni Talep`} // Dinamik Veri
            />
            <Widget
              icon={<FiCalendar className="h-6 w-6 text-brand-500" />}
              title={"Bugünkü Yoğunluk"}
              subtitle={"12 Aktif Kullanım"}
            />
            <Widget
              icon={<MdWarning className="h-7 w-7 text-red-500" />}
              title={"Arızalı / Bakımda"}
              subtitle={`${maintenanceCount} Kaynak Devre Dışı`} // Dinamik Veri
            />
          </>
        ) : (
          // ÖĞRENCİ / AKADEMİSYEN KARTLARI
          <>
            <Widget
              icon={<FiClock className="h-7 w-7 text-brand-500" />}
              title={"Sıradaki Rezervasyonum"}
              subtitle={nextResText} // Dinamik Veri
            />
            <Widget
              icon={<MdCheckCircle className="h-7 w-7 text-green-500" />}
              title={"Onaylanan Taleplerim"}
              subtitle={`Toplam ${approvedCount} Adet`} // Dinamik Veri
            />
            {/* Tıklanabilir Hızlı Rezervasyon Butonu */}
            <button 
              onClick={() => alert("Hızlı rezervasyon sayfasına yönlendiriliyor...")}
              className="!flex flex-row flex-grow items-center justify-start rounded-[20px] border-2 border-dashed border-brand-500 bg-white p-4 shadow-3xl shadow-shadow-500 transition-colors hover:bg-gray-50 cursor-pointer dark:!bg-navy-800 dark:hover:!bg-navy-700 dark:shadow-none"
            >
              <div className="flex h-[60px] w-auto flex-row items-center">
                <div className="rounded-full bg-brand-50 p-3 dark:bg-navy-700">
                  <FiPlusCircle className="h-7 w-7 text-brand-500" />
                </div>
              </div>
              <div className="ml-4 flex w-auto flex-col justify-center text-left">
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
                <div key={res.reservation_id} className="flex items-center justify-between rounded-2xl bg-lightPrimary p-4 shadow-sm transition hover:bg-gray-50 dark:bg-navy-800 dark:hover:bg-navy-700">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white dark:bg-brand-400 shrink-0">
                      <FiClock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-navy-700 dark:text-white">{res.kaynak_adi}</p>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {role === "admin" && <span className="font-bold text-gray-800 dark:text-gray-100">{res.kullanici_ad_soyad} • </span>} 
                        {formatDate(res.baslangic_saati)} | {formatTime(res.baslangic_saati)} - {formatTime(res.bitis_saati)}
                      </p>
                    </div>
                  </div>
                  <div>
                    {/* ENUM'a göre renklenen etiket */}
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      res.durum === "APPROVED" ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" : 
                      res.durum === "PENDING" ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400" : 
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {res.durum === "APPROVED" ? "Onaylandı" : res.durum === "PENDING" ? "Beklemede" : res.durum}
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