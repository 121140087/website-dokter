import { prisma } from "@/prisma";
import midtransClient from "midtrans-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { order_id, pemeriksaan_id } = await req.json();

  try {
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SECRET,
      clientKey: process.env.NEXT_PUBLIC_CLIENT,
    });

    // Mengambil status transaksi dari Midtrans
    let transactionStatus = await snap.transaction.status(order_id);
    if (transactionStatus.transaction_status === "settlement") {
      await prisma.pemeriksaan.update({
        where: {
          id: pemeriksaan_id,
        },
        data: {
          dibayar: true,
        },
      });
    }
    return NextResponse.json({ transactionStatus });
  } catch (error) {
    return NextResponse.json("Failed to get transaction status", {
      status: 500,
    });
  }
}
