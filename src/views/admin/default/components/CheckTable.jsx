import React from "react";
import CardMenu from "components/card/CardMenu";
import Checkbox from "components/checkbox";
import Card from "components/card";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Helper'ı en tepeye aldık
const columnHelper = createColumnHelper();

export default function CheckTable(props) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState([]);
  let defaultData = tableData;

  // SÜTUN AYARLARI (SENİN VERİTABANINA GÖRE DÜZENLENDİ)
  const columns = [
    // 1. REZERVASYON YERİ (Resources -> name)
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">REZERVASYON YERİ</p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <Checkbox
            defaultChecked={info.getValue()[1]}
            colorScheme="brandScheme"
            me="10px"
          />
          <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()[0]}
          </p>
        </div>
      ),
    }),

    // 2. DURUM (Reservations -> status)
    // Dokümanındaki 'Pending', 'Approved' yapısına uygun hale getirdik.
    columnHelper.accessor("status", { 
      id: "status",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          DURUM
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          {/* Status değerine göre renk ve ikon değişimi */}
          {info.getValue() === "Approved" ? (
            <span className="flex items-center text-green-500 font-bold text-sm bg-green-100 px-2 py-1 rounded-md">
               Onaylandı
            </span>
          ) : info.getValue() === "Pending" ? (
            <span className="flex items-center text-orange-500 font-bold text-sm bg-orange-100 px-2 py-1 rounded-md">
               Bekliyor
            </span>
          ) : (
            <span className="text-red-500 font-bold text-sm bg-red-100 px-2 py-1 rounded-md">
               İptal / Red
            </span>
          )}
        </div>
      ),
    }),

    // 3. KAPASİTE / KİŞİ SAYISI (Resources -> capacity)
    columnHelper.accessor("quantity", {
      id: "quantity",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          KAPASİTE
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()} Kişi
        </p>
      ),
    }),

    // 4. TARİH (Reservations -> start_time)
    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">TARİH</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
  ];

  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Son Rezervasyonlar
        </div>
        <CardMenu />
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 5)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3 pr-4"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}