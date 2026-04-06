"use client"

import { useState, useEffect } from "react"
import { paginationAspirasi, paginationSiswa } from "@/lib/api"
import NavbarAdmin from "@/components/NavbarAdmin"
import Link from "next/link"

export default function DashboardAdmin(){
    const [terkirim, setTerkirim] = useState(0)
    const [diproses, setDiproses] = useState(0)
    const [selesai, setSelesai] = useState(0)
    const [siswa, setSiswa] = useState(0)

    useEffect(() => {
        const fetchdata = async () => {    
            const res = await paginationAspirasi.getAll()
            const aspirasi = res.data

            setTerkirim(aspirasi.length)
            setDiproses(aspirasi.filter((a: any) => a.statuss === "Diproses").length)
            setSelesai(aspirasi.filter((a: any) => a.statuss === "Selesai").length)
        }
        
        const fetchsiswa = async () => {
            const res = await paginationSiswa.getAll()
            const siswa = res.data

            setSiswa(siswa.length)
        }
        fetchdata()
        fetchsiswa()
    })
    return(
        <>
        <NavbarAdmin/>
        <div className="flex flex-col gap-[10px] mx-[20px] mt-[10px]">
            <div className="flex flex-col">
                <label className="font-bold text-[25px]">
                    Data Pengaduan
                </label>
                <div className="flex gap-[20px] ">
                    <Link 
                        href={"/admin/data_table"} 
                        className="w-[350px] bg-red-500 px-[10px] py-[10px] rounded-[8px] shadow-lg shadow-red-200 hover:bg-red-700 transition-all duration-300"
                    >
                        <h1 className="font-bold text-[24px] text-white">
                            Total Pengaduan
                        </h1>
                        <h2 className="font-bold text-[36px]">
                            {terkirim}
                        </h2>
                    </Link>
                    <Link 
                        href={"/admin/data_table"} 
                        className="w-[350px] bg-yellow-500 px-[10px] py-[10px] rounded-[8px] shadow-lg shadow-yellow-200 hover:bg-yellow-700 transition-all duration-300"
                    >
                        <h1 className="font-bold text-[24px] text-white">
                            Diproses
                        </h1>
                        <h2 className="font-bold text-[36px]">
                            {diproses}
                        </h2>
                    </Link>
                    <Link 
                        href={"/admin/data_table"} 
                        className="w-[350px] bg-green-500 px-[10px] py-[10px] rounded-[8px] shadow-lg shadow-green-200 hover:bg-green-700 transition-all duration-300"
                    >
                        <h1 className="font-bold text-[24px] text-white">
                            Selesai
                        </h1>
                        <h2 className="font-bold text-[36px]">
                            {selesai}
                        </h2>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col">
                <label className="font-bold text-[25px]">
                    Data Siswa
                </label>
                <Link 
                    href={"/admin/data_siswa"} 
                    className="w-[350px] bg-blue-500 px-[10px] py-[10px] rounded-[8px] shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all duration-300"
                >
                    <h1 className="font-bold text-[24px] text-white">
                        Total Siswa
                    </h1>
                    <h2 className="font-bold text-[36px]">
                        {siswa}
                    </h2>
                </Link>
            </div>
        </div>
        </>
    )
}