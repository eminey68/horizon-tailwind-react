import React, { useState, useEffect } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import { FiEye, FiEdit, FiTrash2, FiPlus } from "react-icons/fi"; 
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export default function DevelopmentTable(props) {
  const { tableData } = props;
  const [sorting, setSorting] = useState([]);
  
  // ROLÜ HAFIZADAN ÇEK
  const [role, setRole] = useState("student");

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const handleInspect = (rowData) => {
    localStorage.setItem("selectedResource", JSON.stringify(rowData));
    window.location.href = "/admin/resource-detail";
  };

  const handleDelete = (name) => {
    if(window.confirm(`⚠️ ${name} adlı kaynağı sistemden silmek istediğinize emin misiniz?`)) {
      alert("✅ Kaynak başarıyla silindi!");
    }
  };

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">KAYNAK ADI</p>,
      cell: (info) => <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()}</p>,
    }),
    columnHelper.accessor("tech", { 
      id: "tech",
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">TÜRÜ</p>,
      cell: (info) => <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()}</p>,
    }),
    columnHelper.accessor("quantity", { 
      id: "quantity",
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">KAPASİTE</p>,
      cell: (info) => <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()} Kişi</p>,
    }),
    columnHelper.accessor("date", { 
      id: "date",
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">DURUM</p>,
      cell: (info) => (
        <div className="flex items-center">
           {info.getValue() === "Aktif" ? (
            <span className="text-green-500 font-bold text-sm">● Aktif</span>
          ) : (
            <span className="text-red-500 font-bold text-sm">● Tadilatta</span>
          )}
        </div>
      ),
    }),
    
    // İŞLEM SÜTUNU
    columnHelper.display({
      id: "actions",
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white text-center">İŞLEM</p>,
      cell: (info) => (
        <div className="flex items-center justify-center gap-2">
          
          {/* Herkes görür: İncele Butonu */}
          <button
            onClick={() => handleInspect(info.row.original)} 
            title="İncele / Talep Et"
            className="flex items-center gap-2 rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white transition duration-200 hover:bg-brand-600"
          >
            <FiEye className="h-4 w-4" />
            {/* Eğer yönetici değilse yanında 'İncele' yazsın, yöneticiyse buton kalabalık olmasın diye sadece ikon görünsün */}
            {role !== "admin" && <span>İncele</span>}
          </button>

          {/* SADECE YÖNETİCİ GÖRÜR: Düzenle ve Sil Butonları */}
          {role === "admin" && (
            <>
              <button
                onClick={() => alert("✏️ Düzenleme formu açılacak...")}
                title="Kaynağı Güncelle"
                className="flex items-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white transition duration-200 hover:bg-orange-600"
              >
                <FiEdit className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => handleDelete(info.row.original.name)}
                title="Kaynağı Sil"
                className="flex items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition duration-200 hover:bg-red-600"
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            </>
          )}

        </div>
      ),
    }),
  ];

  const [data] = useState(() => [...tableData]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between">
        
        {/* Sol Üst Başlık ve Etiket */}
        <div className="flex flex-col">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Üniversite Kaynak Listesi (Envanter)
          </div>
          <span className="mt-1 w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
            {role === "admin" ? "Yönetici Yetkisi Aktif" : role === "academic" ? "Akademisyen Görünümü" : "Öğrenci Görünümü"}
          </span>
        </div>

        {/* Sağ Üst Alan: Yöneticiyse 'Ekle' butonu, değilse standart menü */}
        <div className="flex items-center gap-3">
          {role === "admin" && (
            <button
              onClick={() => alert("➕ Yeni Kaynak Ekleme formu açılacak...")}
              className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-green-600"
            >
              <FiPlus className="h-5 w-5" /> Yeni Kaynak Ekle
            </button>
          )}
          <CardMenu />
        </div>

      </div>

      {/* Tablo Render Alanı */}
      <div className="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan} onClick={header.column.getToggleSortingHandler()} className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start">
                    <div className="items-center justify-between text-xs text-gray-200">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-navy-800 transition">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="min-w-[150px] border-white/0 py-3 pr-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}