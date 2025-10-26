"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LabelList, 
  ResponsiveContainer
} from "recharts";

export default function GrafikPegawai() {
  const [dataAsn, setDataAsn] = useState<any[]>([]);
  const [dataGender, setDataGender] = useState<any[]>([]);
  const [selectedJenisAsn, setSelectedJenisAsn] = useState<"ALL" | "PNS" | "PPPK">("ALL");

  useEffect(() => {
    fetch("/api/pegawai/by-asn")
      .then((res) => res.json())
      .then((data) => {
        console.log("📊 Data ASN:", data);
        setDataAsn(data);
      })
      .catch(console.error);

    fetch(`/api/pegawai/by-gender?jenis_asn=${selectedJenisAsn}`)
      .then(res => res.json())
      .then(data => {
        // const formatted = data.map((item: any) => ({
        //   jenis_kelamin:
        //     item.jenis_kelamin === "L" ? "Laki-laki" :
        //     item.jenis_kelamin === "P" ? "Perempuan" :
        //     "Tidak diketahui",
        //   jumlah: item.jumlah,
        // }));
        // setDataGender(formatted);
        setDataGender(data);
      })
      .catch(console.error);
  }, [selectedJenisAsn]);

  const totalPegawai = dataGender.reduce((sum, item) => sum + item.jumlah, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
      {/* Grafik 1: Berdasarkan Jenis ASN */}
      <div className="w-full h-[400px] bg-white shadow rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Jumlah Pegawai Berdasarkan Jenis ASN
        </h2>
        {dataAsn.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataAsn}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="jenis_asn" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#82ca9d" >
                {/* Tambahkan label angka di atas batang */}
                <LabelList
                  dataKey="jumlah"
                  position="top"
                  style={{ fill: "#333", fontWeight: "bold", fontSize: 12 }}
                />
              </Bar>
             
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">Memuat data...</p>
        )}
      </div>

      {/* Grafik 2: Berdasarkan Jenis Kelamin */}
      <div className="w-full h-[400px] bg-white shadow rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Jumlah Pegawai Berdasarkan Jenis Kelamin
        </h2>

        <div className="flex space-x-3">
        {["ALL", "PNS", "PPPK"].map(type => (
          <button
            key={type}
            onClick={() => setSelectedJenisAsn(type as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${selectedJenisAsn === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {type === "ALL" ? "All ASN" : type}
          </button>
        ))}
      </div>
        <p className="text-center text-gray-700 font-semibold mb-2">
          Total: {totalPegawai.toLocaleString("id-ID")} Pegawai
        </p>
        {dataGender.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={dataGender}
                dataKey="jumlah"
                nameKey="jenis_kelamin"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {dataGender.map((entry, index) => {
                  let fillColor = "#00C49F";
                  if (entry.jenis_kelamin === "Laki-laki") fillColor = "#0088FE";
                  if (entry.jenis_kelamin === "Perempuan") fillColor = "#FF69B4";
                  //return <Cell key={`cell-gender-${index}`} fill={fillColor} />;
                  return <Cell key={`cell-${index}`} fill={fillColor} />;
                })}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">Memuat data...</p>
        )}
      </div>
    </div>
  );
}