import { prisma } from "@/prisma";
/* eslint-disable */
// @ts-ignore

import midtransClient from "midtrans-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { order_id, pemeriksaan_id } = await req.json();

  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SECRET,
      clientKey: process.env.NEXT_PUBLIC_CLIENT,
    });

    // Mengambil status transaksi dari Midtrans
    const transactionStatus = await snap.transaction.status(order_id);
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
/* eslint-enable */
