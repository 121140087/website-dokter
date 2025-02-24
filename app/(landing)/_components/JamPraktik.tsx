import { getJamBuka } from "@/app/(protected)/dashboard/jam-buka/_actions/getJamBuka";
import { JamBuka } from "@prisma/client";
import { Key } from "lucide-react";
import { useEffect, useState } from "react";

const hari = [
  {
    name: "Senin",
    key: 1,
  },
  {
    name: "Selasa",
    key: 2,
  },
  {
    name: "Rabu",
    key: 3,
  },
  {
    name: "Kamis",
    key: 4,
  },
  {
    name: "Jumat",
    key: 5,
  },
  {
    name: "Sabtu",
    key: 6,
  },
  {
    name: "Minggu",
    key: 7,
  },
];
const JamPraktik = () => {
  const [jamBuka, setJamBuka] = useState<JamBuka[]>();
  const updateJamBuka = async () => {
    const response = await getJamBuka();
    if (response) {
      setJamBuka(response);
    }
  };
  useEffect(() => {
    updateJamBuka();
  });
  return (
    <div className="rounded shadow-md p-4 w-full max-w-[600px] my-12">
      <h2 className="font-bold text-2xl text-center">Jam Praktik</h2>
      {jamBuka &&
        hari.map((h) => {
          return (
            <div
              className="flex justify-between font-bold border-b-2 p-2"
              key={h.key}
            >
              <p>{h.name}</p>
              {jamBuka
                .filter((f) => f.key === h.key)
                .reverse()
                .map((j) => {
                  return (
                    <p key={j.id}>
                      {j.startTime} - {j.endTime}
                    </p>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

export default JamPraktik;
