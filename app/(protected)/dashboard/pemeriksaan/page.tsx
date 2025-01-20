import { DataTable } from "../_components/DataTable";
import PasienForm from "./_components/PasienForm";
import { pemeriksaanColumn } from "./columns";

const PemeriksaanPage = () => {
  return (
    <div className="p-4 flex flex-col gap-y-8">
      <PasienForm nik="" />
      <DataTable
        columns={pemeriksaanColumn}
        data={[]}
        title="Hasil Pemeriksaan"
      />
    </div>
  );
};

export default PemeriksaanPage;
