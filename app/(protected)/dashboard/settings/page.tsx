"use client";
import { getConfig } from "@/actions/getConfig";
import { setConfig } from "@/actions/setConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SettingsPage = () => {
  const [biayaPemeriksaan, setBiayaPemeriksaan] = useState("");

  const updateBiayaPemeriksaan = async () => {
    const response = await getConfig("biayaPemeriksaan");
    if (response) {
      setBiayaPemeriksaan(response.value);
    }
  };
  const onUpdateBiayaPemeriksaan = async () => {
    toast("Mengupdate biaya pemeriksaan");
    await setConfig("biayaPemeriksaan", biayaPemeriksaan);
    toast("Berhasil mengupdate biaya pemeriksaan");
  };
  useEffect(() => {
    updateBiayaPemeriksaan();
  }, []);
  return (
    <div className="flex flex-col gap-y-8 p-8">
      <div className="w-full p-4 rounded-md shadow flex flex-col gap-y-4">
        <h2 className="text-xl font-bold">Biaya Pemeriksaan</h2>
        <Input
          placeholder="0"
          type="number"
          value={biayaPemeriksaan}
          className="max-w-2xl"
          onChange={(e) => {
            e.preventDefault();
            setBiayaPemeriksaan(e.currentTarget.value);
          }}
        />

        <Button className="w-fit" onClick={onUpdateBiayaPemeriksaan}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
