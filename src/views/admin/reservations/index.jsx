import React, { useState } from "react";
import Card from "components/card";
import { FiTrash2, FiClock, FiCheckCircle, FiXCircle, FiAlertTriangle, FiSearch, FiInfo } from "react-icons/fi";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function MyReservations() {
  
  const [reservations, setReservations] = useState([
    { 
      reservation_id: 1, 
      kaynak_adi: "Z-04 Yazılım Laboratuvarı", 
      baslangic_saati: "2026-03-16T10:00:00", 
      bitis_saati: "2026-03-16T12:00:00", 
      durum: "APPROVED" 
    },
    { 
      reservation_id: 2, 
      kaynak_adi: "Toplantı Odası A", 
      baslangic_saati: "2026-03-18T14:00:00", 
      bitis_saati: "2026-03-18T15:30:00", 
      durum: "PENDING" 
    },
    { 
      reservation_id: 3, 
      kaynak_adi: "Amfi 101", 
      baslangic_saati: "2026-03-10T13:00:00", 
      bitis_saati: "2026-03-10T15:00:00", 
      durum: "COMPLETED" 
    },
    { 
      reservation_id: 4, 
      kaynak_adi: "Fizik Laboratuvarı", 
      baslangic_saati: "2026-03-05T09:00:00", 
      bitis_saati: "2026-03-05T12:00:00", 
      durum: "CANCELLED" 
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRes, setSelectedRes] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusDisplay = (statusCode) => {
    switch(statusCode) {
      case "APPROVED": return { text: "Onaylandı", style: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400", icon: <FiCheckCircle /> };
      case "PENDING": return { text: "Beklemede", style: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400", icon: <FiClock /> };
      case "COMPLETED": return { text: "Tamamlandı", style: "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-300", icon: <BsFillCheckCircleFill /> };
      case "CANCELLED": return { text: "İptal Edildi", style: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400", icon: <FiXCircle /> };
      default: return { text: statusCode, style: "bg-gray-100 text-gray-500", icon: <FiInfo /> };
    }
  };

  const handleOpenModal = (res) => {
    setSelectedRes(res);
    setIsModalOpen(true);
  };

  const handleConfirmCancel = () => {
    setReservations(prev => 
      prev.map(item => item.reservation_id === selectedRes.reservation_id ? { ...item, durum: "CANCELLED" } : item)
    );
    setIsModalOpen(false);
    setSelectedRes(null);
  };

  const filteredReservations = reservations.filter((res) => {
    const searchLower = searchTerm.toLowerCase();
    const statusText = getStatusDisplay(res.durum).text.toLowerCase();
    const dateText = formatDate(res.baslangic_saati).toLowerCase();
    
    return (
      res.kaynak_adi.toLowerCase().includes(searchLower) ||
      statusText.includes(searchLower) ||
      dateText.includes(searchLower)
    );
  });

  return (
    <div className="mt-3 flex h-full w-full flex-col gap-5">
      
      <div className="mb-4">
        <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
          Geçmiş ve gelecek tüm kaynak kullanım talepleriniz.
        </p>
      </div>

      <Card extra={"w-full h-full sm:overflow-auto px-6 pb-6 pt-4"}>
        
        <div className="mb-4 mt-2 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Talep Geçmişi
          </h4>
          
          <div className="flex h-10 items-center rounded-full bg-lightPrimary dark:bg-navy-900 text-navy-700 dark:text-white px-4 border border-gray-200 dark:border-white/10 w-full md:w-72">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white shrink-0" />
            <input
              id="kyp-search" 
              autoComplete="off" 
              type="text"
              placeholder="Laboratuvar, tarih veya durum ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="ml-2 w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-sm placeholder:text-gray-400 dark:placeholder:text-white/50 dark:text-white"
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
              {filteredReservations.length > 0 ? (
                filteredReservations.map((res) => {
                  const statusInfo = getStatusDisplay(res.durum);

                  return (
                  <tr key={res.reservation_id} className="border-b border-gray-50 transition-colors hover:bg-gray-50 dark:border-white/5 dark:hover:bg-navy-800">
                    
                    <td className="py-4 pr-4">
                      <p className="text-base font-bold text-navy-700 dark:text-white">{res.kaynak_adi}</p>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{formatDate(res.baslangic_saati)}</p>
                    </td>

                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-navy-700 dark:text-white">
                        <FiClock className="text-brand-500" /> {formatTime(res.baslangic_saati)} - {formatTime(res.bitis_saati)}
                      </div>
                    </td>

                    <td className="py-4 pr-4">
                      <span className={`flex w-fit items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${statusInfo.style}`}>
                        {statusInfo.icon}
                        {statusInfo.text}
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      {(res.durum === "APPROVED" || res.durum === "PENDING") ? (
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
                )})
              ) : (
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

      {/* --- İPTAL ONAY PENCERESİ --- */}
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
              <strong className="text-navy-700 dark:text-white">{formatDate(selectedRes?.baslangic_saati)}</strong> tarihindeki <strong className="text-navy-700 dark:text-white">{selectedRes?.kaynak_adi}</strong> rezervasyonunuzu iptal etmek istediğinize emin misiniz? Bu işlem geri alınamaz.
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