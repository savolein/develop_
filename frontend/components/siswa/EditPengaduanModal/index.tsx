"use client"

import { useState } from "react"
import { pengaduanAPI, API_URL } from "@/lib/api"
import Image from "next/image"

export default function EditPengaduanModal({ item, allKategoris, onClose, onSuccess }: any) {
    const [form, setForm] = useState({
        judul: item.judul,
        isi: item.isi,
        kategoriId: item.kategoris?.[0]?.id || ""
    })
    
    const [images, setImages] = useState({
        existing: item.image || [], 
        newFile: null as File | null,
        newPreview: null as string | null
    })
    
    const [loading, setLoading] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setImages(prev => ({
            ...prev,
            newFile: file,
            newPreview: URL.createObjectURL(file)
        }))
    }

    const handleRemoveExisting = (id: number) => {
        setImages(prev => ({
            ...prev,
            existing: prev.existing.filter((img: any) => img.id !== id)
        }))
    }

    const handleSave = async () => {
        setLoading(true)
        try {
            let newId = null
            if (images.newFile) {
                const fd = new FormData()
                fd.append("files", images.newFile)
                const res = await fetch(API_URL + "/api/upload", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    body: fd
                })
                const data = await res.json()
                newId = data[0].id
            }

            const finalImageIds = [
                ...images.existing.map((i: any) => i.id), 
                ...(newId ? [newId] : [])
            ]
            
            await pengaduanAPI.update(item.documentId, {
                judul: form.judul,
                isi: form.isi,
                kategoris: [Number(form.kategoriId)],
                image: finalImageIds
            })
            
            onSuccess()
            onClose()
        } catch (err) {
            alert("Gagal menyimpan")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-[512px] p-8 max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-black text-slate-800 mb-6">
                    Edit Pengaduan
                </h3>
                <div className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                            Judul
                        </label>
                        <input 
                            className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-all" 
                            value={form.judul} 
                            onChange={e => setForm({...form, judul: e.target.value})} 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                            Isi Laporan
                        </label>
                        <textarea 
                            className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm min-h-[120px] outline-none focus:border-blue-500 transition-all" 
                            value={form.isi} 
                            onChange={e => setForm({...form, isi: e.target.value})} 
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                            Kategori
                        </label>
                        <div className="flex flex-row flex-wrap gap-2">
                            {allKategoris.map((k: any) => (
                                <button 
                                    key={k.id} 
                                    type="button"
                                    onClick={() => setForm({...form, kategoriId: k.id})}
                                    className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase border transition-all ${form.kategoriId === k.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-400 border-slate-200'}`}
                                >
                                    {k.nama}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                            Foto Pengaduan
                        </label>
                        
                        <div className="flex flex-row flex-wrap gap-3">
                            {images.existing.map((img: any) => (
                                <div key={img.id} className="relative w-60 h-60">
                                    <Image 
                                        src={API_URL + img.url} 
                                        alt="existing" 
                                        fill
                                        className="object-cover rounded-lg border border-slate-200" 
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => handleRemoveExisting(img.id)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center hover:bg-red-600 shadow-md"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            
                            {images.newPreview && (
                                <div className="relative w-60 h-60 border-2 border-blue-500 rounded-lg p-0.5">
                                    <Image 
                                        src={images.newPreview} 
                                        alt="preview" 
                                        fill
                                        className="object-cover rounded-md" 
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setImages({...images, newFile: null, newPreview: null})}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center shadow-md"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}

                            {!images.newFile && (
                                <label className="w-20 h-20 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                                    <span className="text-slate-400 text-xl">
                                        +
                                    </span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-row gap-3 pt-4">
                        <button 
                            type="button"
                            onClick={onClose} 
                            className="flex-1 py-3 font-bold rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
                        >
                            Batal
                        </button>
                        <button 
                            type="button"
                            onClick={handleSave} 
                            disabled={loading}
                            className="flex-[2] py-3 font-bold rounded-xl bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                        >
                            {loading ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}