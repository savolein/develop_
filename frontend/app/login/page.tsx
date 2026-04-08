"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Login } from "@/lib/auth"
import Link from "next/link"

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async () => {
        if (!username || !password) return alert("Harap isi NIS dan Password")
        
        setLoading(true)
        try {
            const data = await Login(username, password)
            localStorage.setItem("token", data.jwt)
            localStorage.setItem("user", JSON.stringify(data.user))
            
            document.cookie = `token=${data.jwt}; path=/; max-age=86400`;
            document.cookie = `user=${JSON.stringify(data.user)}; path=/; max-age=86400`;

            if (data.user.email === "admin@sekolah.sch.id") {
                router.replace("/admin/dashboard")
            } else {
                router.replace("/siswa/dashboard")
            }
        } catch (error) {
            alert("Username atau Password salah")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
            
            <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                        Harap <span className="text-blue-600">Lapor!</span>
                    </h1>
                    <p className="text-slate-400 text-sm mt-2 font-medium">
                        Silakan masuk ke akun Anda
                    </p>
                </div>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-widest">
                            NIS / Username
                        </label>
                        <input 
                            type="text" 
                            placeholder="Masukkan NIS"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 bg-slate-50/50"
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-widest">
                            Password
                        </label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 bg-slate-50/50"
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <div className="pt-4">
                        <button 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed" 
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? "Memproses..." : "Masuk Sekarang"}
                        </button>
                    </div>

                    <div className="text-center pt-2">
                        <p className="text-slate-500 text-sm font-medium">
                            Belum punya akun?{" "}
                            <Link href="/register" className="text-blue-600 hover:underline font-bold transition-all">
                                Daftar di sini
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-50">
                    <p className="text-[10px] text-center text-slate-300 font-bold uppercase tracking-[0.2em]">
                        SMKS Wira Harapan
                    </p>
                </div>
            </div>
        </div>
    )
}