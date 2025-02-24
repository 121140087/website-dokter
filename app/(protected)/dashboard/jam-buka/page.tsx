"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JamBuka } from "@prisma/client";
import { useEffect, useState } from "react";
import { getJamBuka } from "./_actions/getJamBuka";
import { addJamBuka } from "./_actions/addJamBuka";
import { deleteJamBuka } from "./_actions/deleteJamBuka";
import { toast } from "sonner";
import { updateJamBuka } from "./_actions/updateJamBuka";
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

const JamBukaPage = () => {
  const [jamBuka, setJamBuka] = useState<JamBuka[]>([]);
  const initJamBuka = async () => {
    const response = await getJamBuka();
    if (response) {
      setJamBuka(response);
    }
  };
  const addJamBukaHandler = async (key: number) => {
    toast("Menambahkan Jam");

    addJamBuka(key);
    window.location.reload();
  };
  const deleteJamBukaHandler = async (id: string) => {
    deleteJamBuka(id);
    toast("Menghapus Jam");
    window.location.reload();
  };
  useEffect(() => {
    initJamBuka();
  }, []);
  return (
    <div className="rounded p-4 m-4 bg-white shadow max-w-[700px] flex flex-col gap-y-6">
      {hari.map((h) => {
        return (
          <div
            className="flex gap-x-2 items-start w-full p-4 rounded border"
            key={h.key}
          >
            <p className="w-20">{h.name}</p>
            <div className="flex flex-col gap-y-2 w-full items-center">
              {jamBuka
                .filter((val) => val.key === h.key)
                .map((val) => {
                  return (
                    <div className="flex gap-x-2 w-full" key={val.id}>
                      <Input
                        type="time"
                        defaultValue={val.startTime}
                        onChange={(e) => {
                          e.preventDefault();
                          const index = jamBuka.findIndex(
                            (v) => v.id === val.id
                          );
                          jamBuka[index] = {
                            key: val.key,
                            id: val.id,
                            startTime: e.currentTarget.value,
                            endTime: val.endTime,
                            jumlahAntrian: val.jumlahAntrian,
                          };
                          updateJamBuka({
                            id: val.id,
                            endTime: val.endTime,
                            startTime: e.currentTarget.value,
                            jumlahAntrian: val.jumlahAntrian,
                          });
                          setJamBuka(jamBuka);
                        }}
                      />
                      -
                      <Input
                        type="time"
                        defaultValue={val.endTime}
                        onChange={async (e) => {
                          e.preventDefault();
                          const index = jamBuka.findIndex(
                            (v) => v.id === val.id
                          );
                          jamBuka[index] = {
                            key: val.key,
                            id: val.id,
                            startTime: val.startTime,
                            endTime: e.currentTarget.value,
                            jumlahAntrian: val.jumlahAntrian,
                          };
                          updateJamBuka({
                            id: val.id,
                            endTime: e.currentTarget.value,
                            startTime: val.startTime,
                            jumlahAntrian: val.jumlahAntrian,
                          });
                          setJamBuka(jamBuka);
                        }}
                      />
                      <Input
                        placeholder="Jumlah Antrian"
                        type="number"
                        prefix="Jumlah Antrian"
                        defaultValue={val.jumlahAntrian}
                        onChange={async (e) => {
                          e.preventDefault();
                          const index = jamBuka.findIndex(
                            (v) => v.id === val.id
                          );
                          jamBuka[index] = {
                            key: val.key,
                            id: val.id,
                            startTime: val.startTime,
                            endTime: val.endTime,
                            jumlahAntrian: Number(e.currentTarget.value),
                          };
                          updateJamBuka({
                            id: val.id,
                            endTime: val.endTime,
                            startTime: val.startTime,
                            jumlahAntrian: Number(e.currentTarget.value),
                          });
                          setJamBuka(jamBuka);
                        }}
                      />
                      <Button
                        variant={"destructive"}
                        onClick={() => deleteJamBukaHandler(val.id)}
                      >
                        X
                      </Button>
                    </div>
                  );
                })}
              <Button
                variant={"outline"}
                className="w-fit "
                onClick={() => addJamBukaHandler(h.key)}
              >
                Tambahkan +
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JamBukaPage;
