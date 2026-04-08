"use client"

import { useState, useEffect } from "react"
import { siswaTableAPI, EditadminSiswaAPI, DeleteadminSiswaAPI } from "@/lib/api"
import { createSiswaByAdmin } from "@/lib/auth"
import Link from "next/link"
import { SiswaInputField } from "@/components/admin/SiswaInputField"
import { SiswaRow, Siswa } from "@/components/admin/SiswaRow"

export default function DataSiswa() {
    const [siswa, setSiswa] = useState<Siswa[]>([])
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({ nis: "", kelas: "" })
    const [loading, setLoading] = useState(false)

    const fetchSiswa = async () => {
        try {
            const res = await siswaTableAPI.getAll()
            setSiswa(res.data || [])
        } catch (error) {
            console.error("Gagal mengambil data siswa:", error)
        }
    }

    useEffect(() => {
        fetchSiswa()
    }, []) 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const submitSiswa = async () => {
        const { nis, kelas } = formData
        if (!nis.trim() || !kelas.trim()) return alert("NIS dan Kelas wajib diisi")
        
        try {
            setLoading(true)
            await createSiswaByAdmin(nis, kelas)
            alert("Siswa berhasil dibuat!")
            setFormData({ nis: "", kelas: "" })
            setShowForm(false)
            fetchSiswa()
        } catch (err: any) {
            alert(err.message || "Gagal membuat siswa")
        } finally {
            setLoading(false)
        }
    }

    const updateSiswaAndUser = async (item: Siswa, newNis: string, newKelas: string) => {
        if (newNis === item.nis && newKelas === item.kelas) return

        try {
            await siswaTableAPI.update(item.documentId, { nis: newNis, kelas: newKelas })
            if (item.user?.id) {
                await EditadminSiswaAPI.update(item.user.id, {
                    username: newNis,
                    email: `${newNis}@siswa.sch.id`,
                })
            }
            fetchSiswa()
        } catch (error) {
            alert("Gagal memperbarui data")
        }
    }

    const deleteSiswa = async (item: Siswa) => {
        if (!confirm("Hapus data siswa dan akun user terkait?")) return
        if (!item.user?.id) return alert("User ID tidak ditemukan")

        try {
            await DeleteadminSiswaAPI.deleteSiswaAndUser({
                documentId: item.documentId,
                userId: item.user.id
            })
            fetchSiswa()
        } catch (error) {
            alert("Gagal menghapus data")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <div className="max-w-5xl mx-auto px-4 pt-32">
                <div className="flex flex-row items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Manajemen Data Siswa</h1>
                        <p className="text-sm text-gray-500">Tambah, ubah, atau hapus data siswa.</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                        <Link href="/admin/dashboard" className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                            Kembali
                        </Link>
                        <button 
                            onClick={() => setShowForm(!showForm)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-all ${showForm ? "bg-gray-800 text-white" : "bg-blue-600 text-white"}`}
                        >
                            {showForm ? "Tutup Form" : "+ Tambah Siswa"}
                        </button>
                    </div>
                </div>

                {showForm && (
                    <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm mb-8 duration-300">
                        <div className="grid grid-cols-2 gap-4">
                            <SiswaInputField 
                                label="NIS" 
                                name="nis" 
                                placeholder="6767" 
                                value={formData.nis} 
                                onChange={handleInputChange} 
                            />
                            <SiswaInputField 
                                label="Kelas" 
                                name="kelas" 
                                placeholder="XII RPL 1" 
                                value={formData.kelas} 
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button 
                                className="w-1/3 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 transition-all"
                                onClick={submitSiswa} disabled={loading}
                            >
                                {loading ? "Menyimpan..." : "Simpan Data"}
                            </button>
                        </div>
                    </div>
                )}

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500">
                                <tr>
                                    <th className="px-6 py-4 text-center w-16">ID</th>
                                    <th className="px-6 py-4">NIS (Username)</th>
                                    <th className="px-6 py-4">Kelas</th>
                                    <th className="px-6 py-4 text-center w-24">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {siswa.map((item) => (
                                    <SiswaRow key={item.id} item={item} onUpdate={updateSiswaAndUser} onDelete={deleteSiswa} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {siswa.length === 0 && <div className="p-10 text-center text-gray-500 italic font-medium">Belum ada data siswa.</div>}
                </div>
            </div>
        </div>
    )
}