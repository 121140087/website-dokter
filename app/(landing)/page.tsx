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
import ChatBot from "./_components/chatbot/ChatBot";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ChatBox from "./_components/chatbot/ChatBox";

export default function Home() {
  return (
    <div className="px-8  lg:px-36 xl:px-52 2xl:px-72 flex flex-col gap-y-12">
      <ChatBox />
      <div className="grid grid-cols-1  xl:grid-cols-2 w-full  xl:h-[600px]">
        <div className="flex flex-col gap-y-8 justify-center items-center xl:items-start">
          <h1 className="text-center xl:text-start text-6xl font-bold">
            Klinik Praktek Umum dr. Hema Malini
          </h1>
          <h3 className="font-bold text-2xl">
            Pelayanan Kesehatan yang Ramah & Profesional
          </h3>
          <p className="text-center xl:text-start text-slate-800 text-lg xl:max-w-[600px]">
            Selamat datang di praktik umum dr. Hema Malini, tempat di mana
            kesehatan Anda adalah prioritas utama kami. Kami menyediakan layanan
            medis yang profesional, ramah, dan terpercaya untuk membantu Anda
            dan keluarga mendapatkan perawatan kesehatan terbaik.
          </p>

          <Button className="w-44 h-14 text-lg">
            <Link href={"/buat-janji"}>Buat Janji</Link>
          </Button>
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
              src={"/images/dokter.jpg"}
              alt={"Dokter"}
              width={1024}
              height={1024}
              className="w-full sm:w-60 md:w-72 lg:w-96  aspect-square rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-12">
        <div>
          <h1 className="font-bold text-4xl mb-8 text-center">
            Mengapa Memilih Kami?
          </h1>
          <p className="text-center text-lg mt-4 mb-8">
            Kami berkomitmen untuk memberikan pelayanan kesehatan yang terbaik
            bagi Anda dan keluarga. Dengan tenaga medis yang profesional,
            fasilitas yang nyaman, serta pelayanan yang cepat dan ramah, kami
            memastikan setiap pasien mendapatkan perawatan yang optimal. Berikut
            adalah beberapa alasan mengapa klinik dr. Hema Malini menjadi
            pilihan yang tepat untuk kebutuhan kesehatan Anda:
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
              Dapatkan layanan kesehatan terbaik dengan pemeriksaan langsung di
              klinik kami. Dengan fasilitas yang lengkap dan dokter yang
              berpengalaman, kami memastikan Anda mendapatkan diagnosis yang
              akurat serta penanganan medis yang tepat sesuai kebutuhan.
            </p>
            <Button size={"lg"} className="w-fit">
              <Link href={"/buat-janji"}>Buat Janji</Link>
            </Button>
          </div>
          <Image
            src={"/images/pemeriksaan-langsung.jpg"}
            width={400}
            height={400}
            alt="pemeriksaan langsung"
            className=" w-full mx-auto md:mx-0 md:max-w-[400px] max-w-max aspect-square rounded-lg  mt-8 md:mt-0 object-cover"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:h-[400px] w-full">
          <div className="order-1 md:order-2 flex flex-col items-center md:items-start gap-y-8">
            <div className="flex flex-col items-center md:items-start ">
              <div className="w-20 h-6 rounded shadow bg-black" />
              <h2 className="font-bold text-xl">Konsultasi Online</h2>
              <h3 className="text-lg">Konsultasi Dokter 24/7</h3>
            </div>
            <p>
              Kami memahami bahwa tidak semua pasien dapat datang langsung ke
              klinik. Oleh karena itu, kami menyediakan layanan konsultasi
              online yang memudahkan Anda untuk berkonsultasi dengan dokter
              kapan saja dan di mana saja, tanpa harus meninggalkan kenyamanan
              rumah.
            </p>
          </div>
          <Image
            src={"/images/komputer.png"}
            width={400}
            height={400}
            alt="Konsultasi Online"
            className="order-2 md:order-1 w-full mx-auto md:mx-0 md:max-w-[400px] max-w-max aspect-square rounded-lg  mt-8 md:mt-0 object-cover"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:h-[400px] w-full">
          <div className=" flex flex-col items-center md:items-start gap-y-8">
            <div className="flex flex-col items-center md:items-start ">
              <div className="w-20 h-6 rounded shadow bg-black" />
              <h2 className="font-bold text-xl">Pembelian Obat</h2>
              <h3 className="text-lg">Obat-obatan Lengkap, Pengiriman Cepat</h3>
            </div>
            <p>
              Tak perlu repot mencari obat setelah konsultasi. Kami menyediakan
              layanan pembelian obat langsung di klinik maupun secara online,
              sehingga Anda dapat memperoleh obat dengan mudah dan aman sesuai
              resep dokter.
            </p>
          </div>
          <Image
            src={"/images/obat.png"}
            width={400}
            height={400}
            alt="Pembelian Obat"
            className=" w-full mx-auto md:mx-0 md:max-w-[400px] max-w-max aspect-square rounded-lg  mt-8 md:mt-0 object-cover"
          />{" "}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="font-bold text-4xl mb-8 text-center">
          Kesehatan Anda adalah Prioritas Kami!
        </h1>
        <p className="text-center text-lg mt-4 mb-8">
          Kami di klinik dr. Hema Malini berkomitmen untuk selalu memberikan
          layanan kesehatan terbaik bagi Anda dan keluarga. Dengan tenaga medis
          yang profesional, fasilitas yang nyaman, serta layanan yang mudah
          diakses, kami siap mendampingi Anda dalam menjaga kesehatan. Jangan
          ragu untuk menghubungi kami atau datang langsung ke klinik untuk
          mendapatkan konsultasi dan perawatan terbaik. Kesehatan yang baik
          dimulai dari langkah kecil
          <br />
          <b>—ayo mulai perjalanan sehat Anda bersama kami!</b>
        </p>
        <Button size={"lg"}>
          <Link href={"/buat-janji"}>Konsultasi Sekarang</Link>
        </Button>
        <iframe
          className="w-full mt-12 rounded-xl shadow"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31777.436927829334!2d105.30455994183347!3d-5.389575242472901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40dc99e12771b7%3A0xca8e1bccee0c223a!2sPerumahan%20Sabah%20Balau%20Residence!5e0!3m2!1sid!2sid!4v1737348687802!5m2!1sid!2sid"
          width="600"
          height="450"
          allowFullScreen={false}
          loading="lazy"
        ></iframe>
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
