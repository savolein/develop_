"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NavbarSiswa(){
    const router = useRouter()

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        document.cookie = "token=; path=/; max-age=0";
        document.cookie = "user=; path=/; max-age=0";
        router.replace("/login")
    }
    
    return(
        <div className="bg-[#FEB21A] text-white px-6 py-5 flex items-center justify-between ">
            <Link href={"/siswa/dashboard"} className="font-semibold text-xl">
                HARAP LAPOR!
            </Link>
            <div className="flex gap-6 items-center">
                <Link href={"/siswa/create_pengaduan"} className="hover:text-blue-200 font-bold bg-[#004182] px-3 py-2 rounded-lg">
                    Buat Pengaduan
                </Link>
                <Link href={"/siswa/history"} className="hover:text-blue-200 font-bold bg-[#004182] px-3 py-2 rounded-lg">
                    History
                </Link>
                <button 
                    className="bg-[#ED3F27] hover:bg-red-600 text-white px-4 py-1 rounded-lg cursor-pointer transition font-semibold"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}