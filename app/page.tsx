"use client";
import TabelRekapJenisKelamin from "./components/TabelRekapJenisKelamin";
import GrafikPegawai from "./components/GrafikPegawai";
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <GrafikPegawai />
      <TabelRekapJenisKelamin />
    </main>
);
}

