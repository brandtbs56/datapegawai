"use client";

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
// import { useMemo } from "react";
// import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";

// // Data contoh
// const data = [
//   { year: "2020", value: 6237 },
//   { year: "2021", value: 5959 },
//   { year: "2022", value: 6630 },
//   { year: "2023", value: 6193 },
//   { year: "2025", value: 5742 },
// ];

// export default function HomePage() {
//   // Kolom tabel
//   const columns = useMemo<ColumnDef<typeof data[0]>[]>(() => [
//     { header: "Tahun", accessorKey: "year" },
//     { header: "Jumlah", accessorKey: "value" },
//   ], []);

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
//       <h1>📊 Pertumbuhan Jumlah ASN</h1>

//       {/* Bagian Grafik */}
//       <LineChart width={1000} height={300} data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="year" />
//         <YAxis domain={[5000, 'auto']}/>
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="value" stroke="#8884d8" />
//       </LineChart>

//       {/* Bagian Tabel */}
//       <h2 style={{ marginTop: "2rem" }}>Tabel Data</h2>
//       <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id}>
//                   {flexRender(header.column.columnDef.header, header.getContext())}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import GrafikPegawai from "./components/GrafikPegawai";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <GrafikPegawai />
    </main>
  );
}