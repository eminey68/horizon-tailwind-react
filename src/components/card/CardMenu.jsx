import React from "react";
import Dropdown from "components/dropdown";
import { BsThreeDots } from "react-icons/bs";
import { FiRefreshCw, FiPrinter, FiDownload, FiSettings } from "react-icons/fi";

function CardMenu(props) {
  const { transparent } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <Dropdown
      button={
        <button
          onClick={() => setOpen(!open)}
          open={open}
          className={`flex items-center text-xl hover:cursor-pointer ${
            transparent
              ? "bg-none text-white hover:bg-none active:bg-none"
              : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
          } linear justify-center rounded-lg font-bold transition duration-200`}
        >
          <BsThreeDots className="h-6 w-6" />
        </button>
      }
      animation={"origin-top-right transition-all duration-300 ease-in-out"}
      classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
      children={
        <div className="z-50 w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          
          {/* 1. Seçenek: YENİLE */}
          <p className="hover:text-black flex cursor-pointer items-center gap-2 text-gray-600 hover:font-medium dark:text-white dark:hover:text-gray-300">
            <span>
              <FiRefreshCw />
            </span>
            Listeyi Yenile
          </p>

          {/* 2. Seçenek: EXCEL İNDİR */}
          <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium dark:text-white dark:hover:text-gray-300">
            <span>
              <FiDownload />
            </span>
            Excel İndir
          </p>

           {/* 3. Seçenek: YAZDIR */}
           <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium dark:text-white dark:hover:text-gray-300">
            <span>
              <FiPrinter />
            </span>
            Yazdır
          </p>
          
           {/* Ayırıcı Çizgi */}
           <div className="my-2 h-px bg-gray-200 dark:bg-white/20" />

           {/* 4. Seçenek: AYARLAR */}
           <p className="hover:text-black flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium dark:text-white dark:hover:text-gray-300">
            <span>
              <FiSettings />
            </span>
            Tablo Ayarları
          </p>
        </div>
      }
    />
  );
}

export default CardMenu;