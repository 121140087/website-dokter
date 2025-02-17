import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getCurrentAntrian } from "../../../../../actions/getCurrentAntrian";
import { Antrian } from "@prisma/client";
import { antrianNext } from "../_actions/antrianNext";
import { toast } from "sonner";

const CurrentAntrian = () => {
  const [loading, setLoading] = useState(true);
  const [currentAntrian, setCurrentAntrian] = useState<Antrian | null>(null);
  const updateCurrentAntrian = async () => {
    setLoading(true);
    const result = await getCurrentAntrian();
    setCurrentAntrian(result);
    setLoading(false);
  };
  const next = async () => {
    setLoading(true);
    console.log("called");
    const response = await antrianNext(currentAntrian);
    if (response.message) {
      toast(response.message);
    }
    if (response.data) {
      setCurrentAntrian(response.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    updateCurrentAntrian();
  }, []);
  return (
    <div className="rounded shadow-md min-w-72 h-full p-4 flex flex-col justify-between items-center">
      <h3 className="text-lg">Nomer Antrian Saat Ini</h3>
      {loading ? (
        <div>Loading...</div>
      ) : currentAntrian ? (
        <h2 className="text-6xl font-bold">{currentAntrian.noAntrian}</h2>
      ) : (
        <h2 className="text-2xl font-bold">Tidak ada antrian</h2>
      )}
      <Button className="w-full" disabled={loading} onClick={next}>
        Selanjutnya
      </Button>
    </div>
  );
};

export default CurrentAntrian;
