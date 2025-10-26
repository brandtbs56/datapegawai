import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const jenis_asn = searchParams.get("jenis_asn") || "ALL";

    const limit = 1000; // Supabase maksimal 1000 row per query
    let offset = 0;
    let allData: any[] = [];

    while (true){
       //const { data, error } = await supabase
        let query = supabase
            .from("datapegawai")
            .select("jenis_kelamin, jenis_asn")
            .range(offset, offset + limit - 1);

        if(jenis_asn !== "ALL"){
            query = query.eq("jenis_asn", jenis_asn);
        }
        
        const { data, error } = await query;
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
      const key = row.jenis_kelamin || "Tidak diketahui";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const result = Object.entries(count).map(([jenis_kelamin, jumlah]) => ({
      jenis_kelamin:
        jenis_kelamin === "L" ? "Laki-laki" :
        jenis_kelamin === "P" ? "Perempuan" :
        "Tidak diketahui",
      jumlah,
    }));

    return NextResponse.json(result);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}