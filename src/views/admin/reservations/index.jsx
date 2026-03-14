import React, { useState } from "react";
import Card from "components/card";
import { FiTrash2, FiClock, FiCheckCircle, FiXCircle, FiAlertTriangle, FiSearch, FiCheck } from "react-icons/fi";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function MyReservations() {
  const [reservations, setReservations] = useState([
    { id: 1, resource: "Z-04 Yazılım Laboratuvarı", date: "16 Mart 2026", time: "10:00 - 12:00", status: "Onaylandı", type: "upcoming" },
    { id: 2, resource: "Toplantı Odası A", date: "18 Mart 2026", time: "14:00 - 15:30", status: "Beklemede", type: "upcoming" },
    { id: 3, resource: "Amfi 101", date: "10 Mart 2026", time: "13:00 - 15:00", status: "Tamamlandı", type: "past" },
    { id: 4, resource: "Fizik Laboratuvarı", date: "05 Mart 2026", time: "09:00 - 12:00", status: "İptal Edildi", type: "past" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRes, setSelectedRes] = useState(null);
  
  // --- YENİ: ARAMA ÇUBUĞU STATE'İ ---
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = (res) => {
    setSelectedRes(res);
    setIsModalOpen(true);
  };

  const handleConfirmCancel = () => {
    setReservations(prev => 
      prev.map(item => item.id === selectedRes.id ? { ...item, status: "İptal Edildi", type: "past" } : item)
    );
    setIsModalOpen(false);
    setSelectedRes(null);
  };

  // --- YENİ: FİLTRELEME MANTIĞI (Sihir burada!) ---
  // Kullanıcının yazdığı kelimeyi alıp; kaynak adında, tarihte veya durumda arıyoruz.
  const filteredReservations = reservations.filter((res) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      res.resource.toLowerCase().includes(searchLower) ||
      res.status.toLowerCase().includes(searchLower) ||
      res.date.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="mt-3 flex h-full w-full flex-col gap-5">
      
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-navy-700 dark:text-white">Rezervasyonlarım</h2>
        <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
          Geçmiş ve gelecek tüm kaynak kullanım talepleriniz.
        </p>
      </div>

      <Card extra={"w-full h-full sm:overflow-auto px-6 pb-6 pt-4"}>
        
        {/* --- YENİ: KART BAŞLIĞI VE ARAMA ÇUBUĞU YAN YANA --- */}
        <div className="mb-4 mt-2 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Talep Geçmişi
          </h4>
          
          {/* Arama Çubuğu UI (Horizon UI'ın orijinal arama çubuğuna benzer) */}
          <div className="flex h-10 items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white px-4 border border-gray-200 dark:border-white/10 w-full md:w-72">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
            <input
              type="text"
              placeholder="Laboratuvar, tarih veya durum ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Klavyeye her basıldığında state güncellenir
              className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-gray-400 dark:placeholder:text-white/50"
            />
          </div>
        </div>

        <div className="overflow-x-scroll xl:overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/10">
                <th className="pb-3 text-sm font-bold text-gray-400">KAYNAK / TARİH</th>
                <th className="pb-3 text-sm font-bold text-gray-400">SAAT</th>
                <th className="pb-3 text-sm font-bold text-gray-400">DURUM</th>
                <th className="pb-3 text-right text-sm font-bold text-gray-400">İŞLEM</th>
              </tr>
            </thead>
            <tbody>
              {/* Eski 'reservations.map' yerine 'filteredReservations.map' kullanıyoruz */}
              {filteredReservations.length > 0 ? (
                filteredReservations.map((res) => (
                  <tr key={res.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50 dark:border-white/5 dark:hover:bg-navy-800">
                    
                    <td className="py-4 pr-4">
                      <p className="text-base font-bold text-navy-700 dark:text-white">{res.resource}</p>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{res.date}</p>
                    </td>

                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-navy-700 dark:text-white">
                        <FiClock className="text-brand-500" /> {res.time}
                      </div>
                    </td>

                    <td className="py-4 pr-4">
                      <span className={`flex w-fit items-center gap-1 rounded-full px-3 py-1 text-xs font-bold
                        ${res.status === "Onaylandı" ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" : ""}
                        ${res.status === "Beklemede" ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400" : ""}
                        ${res.status === "Tamamlandı" ? "bg-green-100 text-green-600 dark:bg-green/10 dark:text-green-300" : ""}
                        ${res.status === "İptal Edildi" ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400" : ""}
                      `}>
                        {res.status === "Onaylandı" && <FiCheckCircle />}
                        {res.status === "Beklemede" && <FiClock />}
                        {res.status === "İptal Edildi" && <FiXCircle />}
                        {res.status === "Tamamlandı" && <BsFillCheckCircleFill />}
                        {res.status}
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      {(res.status === "Onaylandı" || res.status === "Beklemede") ? (
                        <button 
                          onClick={() => handleOpenModal(res)}
                          className="flex items-center justify-end gap-2 text-sm font-bold text-red-500 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 ml-auto"
                        >
                          <FiTrash2 className="h-4 w-4" /> İptal Et
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-gray-400 italic">İşlem Yok</span>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                /* Aranan kelime bulunamazsa gösterilecek mesaj */
                <tr>
                  <td colSpan="4" className="py-8 text-center text-sm font-medium text-gray-500">
                    "{searchTerm}" ile eşleşen bir rezervasyon bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* --- İPTAL ONAY PENCERESİ (MODAL) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-all">
          <div className="w-full max-w-md transform rounded-3xl bg-white p-6 shadow-2xl transition-all dark:bg-navy-800 border border-gray-100 dark:border-navy-700">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
              <FiAlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="mb-2 text-center text-xl font-bold text-navy-700 dark:text-white">
              Rezervasyonu İptal Et
            </h3>
            <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-300">
              <strong className="text-navy-700 dark:text-white">{selectedRes?.date}</strong> tarihindeki <strong className="text-navy-700 dark:text-white">{selectedRes?.resource}</strong> rezervasyonunuzu iptal etmek istediğinize emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full rounded-xl bg-gray-100 py-3 text-sm font-bold text-navy-700 transition hover:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-600"
              >
                Vazgeç
              </button>
              <button 
                onClick={handleConfirmCancel}
                className="w-full rounded-xl bg-red-500 py-3 text-sm font-bold text-white shadow-md transition hover:bg-red-600 hover:shadow-lg"
              >
                Evet, İptal Et
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}