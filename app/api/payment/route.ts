import { randomUUID } from "crypto";
import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export async function POST(req: Request) {
  const { pemeriksaanId, price } = await req.json();
  console.log("harga", price);
  const uuid = randomUUID();
  console.log("pemeriksaan Id", pemeriksaanId);
  let parameter = {
    item_details: {
      name: "Website Dokter",
      price: price,
      quantity: 1,
    },
    transaction_details: {
      order_id: uuid,
      gross_amount: price,
    },
    customer_detail: {
      first_name: "",
      last_name: "",
    },
    callbacks: {
      finish:
        process.env.NEXT_PUBLIC_DOMAIN +
        "/pemeriksaan/" +
        pemeriksaanId +
        "/confirmation",
    },
  };

  try {
    // Get token to midtrans via snap
    const token = await snap.createTransactionToken(parameter);

    // return token
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error creating transaction token:", error);
    return NextResponse.json("Failed to create transaction token", {
      status: 500,
    });
  }
}
