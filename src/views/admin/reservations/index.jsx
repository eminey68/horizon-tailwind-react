import React, { useEffect, useState } from "react";
import Card from "components/card";
import { FiCheck, FiX, FiClock } from "react-icons/fi";

const Reservations = () => {
  // SİSTEME GİREN KİŞİNİN ROLÜNÜ HAFIZADAN ÇEKİYORUZ
  const [role, setRole] = useState("student"); 

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  // Örnek Rezervasyon Verileri
  const [requests, setRequests] = useState([
    { id: 1, resource: "Z-04 Yazılım Laboratuvarı", date: "15 Ekim 2026", time: "10:00 - 12:00", user: "Emine Yenil", status: "Beklemede" },
    { id: 2, resource: "Konferans Salonu", date: "16 Ekim 2026", time: "14:00 - 16:00", user: "Ahmet Yılmaz", status: "Onaylandı" },
  ]);

  // Yöneticinin butona basınca durumu değiştirmesini sağlayan fonksiyon
  const handleAction = (id, newStatus) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  return (
    <div className="mt-5 grid h-full grid-cols-1 gap-5">
      <Card extra={"w-full h-full p-4"}>
        <div className="relative flex items-center justify-between mb-8">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            {role === "admin" ? "Gelen Tüm Rezervasyon Talepleri" : "Geçmiş ve Aktif Rezervasyonlarım"}
          </div>
          {/* Sağ üstte kimin gözünden baktığımızı belirten ufak bir etiket */}
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
            {role === "admin" ? "Yönetici Görünümü" : "Öğrenci Görünümü"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 pb-3">
                <th className="pb-3 text-sm font-bold text-gray-600 dark:text-white">KAYNAK</th>
                <th className="pb-3 text-sm font-bold text-gray-600 dark:text-white">TARİH & SAAT</th>
                {role === "admin" && <th className="pb-3 text-sm font-bold text-gray-600 dark:text-white">TALEP EDEN</th>}
                <th className="pb-3 text-sm font-bold text-gray-600 dark:text-white">DURUM</th>
                <th className="pb-3 text-sm font-bold text-gray-600 dark:text-white text-center">İŞLEM</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-gray-100 last:border-none hover:bg-gray-50 dark:hover:bg-navy-800">
                  <td className="py-4 text-sm font-bold text-navy-700 dark:text-white">{req.resource}</td>
                  <td className="py-4 text-sm font-medium text-gray-600 dark:text-gray-300">{req.date} <br/> <span className="text-xs">{req.time}</span></td>
                  
                  {/* Yöneticiyse "Talep Eden Öğrenciyi" de görsün */}
                  {role === "admin" && <td className="py-4 text-sm font-medium text-gray-600 dark:text-gray-300">{req.user}</td>}
                  
                  <td className="py-4">
                    <span className={`flex w-fit items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                      req.status === "Onaylandı" ? "bg-green-100 text-green-700" : 
                      req.status === "Reddedildi" ? "bg-red-100 text-red-700" : 
                      "bg-orange-100 text-orange-700"
                    }`}>
                      {req.status === "Beklemede" && <FiClock />}
                      {req.status}
                    </span>
                  </td>
                  
                  <td className="py-4">
                    <div className="flex justify-center gap-2">
                      
                      {/* EĞER YÖNETİCİYSE VE DURUM BEKLEMEDEYSE ONAY/RET BUTONLARINI GÖSTER */}
                      {role === "admin" && req.status === "Beklemede" ? (
                        <>
                          <button onClick={() => handleAction(req.id, "Onaylandı")} title="Onayla" className="rounded-lg bg-green-500 p-2 text-white hover:bg-green-600 transition">
                            <FiCheck className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleAction(req.id, "Reddedildi")} title="Reddet" className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600 transition">
                            <FiX className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        // EĞER ÖĞRENCİYSE (VEYA İŞLEM BİTTİYSE) SADECE TİRE ÇİZGİSİ GÖSTER
                        <span className="text-gray-400">-</span>
                      )}

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Reservations;