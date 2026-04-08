"use client"

import { useState } from "react"
import { Register } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
    const [nis, setNis] = useState("")
    const [kelas, setKelas] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleRegister = async () => {
        if (!nis || !kelas || !password) {
            return alert("Semua kolom wajib diisi!")
        }

        setLoading(true)
        try {
            await Register(nis, kelas, password)
            alert("Registrasi berhasil! Silakan login.")
            router.replace("/login")
        } catch (error) {
            alert("Terjadi kesalahan saat registrasi.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>

            <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl border border-slate-100 p-8 py-10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                        Daftar <span className="text-blue-600">Siswa</span>
                    </h1>
                    <p className="text-slate-400 text-sm mt-2 font-medium">
                        Buat akun untuk menyampaikan pengaduanmu
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-widest">
                            NIS
                        </label>
                        <input 
                            type="text" 
                            placeholder="Masukkan NIS Anda"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 bg-slate-50/50"
                            value={nis}
                            onChange={(e) => setNis(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-widest">
                            Kelas
                        </label>
                        <input 
                            type="text" 
                            placeholder="Contoh: XII RPL 1"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 bg-slate-50/50"
                            value={kelas}
                            onChange={(e) => setKelas(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-widest">
                            Password
                        </label>
                        <input 
                            type="password" 
                            placeholder="Buat password aman"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 bg-slate-50/50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="pt-6">
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-[0.98] disabled:opacity-50"
                            onClick={handleRegister}
                            disabled={loading}
                        >
                            {loading ? "Mendaftarkan..." : "Daftar Akun"}
                        </button>
                    </div>

                    <div className="text-center pt-2">
                        <p className="text-slate-500 text-sm font-medium">
                            Sudah punya akun?{" "}
                            <Link 
                                href="/login"
                                className="text-blue-600 hover:underline font-bold transition-all"
                            >
                                Login di sini
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-50">
                    <p className="text-[10px] text-center text-slate-300 font-bold uppercase tracking-[0.2em]">
                        Harap Lapor! • SMKS Wira Harapan
                    </p>
                </div>
            </div>
        </div>
    )
}