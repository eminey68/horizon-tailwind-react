import React from "react";
import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification"; // Varsa bildirim ayarları kalsın

const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        {/* SOL TARAFI KAPLAYAN KISIM (Banner) - 4 Birim Genişlik */}
        <div className="col-span-4 lg:!mb-0">
          <Banner />
        </div>

        {/* SAĞ TARAFI KAPLAYAN KISIM (Genel Bilgiler) - 8 Birim Genişlik */}
        <div className="col-span-8 lg:!mb-0">
          <General />
        </div>
      </div>
      
      {/* İstersen alta bildirim ayarları veya geçmiş rezervasyonlar eklenebilir. 
          Şimdilik burayı boş bırakıyoruz ki sade olsun. */}
      {/* <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <Project />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General />
        </div>
      </div> */}
    </div>
  );
};

export default ProfileOverview;