"use client"

import { useState, useEffect } from "react"
import NavbarAdmin from "@/components/NavbarAdmin"
import { aspirasiTableAPI } from "@/lib/api"
import Link from "next/link"

interface Aspirasi {
    id: number
    documentId: string
    nis: string
    judul: string
    isi: string
    tanggal: string
    statuss: string
    reply: string | null
    siswa? :{
        nis?: string
    }
    kategori?: {
        nama?: string
    }
}

export default function dataTable(){
    const [aspirasi, setAspirasi] = useState<Aspirasi[]>([])

    const fetchData = async () => {
        const res = await aspirasiTableAPI.getAll()
        setAspirasi(res.data)
    }

    const updateData = async (
        documentId: string,
        field: string,
        value: string
    ) => {
        await aspirasiTableAPI.update(documentId, {[field]: value})
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    const deleteData = async (
        documentId: string
    ) => {
        if (!confirm("Yakin ingin menghapus ini?")) {
            return
        }

        await aspirasiTableAPI.delete(documentId)
        fetchData()
    }

    const progressMap: any = {
        Terkirim: 33,
        Diproses: 66,
        Selesai: 100,
    }

    return(
        <>
        <NavbarAdmin/>
        <div className="flex flex-col p-[20px] gap-[10px]">
            <div className="flex flex-col gap-3">
                <h1 className="font-bold text-[24px]">
                    Data Pengaduan
                </h1>
                <Link 
                    className="bg-[#1D546D] text-white w-[80px] py-[8px] mb-2 rounded-[8px] px-[22px] font-bold hover:bg-[#1D546D]/70 transition duration-300 hover:text-black"
                    href={"/admin/dashboard"}
                >
                    Back
                </Link>
            </div>
            <div className="">
                <table className="w-full">
                    <thead>
                        <tr className="">
                            <th className="border py-1">ID</th>
                            <th className="border py-1">NIS</th>
                            <th className="border py-1">Judul</th>
                            <th className="border py-1">Isi</th>
                            <th className="border py-1">Tanggal</th>
                            <th className="border py-1">Status</th>
                            <th className="border py-1">Progress</th>
                            <th className="border py-1">Reply</th>
                            <th className="border py-1">Act</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aspirasi.map((a) => (
                            <tr key={a.id} className="">
                                <td className="border p-2">{a.id}</td>
                                <td className="border p-2">{a.siswa?.nis}</td>
                                <td className="border p-2">{a.judul}</td>
                                <td className="border p-2">{a.isi}</td>
                                <td className="border p-2">{a.tanggal}</td>
                                <td className="border p-2">
                                    <select
                                        value={a.statuss}
                                        onChange={(e) =>
                                            updateData(a.documentId, "statuss", e.target.value)
                                        }
                                        className="border p-1 rounded"
                                    >
                                        <option value="Terkirim">Terkirim</option>
                                        <option value="Diproses">Diproses</option>
                                        <option value="Selesai">Selesai</option>
                                    </select>
                                </td>
                                <td className="border p-2 w-[180px]">
                                    <div className="w-full bg-gray-200 rounded h-2">
                                        <div 
                                            className={`h-2 rounded transition-all duration-300
                                                ${a.statuss === "Terkirim" && "bg-gray-500"}
                                                ${a.statuss === "Diproses" && "bg-yellow-500"}
                                                ${a.statuss === "Selesai" && "bg-green-500"}
                                            `}
                                            style={{width: `${progressMap[a.statuss]}%`}}
                                        >
                                        </div>
                                        <p className="test-xs text-center">
                                            {progressMap[a.statuss]}%
                                        </p>
                                    </div>
                                </td>
                                <td className="border p-2">
                                    <input
                                        defaultValue={a.reply ?? ""}
                                        onBlur={(e) =>
                                            updateData(a.documentId, "reply", e.target.value)
                                        }
                                        className="border p-1 w-full rounded"
                                    />
                                </td>
                                <td className="border p-2 text-center">
                                    <button
                                        onClick={() => deleteData(a.documentId)}
                                        className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}