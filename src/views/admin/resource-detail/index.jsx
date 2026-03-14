import React, { useState } from "react";
import { FiClock, FiCalendar, FiInfo, FiMapPin, FiChevronLeft } from "react-icons/fi";

export default function ResourceDetail() {
  // Takvimde seçilen günü tutacağımız state
  const [selectedDay, setSelectedDay] = useState(null);

  // BACKEND SİMÜLASYONU: Hangi günlerde hangi saatler dolu?
  // (Örneğin: Ayın 12'sinde iki farklı saat dolu)
  const bookedSlots = {
    12: ["10:00 - 12:00", "14:30 - 16:30"],
    15: ["09:00 - 11:00"],
    18: ["13:00 - 15:00", "15:30 - 17:30"],
    24: ["10:00 - 12:00"]
  };

  // 1'den 31'e kadar günleri oluşturan basit bir dizi (Mart ayı simülasyonu)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex w-full flex-col gap-5">
      
      {/* Üst Başlık ve Geri Butonu */}
      <div className="flex flex-col gap-2 mb-2">
        <button className="flex w-fit items-center gap-2 text-sm font-bold text-[#e6b13e] transition hover:text-[#d6a12e]">
          <FiChevronLeft className="h-5 w-5" /> Kaynak Listesine Dön
        </button>
        <h2 className="text-3xl font-bold text-navy-700 dark:text-white">Kaynak Detay</h2>
      </div>

      {/* Ana İçerik: İki Kolonlu Yapı */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        
        {/* --- SOL KOLON: DETAYLAR VE TAKVİM (2 birim genişlik) --- */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          
          {/* Kaynak Bilgileri Kartı */}
          <div className="flex flex-col rounded-[20px] bg-white bg-clip-border p-6 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <h3 className="text-2xl font-bold text-navy-700 dark:text-white">Z-04 Yazılım Laboratuvarı</h3>
            <p className="mt-1 flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400">
              <FiMapPin className="text-[#e6b13e]" /> Karacasu Kampüsü | A Blok
            </p>

            {/* 4'lü Bilgi Kutuları */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col justify-center rounded-2xl bg-gray-50 p-4 dark:bg-navy-700">
                <p className="text-sm text-gray-500">Kaynak Türü</p>
                <p className="text-lg font-bold text-navy-700 dark:text-white">Laboratuvar</p>
              </div>
              <div className="flex flex-col justify-center rounded-2xl bg-gray-50 p-4 dark:bg-navy-700">
                <p className="text-sm text-gray-500">Kapasite</p>
                <p className="text-lg font-bold text-navy-700 dark:text-white">45 Kişi</p>
              </div>
              <div className="flex flex-col justify-center rounded-2xl bg-gray-50 p-4 dark:bg-navy-700">
                <p className="text-sm text-gray-500">Mevcut Durum</p>
                <p className="text-lg font-bold text-green-500">Aktif</p>
              </div>
              <div className="flex flex-col justify-center rounded-2xl bg-gray-50 p-4 dark:bg-navy-700">
                <p className="text-sm text-gray-500">Sorumlu Birim</p>
                <p className="text-lg font-bold text-navy-700 dark:text-white">Öğrenci İşleri / BİDB</p>
              </div>
            </div>

            {/* Bilgi Notu */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-blue-50 p-4 text-blue-600 dark:bg-navy-700 dark:text-blue-300">
              <FiInfo className="mt-1 h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">
                Bu laboratuvar/amfi sadece akademik takvim içerisinde yer alan saatlerde rezerve edilebilir. Lütfen talebinizi en az 2 gün önceden oluşturunuz.
              </p>
            </div>
          </div>

          {/* YENİ: DOLULUK TAKVİMİ KARTI */}
          <div className="flex flex-col rounded-[20px] bg-white bg-clip-border p-6 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <h4 className="text-lg font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
              <FiCalendar className="text-brand-500" /> Mart 2026 Doluluk Takvimi
            </h4>
            
            {/* Takvim Izgarası (Grid) */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
                <div key={day} className="text-xs font-bold text-gray-400 mb-2">{day}</div>
              ))}
              
              {/* Boşluklar (Ayın ilk gününü kaydırmak için) */}
              <div className="p-2"></div><div className="p-2"></div>
              
              {/* Günler */}
              {daysInMonth.map(day => {
                const isBooked = bookedSlots[day];
                const isSelected = selectedDay === day;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`relative flex h-10 w-10 flex-col items-center justify-center rounded-full text-sm font-bold transition-all mx-auto
                      ${isSelected ? "bg-brand-500 text-white shadow-md" : "bg-gray-50 text-navy-700 hover:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-600"}
                    `}
                  >
                    {day}
                    {/* Eğer o gün dolu bir saat varsa altına kırmızı nokta koy */}
                    {isBooked && (
                      <span className={`absolute bottom-1.5 h-1 w-1 rounded-full ${isSelected ? "bg-white" : "bg-red-500"}`}></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tıklanan Günün Detayları (Açılır Kutu) */}
            {selectedDay && (
              <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-navy-600 dark:bg-navy-700">
                <p className="text-sm font-bold text-navy-700 dark:text-white mb-3">
                  {selectedDay} Mart 2026 İçin Dolu Saatler:
                </p>
                {bookedSlots[selectedDay] ? (
                  <div className="flex flex-wrap gap-2">
                    {bookedSlots[selectedDay].map((time, index) => (
                      <span key={index} className="flex items-center gap-1 rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-600 dark:bg-red-500/20 dark:text-red-400">
                        <FiClock /> {time} (Dolu)
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-medium text-green-500 flex items-center gap-1">
                    ✅ Bu tarihte hiçbir rezervasyon yok. Tüm gün müsait!
                  </p>
                )}
              </div>
            )}
          </div>

        </div>

        {/* --- SAĞ KOLON: REZERVASYON FORMU (1 birim genişlik) --- */}
        <div className="flex flex-col h-fit rounded-[20px] bg-white bg-clip-border p-6 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white mb-6">Rezervasyon Talebi Oluştur</h4>
          
          <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert("Talep Gönderildi!"); }}>
            
            <div>
              <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Etkinlik / Kullanım Amacı</label>
              <input type="text" placeholder="Örn: Proje Çalışması" className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:text-white" required />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Talep Edilen Tarih</label>
              {/* Eğer takvimden bir gün seçildiyse inputa otomatik o tarihi yaz, seçilmediyse boş kalsın */}
              <input type="date" value={selectedDay ? `2026-03-${selectedDay.toString().padStart(2, '0')}` : ""} onChange={() => {}} className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:text-white" required />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600 dark:text-gray-300 mb-2 block">Saat Aralığı</label>
              <div className="flex items-center gap-2">
                <input type="time" className="flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:text-white" required />
                <span className="text-gray-400 font-bold">-</span>
                <input type="time" className="flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:text-white" required />
              </div>
            </div>

            <button type="submit" className="mt-4 w-full rounded-xl bg-[#e6b13e] py-[12px] text-base font-bold text-white transition duration-200 hover:bg-[#d6a12e]">
              ✔️ Talebi Gönder
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}