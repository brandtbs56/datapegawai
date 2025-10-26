"use client";
import { useEffect, useState } from "react";

type RekapJenisKelamin = {
  unit_kerja_induk: string;
  laki_laki: number;
  perempuan: number;
};

export default function TabelRekapJenisKelamin() {
  const [data, setData] = useState<RekapJenisKelamin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pegawai")
      .then(res => res.json())
    .then((res: any) => {
      let sortedData: RekapJenisKelamin[] = [];
      if (Array.isArray(res)) sortedData = res;
      else if (Array.isArray(res.data)) sortedData = res.data;

      // Urutkan berdasarkan unit_kerja_induk (ascending)
      sortedData.sort((a, b) =>
        a.unit_kerja_induk.localeCompare(b.unit_kerja_induk)
      );

      setData(sortedData);
    })
    .catch(() => setData([]))
    .finally(() => setLoading(false));
}, []);

  if (loading)
    return <div className="text-center py-10 text-gray-500">Memuat data...</div>;

  if (!data.length)
    return <div className="text-center py-10 text-gray-500">Tidak ada data.</div>;

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">Rekap Pegawai per Unit Kerja (Jenis Kelamin)</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">No</th>
            <th className="border p-2">Unit Kerja</th>
            <th className="border p-2">Laki-laki</th>
            <th className="border p-2">Perempuan</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="border p-2 text-center">{i + 1}</td>
              <td className="border p-2">{row.unit_kerja_induk}</td>
              <td className="border p-2">{row.laki_laki}</td>
              <td className="border p-2">{row.perempuan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}