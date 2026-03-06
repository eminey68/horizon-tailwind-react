import React, { useEffect, useState } from "react";
import Card from "components/card";
import { FiArrowLeft, FiMapPin, FiInfo, FiCheckCircle } from "react-icons/fi";

const ResourceDetail = () => {
  const [resource, setResource] = useState(null);

  // Sayfa açıldığında hafızaya kaydettiğimiz veriyi geri çağırıyoruz
  useEffect(() => {
    const savedData = localStorage.getItem("selectedResource");
    if (savedData) {
      setResource(JSON.parse(savedData));
    }
  }, []);

  if (!resource) {
    return <div className="mt-10 text-center text-gray-600">Kaynak bilgisi yükleniyor...</div>;
  }

  return (
    <div className="mt-5 flex w-full flex-col gap-5">
      
      {/* Geri Dön Butonu */}
      <div>
        <a href="/admin/data-tables" className="inline-flex items-center gap-2 font-medium text-brand-500 hover:text-brand-600 dark:text-white">
          <FiArrowLeft className="h-5 w-5" /> Kaynak Listesine Dön
        </a>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        
        {/* SOL TARAF - Kaynak Bilgileri Kartı */}
        <div className="col-span-1 lg:col-span-7">
          <Card extra={"w-full p-6"}>
            <h2 className="text-3xl font-bold text-navy-700 dark:text-white mb-2">
              {resource.name}
            </h2>
            <p className="flex items-center gap-2 text-base text-gray-600 dark:text-gray-300 mb-6">
              <FiMapPin className="text-brand-500" /> {resource.campus ? resource.campus : "Karacasu Kampüsü"} | {resource.location ? resource.location : "A Blok"}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-lightPrimary p-4 dark:bg-navy-900">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Kaynak Türü</p>
                <p className="text-xl font-bold text-navy-700 dark:text-white">{resource.tech}</p>
              </div>
              <div className="rounded-xl bg-lightPrimary p-4 dark:bg-navy-900">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Kapasite</p>
                <p className="text-xl font-bold text-navy-700 dark:text-white">{resource.quantity} Kişi</p>
              </div>
              <div className="rounded-xl bg-lightPrimary p-4 dark:bg-navy-900">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Mevcut Durum</p>
                <p className={`text-xl font-bold ${resource.date === "Aktif" ? "text-green-500" : "text-red-500"}`}>
                  {resource.date}
                </p>
              </div>
              <div className="rounded-xl bg-lightPrimary p-4 dark:bg-navy-900">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Sorumlu Birim</p>
                <p className="text-xl font-bold text-navy-700 dark:text-white">Öğrenci İşleri / BİDB</p>
              </div>
            </div>
            
            <div className="mt-6 flex items-start gap-2 rounded-lg bg-blue-50 p-4 text-blue-700 dark:bg-navy-900 dark:text-blue-300">
               <FiInfo className="mt-1 h-5 w-5 shrink-0" />
               <p className="text-sm">
                 Bu laboratuvar/amfi sadece akademik takvim içerisinde yer alan saatlerde rezerve edilebilir. Lütfen talebinizi en az 2 gün önceden oluşturunuz.
               </p>
            </div>
          </Card>
        </div>

        {/* SAĞ TARAF - Talep Formu Kartı */}
        <div className="col-span-1 lg:col-span-5">
          <Card extra={"w-full p-6 h-full"}>
            <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-4">
              Rezervasyon Talebi Oluştur
            </h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-white">Etkinlik / Kullanım Amacı</label>
                <input type="text" placeholder="Örn: Proje Çalışması" className="mt-2 w-full rounded-lg border border-gray-200 bg-white p-3 text-sm outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-900 dark:text-white" />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-white">Talep Edilen Tarih</label>
                <input type="date" className="mt-2 w-full rounded-lg border border-gray-200 bg-white p-3 text-sm outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-900 dark:text-white" />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-white">Saat Aralığı</label>
                <div className="mt-2 flex gap-2">
                  <input type="time" className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-900 dark:text-white" />
                  <span className="flex items-center text-gray-500">-</span>
                  <input type="time" className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-900 dark:text-white" />
                </div>
              </div>

              <button
                disabled={resource.date !== "Aktif"}
                onClick={() => {
                   alert("✅ Rezervasyon Talebiniz Alındı!");
                   window.location.href = "/admin/reservations"; // Onaylayınca rezervasyonlarıma atsın
                }}
                className={`mt-4 w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-white transition duration-200 ${
                  resource.date === "Aktif" ? "bg-brand-500 hover:bg-brand-600" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {resource.date === "Aktif" ? ( <><FiCheckCircle /> Talebi Gönder</> ) : "Şu An Kullanılamaz"}
              </button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default ResourceDetail;