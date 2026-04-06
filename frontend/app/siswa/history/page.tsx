"use client"

import { useState, useEffect } from "react"
import { aspirasiAPI, siswaAPI, UserAPI } from "@/lib/api"
import NavbarSiswa from "@/components/NavbarSiswa"
import Link from "next/link"

export default function HistoryPengaduan(){
    const [aspirasi, setAspirasi] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchdata = async () => {
            try{
                const user = await UserAPI.me()
                const siswaRes = await siswaAPI.getByUserId(user.id)
                const siswaId = siswaRes.data[0]?.id
                
                if(siswaId) {
                    const res = await aspirasiAPI.getBySiswa(siswaId)
                    setAspirasi(res.data || [])
                }
            } catch (error){
                console.error(error)
            } finally{
                setLoading(false)
            }
        }
        fetchdata()
    }, [])

    const progressMap: any = {
        Terkirim: 33,
        Diproses: 66,
        Selesai: 100,
    }

    return(
        <>
        <NavbarSiswa/>
        <div className="max-w-4xl mx-auto p-4 mt-20">
            <h2 className="text-2xl font-bold mb-6">History Pengaduan</h2>
            {loading && <p className="text-gray-600">Loading...</p>}
            {!loading && aspirasi.length === 0 && (
                <p className="text-gray-500">Belum ada pengaduan</p>
            )}
            {aspirasi.map((item) => (
                <div key={item.id} className="border-l-4 border-[#8C00FF] bg-white rounded p-6 mb-4 shadow-lg">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">
                            {item.judul}
                        </h3>
                        <span className="text-xs bg-[#8C00FF] text-white px-2 py-1 rounded">
                            {item.statuss}
                        </span>
                    </div>
                    <div className="w-[250px] bg-gray-200 rounded h-2 mb-6">
                        <div 
                            className={`h-2 rounded transition-all duration-300
                                ${item.statuss === "Terkirim" && "bg-gray-500"}
                                ${item.statuss === "Diproses" && "bg-yellow-500"}
                                ${item.statuss === "Selesai" && "bg-green-500"}
                            `}
                            style={{width: `${progressMap[item.statuss]}%`}}
                        >
                        </div>
                        <p className="test-xs text-center">
                            {progressMap[item.statuss]}%
                        </p>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                        {item.tanggal}
                    </p>
                    <p className="text-gray-600 mb-3">
                        Kategori:{" "}
                        <span className="font-medium">
                            {item.kategoris && item.kategoris.length > 0
                                ? item.kategoris.map((k: any) => k.nama).join(", ")
                                : "-"}
                        </span>
                    </p>
                    <p className="text-gray-700 mb-3">
                        {item.isi}
                    </p>
                    <p className="text-gray-700 mb-3 font-semibold">
                        Reply: {item.reply || "Please wait..."}
                    </p>
                </div>
            ))}
            <div className="flex justify-end">
                <Link 
                    className="bg-[#FFF19B] text-black w-[80px] py-[8px] rounded-[8px] px-[22px] font-bold"
                    href={"/siswa/dashboard"}
                >
                    Back
                </Link>
            </div>
        </div>
        </>
    )
}