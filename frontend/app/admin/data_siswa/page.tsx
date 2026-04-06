"use client"

import { useState, useEffect } from "react"
import NavbarAdmin from "@/components/NavbarAdmin"
import { siswaTableAPI } from "@/lib/api"
import { createSiswaByAdmin } from "@/lib/auth"
import { EditadminSiswaAPI } from "@/lib/api"
import { DeleteadminSiswaAPI } from "@/lib/api"
import Link from "next/link"

interface Siswa{
    id: number
    documentId: string                 
    nis: string
    kelas: string
    user?: {
        id: number
    }
}

export default function dataSiswa(){
    const [siswa, setSiswa] = useState<Siswa[]>([])
    const [showForm, setShowForm] = useState(false)
    const [nis, setNis] = useState("")
    const [kelas, setKelas] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchSiswa = async () => {
        const res = await siswaTableAPI.getAll()
        setSiswa(res.data)
    }

    useEffect(() => {
        fetchSiswa()
    }, [])

    const submitSiswa = async () => {
        if(!nis || !kelas){
            alert("NIS dan Kelas wajib diisi")
            return
        }
        try{
            setLoading(true)
            
            await createSiswaByAdmin(nis, kelas)
            alert("Siswa berhasil dibuat, suruh siswa buat login")

            setNis("")
            setKelas("")
            setShowForm(false)
            fetchSiswa()
        } catch(err: any){
            alert(err.message)
        } finally{
            setLoading(false)
        }
    }

    const updateSiswaAndUser = async (
        siswa: Siswa,
        newNis: string,
        newKelas: string
    ) => {
        await siswaTableAPI.update(siswa.documentId, {
            nis: newNis,
            kelas: newKelas,
        })
        if (siswa.user?.id) {
            await EditadminSiswaAPI.update(siswa.user.id, {
            username: newNis,
            email: `${newNis}@siswa.sch.id`,
            })
        }

        fetchSiswa()
        }

    const deleteSiswa = async (siswa: Siswa) => {
        if(!confirm("Siswa ini mau dihapus?"))return

        if(!siswa.user?.id){
            alert("User tidak ditemukan")
            return
        }

        await DeleteadminSiswaAPI.deleteSiswaAndUser({
            documentId: siswa.documentId,
            userId: siswa.user.id
        })

        fetchSiswa()
    }

    return(
        <>
        <NavbarAdmin/>
        <div className="flex flex-col p-[20px] gap-[10px]">
            <h1 className="font-bold text-[24px]">
                Data Siswa
            </h1>
            <Link 
                className="bg-[#1D546D] text-white w-[80px] py-[8px] mb-2 rounded-[8px] px-[22px] font-bold hover:bg-[#1D546D]/70 transition duration-300 hover:text-black"
                href={"/admin/dashboard"}
            >
                Back
            </Link>
            <button 
                className="bg-blue-500 text-white px-3 py-2 rounded mb-4 w-[150px] cursor-pointer hover:bg-blue-500/70 transition duration-300 hover:text-black"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? "Tutup Form" : "Tambah Siswa"}
            </button>
            {showForm && (
                <div className="border p-[8px] rounded mb-[16px] bg-[#E2E8CE]">
                    <h1 className="text-[18px] font-bold text-[#262626] pb-[4px]">
                        Tambah Data Siswa
                    </h1>
                    <div className="flex gap-[8px]">
                        <div className="flex flex-col w-[350px] gap-[10px]">
                            <div className="flex flex-col">
                                <label className="font-semibold">NIS</label>
                                <input 
                                    type="text" 
                                    placeholder="NIS" 
                                    value={nis} 
                                    className="border-2 border-[#262626] text-[#262626] px-[2px] h-[40px] rounded"
                                    onChange={(e) => setNis(e.target.value)} 
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold">Kelas</label>
                                <input 
                                    type="text"
                                    placeholder="Kelas"
                                    value={kelas}
                                    onChange={(e) => setKelas(e.target.value)}
                                    className="border-2 border-[#262626] text-[#262626] px-[2px] h-[40px] rounded"
                                />
                            </div>
                            <button 
                                className="w-[120px] text-white py-[4px] bg-[#FF7A30] rounded-[8px] cursor-pointer"
                                onClick={submitSiswa}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="">
                <table className="w-full max-w-[800px]">
                    <thead>
                        <tr>
                            <th className="border py-1">ID</th>
                            <th className="border py-1">NIS</th>
                            <th className="border py-1">Kelas</th>
                            <th className="border py-1">Act</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siswa.map((a) => (
                            <tr key={a.id}>
                                <td className="border p-2">{a.id}</td>
                                <td className="border p-2">
                                    <input
                                        defaultValue={a.nis}
                                        onBlur={(e) =>
                                        updateSiswaAndUser(a, e.target.value, a.kelas)
                                        }
                                        className="border p-1 rounded w-full"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        defaultValue={a.kelas}
                                        onBlur={(e) =>
                                        updateSiswaAndUser(a, a.nis, e.target.value)
                                        }
                                        className="border p-1 rounded w-full"
                                    />
                                </td>
                                <td className="border p-2 text-center">
                                    <button 
                                        className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                                        onClick={() => deleteSiswa(a)}
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}