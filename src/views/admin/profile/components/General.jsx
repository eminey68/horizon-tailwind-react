import Card from "components/card";
import React from "react";

const General = () => {
  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Başlık */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Öğrenci Bilgileri
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          Bu bilgiler Öğrenci İşleri Daire Başkanlığı sisteminden otomatik olarak çekilmektedir.
          Bir yanlışlık olduğunu düşünüyorsanız lütfen danışmanınızla iletişime geçiniz.
        </p>
      </div>
      
      {/* Bilgi Kartları */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Öğrenci Numarası</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            231234001
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Bölüm / Fakülte</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Yazılım Müh. / Mühendislik Fak.
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Akademik Yıl</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            2. Sınıf (Güz Dönemi)
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Kurumsal E-Posta</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            24020091008@ogr.istiklal.edu.tr
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Danışman</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Dr. Öğr. Üyesi Sait Çelik
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Hesap Durumu</p>
          <p className="text-base font-bold text-green-500">
            Aktif (Rezervasyon Yapabilir)
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;