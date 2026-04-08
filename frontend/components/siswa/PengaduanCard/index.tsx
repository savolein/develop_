"use client"

import { API_URL } from "@/lib/api"
import Image from "next/image"

export default function PengaduanCard({ item, onEdit }: { item: any, onEdit: () => void }) {
    const progressMap: Record<string, number> = {
        Terkirim: 33,
        Diproses: 66,
        Selesai: 100,
    }

    const statusStyles: Record<string, string> = {
        Selesai: "bg-emerald-100 text-emerald-700",
        Diproses: "bg-amber-100 text-amber-700",
        Terkirim: "bg-slate-100 text-slate-600",
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex flex-row justify-between items-start gap-4 mb-6">
                <div className="flex-1">
                    <div className="flex flex-row items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                            {item.kategoris?.[0]?.nama || "Umum"}
                        </span>
                        <span className="text-xs text-slate-400">{item.tanggal}</span>
                    </div>
                    <h3 className="font-bold text-xl text-slate-800">{item.judul}</h3>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shrink-0 ${statusStyles[item.statuss]}`}>
                    {item.statuss}
                </span>
            </div>

            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 italic text-sm mb-6">
                "{item.isi}"
            </p>

            {item.image?.length > 0 && (
                <div className="mb-6 flex flex-row flex-wrap gap-3">
                    {item.image.map((img: any) => (
                        <img 
                            key={img.id} 
                            src={API_URL + img.url} 
                            className="h-28 w-auto rounded-xl object-cover border border-slate-200" 
                            alt="lampiran" 
                        />
                    ))}
                </div>
            )}

            <div className="space-y-2 mb-6">
                <div className="flex flex-row justify-between text-[10px] font-bold text-slate-400 uppercase">
                    <span>Progres Penyelesaian</span>
                    <span>{progressMap[item.statuss]}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-700 ${item.statuss === 'Selesai' ? 'bg-emerald-500' : item.statuss === 'Diproses' ? 'bg-amber-400' : 'bg-slate-400'}`}
                        style={{ width: `${progressMap[item.statuss]}%` }}
                    />
                </div>
            </div>

            <div className={`p-4 rounded-xl border-l-4 ${item.reply ? 'bg-blue-50 border-blue-600' : 'bg-slate-50 border-slate-300'}`}>
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">
                    Balasan Admin:
                </h4>
                <p className="text-sm text-slate-700 font-medium">
                    {item.reply || "Menunggu verifikasi admin..."}
                </p>
            </div>

            {item.statuss === "Terkirim" && (
                <div className="mt-6 pt-6 border-t border-slate-50 flex flex-row justify-end">
                    <button onClick={onEdit} className="text-xs bg-slate-900 text-white px-6 py-2.5 rounded-xl hover:bg-blue-600 transition-all font-bold">
                        Ubah Pengaduan
                    </button>
                </div>
            )}
        </div>
    )
}