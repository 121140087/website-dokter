"use client";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PemeriksaanPaymentConfirmation = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const [transactionStatus, setTransactionStatus] = useState<string>();
  const searchParams = useSearchParams();

  const updateTransactionStatus = async () => {
    const par = await params;

    const response = await fetch("/api/payment/confirmation", {
      body: JSON.stringify({
        order_id: searchParams.get("order_id"),
        pemeriksaan_id: par.id,
      }),
      method: "POST",
    });
    if (response.ok) {
      const result = await response.json();

      setTransactionStatus(result.transaction_status);
    }
    setTimeout(() => {
      redirect("/pemeriksaan/" + par.id);
    }, 2000);
  };
  useEffect(() => {
    updateTransactionStatus();
  }, []);
  if (transactionStatus === "settlement") {
    return (
      <div className="text-center text-3xl text-green-500">
        Pembayaran Berhasil
      </div>
    );
  }
  if (!transactionStatus) {
    return <div className="text-center text-3xl  font-bold">Loading</div>;
  }
  return (
    <div className="text-center text-3xl text-destructive">
      Pembayaran Gagal
    </div>
  );
};

export default PemeriksaanPaymentConfirmation;
