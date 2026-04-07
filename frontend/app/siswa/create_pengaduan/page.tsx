"use client"

import { useState, useEffect } from "react"
import { aspirasiAPI, UserAPI, kategoriAPI, siswaAPI } from "@/lib/api"
import NavbarSiswa from "@/components/NavbarSiswa"
import Link from "next/link"

export default function CreatePengaduan(){
    const [kategori, setKategori] = useState<any[]>([])
    const [judul, setJudul] = useState("")
    const [isi, setIsi] = useState("")
    const [kategoriId, setKategoriId] = useState("")
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<File | null>(null)

    useEffect(() => {
        const fetchKategori = async () => {
            const res = await kategoriAPI.getAll()
            setKategori(res.data)
        }
        fetchKategori()
    }, [])

    const handleSubmit = async () => {
        if(!judul || !isi || !kategoriId){
            return alert("Semua wajib terisi")
        }
        const user = await UserAPI.me()
        const siswaRes = await siswaAPI.getByUserId(user.id)
        const siswaId = siswaRes.data[0]?.id

        if(!siswaId){
            return alert("Data Siswa tidak ditemukan")
        }

        try {
            setLoading(true)
            await aspirasiAPI.create({
                judul,
                isi,
                siswa: siswaId,
                kategoris: [Number(kategoriId)]   
            })
            alert("Aspirasi telah terkirim")

            setJudul("")
            setIsi("")
            setKategoriId("")
        } catch(error) {
            console.error(error)
            alert("Gagal terkirim")
        } finally{
            setLoading(false)
        }
    }

    return(
        <>
        <NavbarSiswa/>
        <div className="flex flex-col w-full max-w-[650px] mx-auto border-3 mt-[140px] py-[10px] px-[24px] rounded-[10px] gap-[4px] shadow-xl">
            <h1 className="text-center text-[24px] font-bold">
                Form Pengaduan
            </h1>
            <div className="flex flex-col gap-[8px]">
                <label className="font-semibold">Judul</label>
                <input 
                    type="text" 
                    className="w-full border-2 rounded h-[40px]"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                />

                <label className="font-semibold">
                    Kategori
                </label>
                <select
                    className="border-2 p-2 w-full rounded"
                    value={kategoriId}
                    onChange={(e) => setKategoriId(e.target.value)}
                >
                    <option value="">Pilih Kategori</option>
                    {kategori.map((k) => (
                        <option key={k.id} value={k.id} className="">
                            {k.nama}
                        </option>
                    ))}
                </select>

                <label className="font-semibold">
                    Deskripsi
                </label>
                <textarea
                    className="w-full border-2 rounded h-[100px]"
                    value={isi}
                    onChange={(e) => setIsi(e.target.value)}
                />

                <div className="flex gap-[10px]">
                    <button 
                        className="bg-[#3D45AA] text-white w-[120px] py-[8px] rounded-[8px] cursor-pointer disabled:opacity-50 font-bold"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Mengirim..." : "Submit"}
                    </button>
                    <Link 
                        className="flex justify-items-center bg-[#FFF19B] text-black w-[60px] py-[8px] rounded-[8px] px-[12px] font-bold"
                        href={"/siswa/dashboard"}
                    >
                        Back
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}