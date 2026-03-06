import React from "react";
import Card from "components/card";

const Banner = () => {
  return (
    <Card extra={"items-center w-full h-full p-[16px] py-8"}>
      
      {/* İsim ve Bölüm */}
      <div className="flex flex-col items-center">
        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
          Emine Yenil
        </h4>
        <p className="text-base font-normal text-gray-600 mt-1">Yazılım Mühendisliği Öğrencisi</p>
      </div>

      {/* İstatistikler */}
      <div className="mt-8 mb-3 flex gap-8 md:!gap-14">
        
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-bold text-navy-700 dark:text-white">12</p>
          <p className="text-sm font-normal text-gray-600">Toplam Talep</p>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-bold text-navy-700 dark:text-white">4</p>
          <p className="text-sm font-normal text-gray-600">Onaylanan</p>
        </div>
        
        {/* Ceza Puanı kısmı buradan tamamen silindi */}

      </div>
    </Card>
  );
};

export default Banner;