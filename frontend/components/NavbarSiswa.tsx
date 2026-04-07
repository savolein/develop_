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
        <div className="absolute fixed top-0 left-0 right-0 px-6 py-5 flex items-center justify-between z-10">
            <Link href={"/siswa/dashboard"} className="font-semibold text-[32px]">
                HARAP LAPOR!
            </Link>
            <div className="flex gap-6 items-center bg-black/30 px-[12px] rounded-[30px] py-2">
                <Link href={"/siswa/dashboard"} className="hover:bg-white font-bold hover:text-black text-white bg-black/50 px-[32px] py-[14px] rounded-[30px] transition-all duration-300">
                    Home
                </Link>
                <Link href={"/siswa/create_pengaduan"} className="hover:bg-white font-bold hover:text-black text-white bg-black/50 px-[32px] py-[14px] rounded-[30px] transition-all duration-300">
                    Buat Pengaduan
                </Link>
                <Link href={"/siswa/history"} className="hover:bg-white font-bold hover:text-black text-white bg-black/50 px-[32px] py-[14px] rounded-[30px] transition-all duration-300">
                    History
                </Link>
            </div>
            <button 
                    className="bg-[#ED3F27] hover:bg-red-800 text-white px-4 py-1 cursor-pointer transition font-semibold hover:text-black px-[32px] py-[14px] rounded-[30px] transition-all duration-300"
                    onClick={logout}
                >
                    Logout
                </button>
        </div>
    )
}