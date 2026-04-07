"use client"

import NavbarSiswa from "@/components/NavbarSiswa"
import Link from "next/link"
import Image from "next/image"

export default function DashboardSiswa(){
    return(
        <>
        <div className="text-white py-24 h-[600px]">
            <div className="max-w-6xl mx-auto my-8 px-6 flex flex-col-reverse md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-black text-4xl md:text-5xl font-bold leading-tight mb-4">
                        Selamat Datang di <br />
                        <span className="text-yellow-500">Harap Lapor!</span>
                    </h1>
                    <p className="text-[24px] font-semibold text-blue-500">
                        Sistem pengaduan resmi SMKS Wira Harapan
                    </p>
                </div>
                <Image
                    src="/image/logo.webp"
                    alt="Logo Sekolah"
                    width={360}
                    height={360}
                    priority
                    className="drop-shadow-xl rounded-[20px]"
                />
            </div>
        </div>
        <div className="py-20 bg-gradient-to-br from-blue-600 to-yellow-300">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold mb-4 text-blue-600">
                        About Us
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Sistem Pengaduan Sekolah ini dibuat untuk memudahkan siswa
                        dalam menyampaikan aspirasi, keluhan, maupun saran secara
                        aman, nyaman, dan terdata dengan baik.
                    </p>
                </div>
                <Image
                    src="/image/sekolah.webp"
                    alt="Sekolah"
                    width={500}
                    height={320}
                    className="rounded-2xl object-cover shadow-lg"
                />
            </div>
        </div>
        <div className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
                    Cara Kerja
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { step: "1", title: "Buat Pengaduan", desc: "Isi formulir pengaduan dengan judul, isi, dan kategori yang sesuai." },
                        { step: "2", title: "Diproses Admin", desc: "Admin sekolah akan meninjau dan memproses pengaduanmu." },
                        { step: "3", title: "Selesai", desc: "Kamu akan mendapat balasan dan status pengaduan berubah menjadi selesai." },
                    ].map((item) => (
                        <div key={item.step} className="bg-white rounded-2xl p-6 shadow-md text-center">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                {item.step}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="py-24 bg-gradient-to-br from-yellow-300 to-blue-600">
            <div className="max-w-md mx-auto flex flex-col gap-6 px-6">
                <Link
                    href="/siswa/create_pengaduan"
                    className="text-center bg-blue-600 text-white py-4 rounded-xl font-semibold
                    shadow-md hover:bg-blue-700 hover:shadow-lg transition"
                >
                    Buat Pengaduan
                </Link>
                <Link
                    href="/siswa/history"
                    className="text-center bg-yellow-300 text-black py-4 rounded-xl font-semibold
                    shadow-md hover:bg-yellow-400 hover:shadow-lg transition"
                >
                    History Pengaduan
                </Link>
            </div>
        </div>
        </>
    )
}