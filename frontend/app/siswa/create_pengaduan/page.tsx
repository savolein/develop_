"use client"

import { useState, useEffect } from "react"
import { pengaduanAPI, UserAPI, kategoriAPI, siswaAPI } from "@/lib/api"
import NavbarSiswa from "@/components/NavbarSiswa"
import Link from "next/link"
import { API_URL } from "@/lib/api"

export default function CreatePengaduan() {
    const [kategori, setKategori] = useState<any[]>([])
    const [judul, setJudul] = useState("")
    const [isi, setIsi] = useState("")
    const [kategoriId, setKategoriId] = useState("")
    const [gambar, setGambar] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchKategori = async () => {
            try {
                const res = await kategoriAPI.getAll()
                setKategori(res.data)
            } catch (error) {
                console.error("Gagal mengambil kategori:", error)
            }
        }
        fetchKategori()
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setGambar(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleRemoveGambar = () => {
        setGambar(null)
        setPreview(null)
    }

    const uploadGambar = async (file: File): Promise<number> => {
        const token = localStorage.getItem("token")
        const formData = new FormData()
        formData.append("files", file)
        formData.append("folder", "images")

        const res = await fetch(API_URL + "/api/upload", {
            method: "POST",
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: formData
        })

        if (!res.ok) throw new Error("Upload gambar gagal")
        const data = await res.json()
        return data[0].id
    }

    const handleSubmit = async () => {
        if (!judul || !isi || !kategoriId) {
            return alert("Semua kolom wajib diisi!")
        }
        
        try {
            setLoading(true)
            const user = await UserAPI.me()
            const siswaRes = await siswaAPI.getByUserId(user.id)
            const siswaId = siswaRes.data[0]?.id

            if (!siswaId) {
                return alert("Data Siswa tidak ditemukan")
            }

            let imageIds: number[] = []
            if (gambar) {
                const imageId = await uploadGambar(gambar)
                imageIds = [imageId]
            }

            await pengaduanAPI.create({
                judul,
                isi,
                siswa: siswaId,
                kategoris: [Number(kategoriId)],
                image: imageIds
            })

            alert("Pengaduan berhasil terkirim!")
            setJudul("")
            setIsi("")
            setKategoriId("")
            setGambar(null)
            setPreview(null)
        } catch (error) {
            console.error(error)
            alert("Gagal mengirim pengaduan.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <div className="w-[700px] mx-auto pt-[140px] px-4">
                <div className="mb-8 flex flex-row items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800">Buat Pengaduan</h1>
                        <p className="text-slate-500 mt-1 text-sm">Sampaikan pengaduanmu secara jelas dan jujur.</p>
                    </div>
                    <Link 
                        href="/siswa/dashboard"
                        className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors shrink-0"
                    >
                        Kembali
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Judul Laporan</label>
                            <input 
                                type="text" 
                                placeholder="Tulis ringkasan laporan..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 bg-slate-50/50 outline-none"
                                value={judul}
                                onChange={(e) => setJudul(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Kategori</label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 bg-slate-50/50 appearance-none cursor-pointer outline-none"
                                    value={kategoriId}
                                    onChange={(e) => setKategoriId(e.target.value)}
                                >
                                    <option value="">Pilih Kategori Laporan</option>
                                    {kategori.map((k) => (
                                        <option key={k.id} value={k.id}>
                                            {k.nama}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    ▼
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Deskripsi Lengkap</label>
                            <textarea
                                placeholder="Jelaskan detail pengaduanmu di sini..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 bg-slate-50/50 min-h-[150px] resize-y outline-none"
                                value={isi}
                                onChange={(e) => setIsi(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">
                                Foto Pendukung{" "}
                                <span className="font-normal text-slate-400">(opsional)</span>
                            </label>

                            {preview ? (
                                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full max-h-56 object-contain"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveGambar}
                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow transition-all"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl cursor-pointer transition-colors bg-slate-50/50 py-8 px-4">
                                    <div className="flex flex-col items-center gap-2 text-slate-400">
                                        <p className="text-sm font-medium">Klik untuk pilih gambar</p>
                                        <p className="text-xs">JPG, PNG, WEBP — maks 5MB</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            )}
                        </div>

                        <div className="pt-4">
                            <button 
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        {gambar ? "Mengupload & Mengirim..." : "Sedang Mengirim..."}
                                    </>
                                ) : (
                                    "Kirim Pengaduan Sekarang"
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <p className="text-xs text-amber-700 text-center leading-relaxed">
                        Pastikan laporan yang kamu buat bersifat edukatif dan membangun. <br />
                        Data dirimu akan tersimpan di sistem secara aman.
                    </p>
                </div>
            </div>
        </div>
    )
}