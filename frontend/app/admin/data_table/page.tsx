"use client"

import { useState, useEffect } from "react"
import NavbarAdmin from "@/components/NavbarAdmin"
import { pengaduanTableAPI } from "@/lib/api"
import { PengaduanRow } from "@/components/admin/PengaduanRow"
import Link from "next/link"

export default function DataTable() {
    const [pengaduan, setPengaduan] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const res = await pengaduanTableAPI.getAll()
            setPengaduan(res.data || [])
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const updateData = async (documentId: string, field: string, value: string) => {
        try {
            await pengaduanTableAPI.update(documentId, { [field]: value })
            fetchData()
        } catch (error) {
            alert("Gagal update data")
        }
    }

    const deleteData = async (documentId: string) => {
        if (!confirm("Yakin ingin menghapus ini?")) return
        try {
            await pengaduanTableAPI.delete(documentId)
            setPengaduan(prev => prev.filter(item => item.documentId !== documentId))
        } catch (error) {
            alert("Gagal menghapus")
        }
    }

    const progressMap: Record<string, number> = {
        Terkirim: 33,
        Diproses: 66,
        Selesai: 100,
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <div className="w-[1200px] mx-auto px-4 pt-32">
                <div className="flex flex-row items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Data Pengaduan</h1>
                        <p className="text-sm text-gray-500">Kelola pengaduan siswa secara efisien.</p>
                    </div>
                    <Link 
                        href="/admin/dashboard"
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all shadow-sm shrink-0"
                    >
                        Kembali ke Dashboard
                    </Link>
                </div>

                <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-4 py-4 text-center w-16">ID</th>
                                    <th className="px-4 py-4 w-32">NIS</th>
                                    <th className="px-4 py-4 w-64">Laporan</th>
                                    <th className="px-4 py-4 w-32">Tanggal</th>
                                    <th className="px-4 py-4 w-32">Status</th>
                                    <th className="px-4 py-4 w-40">Progress</th>
                                    <th className="px-4 py-4">Tanggapan</th>
                                    <th className="px-4 py-4 text-center w-24">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr><td colSpan={8} className="text-center py-10 text-gray-400">Memuat data...</td></tr>
                                ) : pengaduan.map((item) => (
                                    <PengaduanRow 
                                        key={item.id} 
                                        data={item} 
                                        onUpdate={updateData} 
                                        onDelete={deleteData}
                                        progress={progressMap[item.statuss] || 0}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {!loading && pengaduan.length === 0 && (
                        <div className="p-10 text-center text-gray-500 italic">Belum ada data pengaduan.</div>
                    )}
                </div>
            </div>
        </div>
    )
}