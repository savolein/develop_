"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NavbarAdmin(){
    const router = useRouter()

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        document.cookie = "token=; path=/; max-age=0";
        document.cookie = "user=; path=/; max-age=0";
        router.replace("/login")
    }
    
    return(
        <div className="bg-[#1B211A] text-white px-6 py-5 flex items-center justify-between">
            <Link href={"/admin/dashboard"} className="font-semibold text-xl">
                Admin 
            </Link>
            <div className="flex gap-6 items-center">
                <Link href={"/admin/data_table"} className="bg-[#E2E8CE] px-3 py-2 rounded-lg text-black hover:bg-[#E2E8CE]/60 transition-all font-semibold">
                    Data Pengaduan
                </Link>
                <Link href={"/admin/data_siswa"} className="bg-[#E2E8CE] px-3 py-2 rounded-lg text-black hover:bg-[#E2E8CE]/60 transition-all font-semibold">
                    Data Siswa
                </Link>
                <button 
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg cursor-pointer transition"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}