"use client"
import { useState, useEffect } from "react"
import { aspirasiAPI, kategoriAPI, siswaAPI, UserAPI } from "@/lib/api"
import NavbarSiswa from "@/components/NavbarSiswa"
import Link from "next/link"

export default function HistoryPengaduan(){
    const [aspirasi, setAspirasi] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // Edit modal state
    const [editItem, setEditItem] = useState<any | null>(null)
    const [editJudul, setEditJudul] = useState("")
    const [editIsi, setEditIsi] = useState("")
    const [editKategoris, setEditKategoris] = useState<number[]>([])
    const [allKategoris, setAllKategoris] = useState<any[]>([])
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState("")

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

                const katRes = await kategoriAPI.getAll()
                setAllKategoris(katRes.data || [])
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

    // Open modal — only allowed if status is "Terkirim"
    const openEdit = (item: any) => {
        setEditItem(item)
        setEditJudul(item.judul)
        setEditIsi(item.isi)
        setEditKategoris(item.kategoris?.map((k: any) => k.id) || [])
        setSaveError("")
    }

    const closeEdit = () => {
        setEditItem(null)
        setSaveError("")
    }

    const toggleKategori = (id: number) => {
        setEditKategoris(prev =>
            prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]
        )
    }

    const handleSave = async () => {
        if (!editJudul.trim() || !editIsi.trim()) {
            setSaveError("Judul dan isi tidak boleh kosong.")
            return
        }
        setSaving(true)
        setSaveError("")
        try {
            await aspirasiAPI.update(editItem.documentId, {
                judul: editJudul,
                isi: editIsi,
                kategoris: editKategoris,
            })
            // Update local state so UI reflects change immediately
            setAspirasi(prev =>
                prev.map(a =>
                    a.documentId === editItem.documentId
                        ? {
                            ...a,
                            judul: editJudul,
                            isi: editIsi,
                            kategoris: allKategoris.filter(k => editKategoris.includes(k.id)),
                        }
                        : a
                )
            )
            closeEdit()
        } catch (err) {
            setSaveError("Gagal menyimpan. Silakan coba lagi.")
        } finally {
            setSaving(false)
        }
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
                <div key={item.id} className="border-l-4 border-blue-600 bg-white rounded p-6 mb-4 shadow-lg">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">
                            {item.judul}
                        </h3>
                        <span className="text-sm bg-yellow-300 font-semibold px-2 py-1 rounded">
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

                    {/* Tombol Edit — hanya muncul jika status masih "Terkirim" */}
                    {item.statuss === "Terkirim" && (
                        <div className="flex justify-end">
                            <button
                                onClick={() => openEdit(item)}
                                className="text-sm bg-[#8C00FF] text-white px-4 py-1.5 rounded hover:bg-[#7000cc] transition-colors"
                            >
                                Edit Aspirasi
                            </button>
                        </div>
                    )}
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

        {/* Modal Edit Aspirasi */}
        {editItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6">
                    <h3 className="text-xl font-bold mb-4 text-[#8C00FF]">Edit Aspirasi</h3>

                    {/* Judul */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Judul
                        </label>
                        <input
                            type="text"
                            value={editJudul}
                            onChange={e => setEditJudul(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8C00FF]"
                        />
                    </div>

                    {/* Isi */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Isi
                        </label>
                        <textarea
                            value={editIsi}
                            onChange={e => setEditIsi(e.target.value)}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8C00FF] resize-none"
                        />
                    </div>

                    {/* Kategori */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kategori
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {allKategoris.map((k: any) => (
                                <button
                                    key={k.id}
                                    type="button"
                                    onClick={() => toggleKategori(k.id)}
                                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                                        editKategoris.includes(k.id)
                                            ? "bg-[#8C00FF] text-white border-[#8C00FF]"
                                            : "bg-white text-gray-600 border-gray-300 hover:border-[#8C00FF]"
                                    }`}
                                >
                                    {k.nama}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Error */}
                    {saveError && (
                        <p className="text-red-500 text-sm mb-3">{saveError}</p>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={closeEdit}
                            disabled={saving}
                            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-4 py-2 text-sm rounded-lg bg-[#8C00FF] text-white hover:bg-[#7000cc] transition-colors disabled:opacity-60"
                        >
                            {saving ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}