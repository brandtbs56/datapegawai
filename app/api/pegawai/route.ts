import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const jenis_asn = searchParams.get("jenis_asn") || "ALL";

    const limit = 1000;
    let offset = 0;
    let allData: any[] = [];

    while (true) {
      let query = supabase
        .from("datapegawai")
        .select("unit_kerja_induk, jenis_kelamin")
        .range(offset, offset + limit - 1);

      if (jenis_asn !== "ALL") query = query.eq("jenis_asn", jenis_asn);

      const { data, error } = await query;
      if (error) throw error;

      if (!data || data.length === 0) break;

      allData = allData.concat(data);

      if (data.length < limit) break;
      offset += limit;
    }

    // Rekap jumlah per unit kerja
    const rekapMap = allData.reduce((acc: any, row: any) => {
      const unit = row.unit_kerja_induk || "Tidak diketahui";
      if (!acc[unit]) acc[unit] = { unit_kerja_induk: unit, laki_laki: 0, perempuan: 0 };

      if (row.jenis_kelamin === "L") acc[unit].laki_laki++;
      else if (row.jenis_kelamin === "P") acc[unit].perempuan++;

      return acc;
    }, {});

    const result = Object.values(rekapMap);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}