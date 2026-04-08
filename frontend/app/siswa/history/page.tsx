"use client"

import { useState, useEffect } from "react"
import { pengaduanAPI, kategoriAPI, siswaAPI, UserAPI } from "@/lib/api"
import NavbarSiswa from "@/components/NavbarSiswa"
import PengaduanCard from "@/components/siswa/PengaduanCard"
import EditPengaduanModal from "@/components/siswa/EditPengaduanModal"

export default function HistoryPengaduan() {
    const [pengaduan, setPengaduan] = useState<any[]>([])
    const [allKategoris, setAllKategoris] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedItem, setSelectedItem] = useState<any | null>(null)

    const fetchData = async () => {
        try {
            const user = await UserAPI.me()
            const siswaRes = await siswaAPI.getByUserId(user.id)
            const siswaId = siswaRes.data[0]?.id
            
            if (siswaId) {
                const [pRes, kRes] = await Promise.all([
                    pengaduanAPI.getBySiswa(siswaId),
                    kategoriAPI.getAll()
                ])
                setPengaduan(pRes.data || [])
                setAllKategoris(kRes.data || [])
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchData() }, [])

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <NavbarSiswa />
            <div className="w-[896px] mx-auto pt-[140px] px-6">
                <h2 className="text-3xl font-extrabold text-slate-800 mb-10">Riwayat Pengaduan</h2>

                {loading ? (
                    <div className="text-center py-20 animate-pulse">Memuat data...</div>
                ) : (
                    <div className="space-y-6">
                        {pengaduan.map(item => (
                            <PengaduanCard 
                                key={item.id} 
                                item={item} 
                                onEdit={() => setSelectedItem(item)} 
                            />
                        ))}
                    </div>
                )}
            </div>

            {selectedItem && (
                <EditPengaduanModal 
                    item={selectedItem} 
                    allKategoris={allKategoris} 
                    onClose={() => setSelectedItem(null)} 
                    onSuccess={fetchData} 
                />
            )}
        </div>
    )
}