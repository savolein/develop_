"use client"
import { useState, useEffect, useCallback } from "react"
import { paginationPengaduan, paginationSiswa } from "@/lib/api"
import { StatCard } from "@/components/StatCard"

export default function DashboardAdmin() {
    const [stats, setStats] = useState({
        terkirim: 0,
        diproses: 0,
        selesai: 0,
        siswa: 0
    })
    const [loading, setLoading] = useState(true)

    const fetchAllData = useCallback(async () => {
        try {
            setLoading(true)
            const [resPengaduan, resSiswa] = await Promise.all([
                paginationPengaduan.getAll(),
                paginationSiswa.getAll()
            ])

            const pengaduanData = resPengaduan.data || []
            const siswaData = resSiswa.data || []

            const counts = pengaduanData.reduce((acc: any, item: any) => {
                if (item.statuss === "Diproses") acc.diproses++
                if (item.statuss === "Selesai") acc.selesai++
                return acc;
            }, { diproses: 0, selesai: 0 })

            setStats({
                terkirim: pengaduanData.length,
                diproses: counts.diproses,
                selesai: counts.selesai,
                siswa: siswaData.length
            })
        } catch (error) {
            console.error("Gagal mengambil data:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchAllData()
    }, [fetchAllData])

    return (
        <div className="min-h-screen bg-gray-50 p-10 pt-32">
            <div className="max-w-7xl mx-auto space-y-12">
                
                <div>
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Data Pengaduan</h1>
                        <p className="text-gray-500 text-sm">Ringkasan status laporan siswa.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        <StatCard 
                            title="Total Pengaduan" 
                            value={stats.terkirim} 
                            href="/admin/data_table" 
                            colorClass="bg-blue-500" 
                            loading={loading}
                        />
                        <StatCard 
                            title="Sedang Diproses" 
                            value={stats.diproses} 
                            href="/admin/data_table" 
                            colorClass="bg-amber-500" 
                            loading={loading}
                        />
                        <StatCard 
                            title="Selesai" 
                            value={stats.selesai} 
                            href="/admin/data_table" 
                            colorClass="bg-emerald-500" 
                            loading={loading}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Data Siswa</h1>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        <StatCard 
                            title="Total Siswa Terdaftar" 
                            value={stats.siswa} 
                            href="/admin/data_siswa" 
                            colorClass="bg-indigo-500" 
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}