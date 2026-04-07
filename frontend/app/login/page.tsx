"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Login } from "@/lib/auth"
import Link from "next/link"

export default function LoginPage(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleLogin = async () => {
        try{
            const data = await Login(username, password)
            localStorage.setItem("token", data.jwt)
            localStorage.setItem("user", JSON.stringify(data.user))
            
            document.cookie = `token=${data.jwt}; path=/; max-age=86400`;
            document.cookie = `user=${JSON.stringify(data.user)}; path=/; max-age=86400`;

            if(data.user.email === "admin@sekolah.sch.id"){
                router.replace("/admin/dashboard")
            } else {
                router.replace("/siswa/dashboard")
            }
        } catch{
            alert("Username atau Password salah")
        }
    }

    return(
        <div className="flex flex-col w-full max-w-[450px] h-[415px] mx-auto my-[200px] px-[40px] py-[66px] bg-gradient-to-br from-yellow-300 to-blue-600 gap-[14px] rounded-[10px]">
            <h1 className="text-[24px] text-center font-bold text-white">
                Login
            </h1>
            <div className="flex flex-col gap-[4px]">
                <label className="font-semibold">NIS</label>
                <input 
                    type="text" 
                    className="w-full border-2 border-white rounded px-[2px] h-[40px]"
                    onChange={(e) => setUsername(e.target.value)} 
                />

                <label className="font-semibold">Password</label>
                <input 
                    type="password" 
                    className="w-full border-2 border-white rounded px-[2px] h-[40px]"
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <div className="flex flex-col mx-auto gap-[4px]">
                <button 
                    className="w-[250px] bg-red-500 font-semibold px-[8px] py-[6px] rounded cursor-pointer text-white hover:bg-[#FF3F7F]/60 transition" 
                    onClick={handleLogin}
                >
                    Submit
                </button>
                <p className="text-center text-sm">
                    Belum punya akun? {""}
                    <Link href={"/register"} className="text-white">Klik disini</Link>
                </p>
            </div>
        </div>
    )
}