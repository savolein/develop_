"use client"

import Link from "next/link"
import Image from "next/image"

export default function DashboardSiswa() {
    return (
        <div className="min-h-screen bg-white">
            <div className="relative pt-44 pb-28">
                <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-slate-50 rounded-l-[100px]"></div>
                
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-left">
                        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-xs font-bold tracking-widest">
                            OFFICIAL SMKS WIRA HARAPAN
                        </div>
                        <h1 className="text-6xl font-bold text-slate-900 leading-tight">
                            Layanan Pengaduan <br />
                            <span className="text-blue-600">Siswa Online</span>
                        </h1>
                        <p className="text-lg text-slate-500 max-w-md mx-0">
                            Sampaikan keluhan, saran, atau ide kamu untuk sekolah yang lebih baik. Kami mendengar setiap suaramu.
                        </p>
                        
                        <div className="flex flex-row gap-4 justify-start pt-4">
                            <Link 
                                href="/siswa/create_pengaduan"
                                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 hover:shadow-blue-200 transition-all duration-200"
                            >
                                Buat Pengaduan
                            </Link>
                            <Link 
                                href="/siswa/history"
                                className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                            >
                                Lihat Riwayat
                            </Link>
                        </div>
                    </div>
                    
                    <div className="flex justify-center">
                        <Image
                            src="/image/logo.webp"
                            alt="Logo Sekolah"
                            width={380}
                            height={380}
                            priority
                            quality={100}
                            className="drop-shadow-2xl rounded-3xl"
                        />
                    </div>
                </div>
            </div>

            <div className="py-20 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-200 flex flex-row items-center">
                        <div className="w-1/2">
                            <Image
                                src="/image/sekolah.webp"
                                alt="Sekolah"
                                width={600}
                                height={450}
                                quality={100}
                                className="object-cover h-full w-full"
                            />
                        </div>
                        <div className="w-1/2 p-16 space-y-4">
                            <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Tentang Harap Lapor</h2>
                            <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                            <p className="text-slate-600 leading-relaxed pt-2">
                                Sistem Pengaduan Sekolah ini dirancang untuk menciptakan transparansi antara siswa dan manajemen sekolah. 
                                Setiap laporan yang masuk akan langsung diterima oleh admin dan ditindaklanjuti secara profesional.
                            </p>
                            <div className="pt-4 flex gap-8">
                                <div>
                                    <p className="text-2xl font-bold text-blue-600">Secure</p>
                                    <p className="text-xs text-slate-400 uppercase font-semibold">Privasi Terjaga</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-blue-600">Reliable</p>
                                    <p className="text-xs text-slate-400 uppercase font-semibold">Tanggapan Cepat</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-24 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
                        Cara Kerja
                    </h2>
                    <div className="grid grid-cols-3 gap-8">
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

            <footer className="py-12 text-center text-slate-400 text-sm border-t border-slate-50">
                <p>@ 2026 SMKS Wira Harapan. Semua Hak Dilindungi.</p>
            </footer>
        </div>
    )
}