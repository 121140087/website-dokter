"use client";

import DaftarPesan from "./_components/DaftarPesan";

const PesanLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-4 w-full h-[calc(100vh-72px)]">
      <DaftarPesan />
      {children}
    </div>
  );
};

export default PesanLayout;
