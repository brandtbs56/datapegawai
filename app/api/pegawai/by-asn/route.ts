import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    
    const limit = 1000; // Supabase maksimal 1000 row per query
    let offset = 0;
    let allData: any[] = [];

    while (true){
      const { data, error } = await supabase
        .from("datapegawai")
        .select("jenis_asn")
        .range(offset, offset + limit - 1);

      if (error) throw error;

      if (!data || data.length === 0) {
        break; // kalau sudah habis, keluar loop
      }
      
      allData = allData.concat(data);

      // Jika hasil kurang dari limit, artinya data sudah habis
      if (data.length < limit) {
        break;
      }

      offset += limit;
  }

    const count = allData.reduce((acc: any, row: any) => {
      const key = row.jenis_asn || "Tidak diketahui";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const result = Object.entries(count).map(([jenis_asn, jumlah]) => ({
      jenis_asn,
      jumlah,
    }));

    return NextResponse.json(result);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}