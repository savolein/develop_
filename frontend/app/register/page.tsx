"use client"

import { useState } from "react"
import { Register } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage(){
    const [nis, setNis] = useState("")
    const [kelas, setKelas] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleRegister = async () => {
        try{
            await Register(nis, kelas, password)
            alert("Register berhasil!")
            router.replace("/login")
        } catch{
            alert("Ada yang salah")
        }
    }
    
    return(
        <div className="flex flex-col w-full max-w-[450px] mx-auto mt-[200px] bg-[#450693] gap-[14px] rounded-[10px] py-[16px] px-[28px]">
            <h1 className="text-center text-[24px] font-bold text-white">
                Register
            </h1>
            <div className="flex flex-col gap-[4px]">
                <label className="font-semibold text-white">
                    NIS
                </label>
                <input 
                    type="text" 
                    className="w-full border-2 border-white rounded px-[2px] h-[40px] text-white"
                    value={nis}
                    onChange={(e) => setNis(e.target.value)}
                />

                <label className="font-semibold text-white">
                    Kelas
                </label>
                <input 
                    type="text" 
                    className="w-full border-2 border-white rounded px-[2px] h-[40px] text-white"
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                />

                <label className="font-semibold text-white">
                    Password
                </label>
                <input 
                    type="password" 
                    className="w-full border-2 border-white rounded px-[2px] h-[40px] text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex flex-col mx-auto gap-[4px]">
                <button
                    className="w-[250px] bg-[#FFC400] font-semibold px-[8px] py-[6px] rounded cursor-pointer text-black hover:bg-[#FFC400]/60 transition"
                    onClick={handleRegister}
                >
                    Submit
                </button>
                <p className="text-center text-sm text-white">Lupa kalau sudah punya akun? {""}
                    <Link 
                        href={"/login"}
                        className="text-green-500"
                    >
                        Klik disini!
                    </Link>
                </p>
            </div>
        </div>
    )
}