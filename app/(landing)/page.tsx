"use client";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  Facebook,
  Headphones,
  Instagram,
  MessageCircle,
  PersonStanding,
  Pill,
  Send,
  Star,
  Twitter,
  UserIcon,
  X,
  Youtube,
} from "lucide-react";
import { useChat } from "ai/react";
import Markdown from "react-markdown";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import ChatBot from "./_components/ChatBot";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-8  lg:px-36 xl:px-52 2xl:px-72 flex flex-col gap-y-12">
      <ChatBot />
      <div className="grid grid-cols-1  xl:grid-cols-2 w-full  xl:h-[600px]">
        <div className="flex flex-col gap-y-8 justify-center items-center xl:items-start">
          <h1 className="text-center xl:text-start text-6xl font-bold">
            The only all in one Tool you need for your Clinic
          </h1>
          <p className="text-center xl:text-start text-slate-800 text-lg xl:max-w-[600px]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod quo
            dolorem nesciunt temporibus in nemo quasi soluta repellat, esse
            amet?
          </p>

          <Button className="w-44 h-14 text-lg">Buat Janji</Button>
          <div className="rounded-lg bg-white shadow-md p-4 hidden md:flex gap-x-8 w-fit">
            <div className="flex gap-x-2 items-center">
              <Star />
              <div>
                <p className="font-bold text-lg">4.5 / 5 bintang</p>
                <p className="text-slate-800">430 pasien menilai</p>
              </div>
            </div>
            <div className="flex gap-x-2 items-center">
              <CalendarDays />
              <div>
                <p className="font-bold text-lg">6 Tahun</p>
                <p className="text-slate-800">Pengalaman menjadi dokter</p>
              </div>
            </div>
            <div className="flex gap-x-2 items-center">
              <UserIcon />
              <div>
                <p className="font-bold text-lg">5.000+</p>
                <p className="text-slate-800">Pasien dilayani</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-12 flex items-center justify-center object-cover">
          <div className="p-4 rounded-xl shadow-lg bg-white">
            <Image
              src={"/images/elon.jpg"}
              alt={"Dokter"}
              width={1024}
              height={1024}
              className="w-full sm:w-60 md:w-72 lg:w-96  aspect-square rounded-xl"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-12">
        <div>
          <h1 className="font-bold text-4xl mb-8 text-center">
            Kesehatan Anda, Segera dan Mudah
          </h1>
          <p className="text-center text-lg mt-4 mb-8">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
            repellendus beatae, quisquam ipsa corporis debitis deleniti quia
            reiciendis ut pariatur, aspernatur eligendi ad dolorem facere illo
            repudiandae porro vel doloremque!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:h-[400px] w-full">
          <div className="flex flex-col items-center md:items-start gap-y-8">
            <div className="flex flex-col items-center md:items-start ">
              <div className="w-20 h-6 rounded shadow bg-black" />
              <h2 className="font-bold text-xl">Pemeriksaan Langsung</h2>
              <h3 className="text-lg">Pemeriksaan Lengkap, Hasil Akurat</h3>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
              officiis, aliquid inventore ipsam odit omnis nemo fugiat nesciunt
              debitis error doloribus veritatis ratione ipsa minima dolorum
              exercitationem minus possimus beatae.
            </p>
            <Button size={"lg"} className="w-fit">
              Buat Janji
            </Button>
          </div>
          <div className=" w-full mx-auto md:mx-0 max-w-[400px] md:max-w-max aspect-square rounded-lg bg-gray-400 mt-8 md:mt-0" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:h-[400px] w-full">
          <div className="order-1 md:order-2 flex flex-col items-center md:items-start gap-y-8">
            <div className="flex flex-col items-center md:items-start ">
              <div className="w-20 h-6 rounded shadow bg-black" />
              <h2 className="font-bold text-xl">Konsultasi Online</h2>
              <h3 className="text-lg">Konsultasi Dokter 24/7</h3>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
              officiis, aliquid inventore ipsam odit omnis nemo fugiat nesciunt
              debitis error doloribus veritatis ratione ipsa minima dolorum
              exercitationem minus possimus beatae.
            </p>
            <Button size={"lg"} className="w-fit">
              Buat Janji
            </Button>
          </div>
          <div className="order-2 md:order-1 w-full mx-auto md:mx-0 max-w-[400px] md:max-w-max aspect-square rounded-lg bg-gray-400 mt-8 md:mt-0" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:h-[400px] w-full">
          <div className=" flex flex-col items-center md:items-start gap-y-8">
            <div className="flex flex-col items-center md:items-start ">
              <div className="w-20 h-6 rounded shadow bg-black" />
              <h2 className="font-bold text-xl">Pembelian Obat</h2>
              <h3 className="text-lg">Obat-obatan Lengkap, Pengiriman Cepat</h3>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
              officiis, aliquid inventore ipsam odit omnis nemo fugiat nesciunt
              debitis error doloribus veritatis ratione ipsa minima dolorum
              exercitationem minus possimus beatae.
            </p>
          </div>
          <div className=" w-full mx-auto md:mx-0 max-w-[400px] md:max-w-max aspect-square rounded-lg bg-gray-400 mt-8 md:mt-0" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-4xl mb-8 text-center">
          Kesehatan Anda, Segera dan Mudah
        </h1>
        <p className="text-center text-lg mt-4 mb-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
          repellendus beatae, quisquam ipsa corporis debitis deleniti quia
          reiciendis ut pariatur, aspernatur eligendi ad dolorem facere illo
          repudiandae porro vel doloremque!
        </p>
        <Button size={"lg"}>Konsultasi Sekarang</Button>
      </div>
      <div className="flex p-4 justify-between mt-36">
        <p>&copy; Copyright 2025</p>
        <div className="flex gap-x-4">
          <Instagram />
          <Facebook />
          <Twitter />
          <Youtube />
        </div>
      </div>
    </div>
  );
}
