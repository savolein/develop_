"use client"

import { useState } from "react"
import Image from "next/image"
import { API_URL } from "@/lib/api"

interface Pengaduan {
    id: number;
    documentId: string;
    nis: string;
    judul: string;
    isi: string;
    tanggal: string;
    statuss: string;
    reply: string | null;
    siswa?: { nis?: string };
    image?: any[];
}

interface RowProps {
    data: Pengaduan;
    onUpdate: (docId: string, field: string, val: string) => void;
    onDelete: (docId: string) => void;
    progress: number;
}

export const PengaduanRow = ({ data, onUpdate, onDelete, progress }: RowProps) => {
    const [viewImage, setViewImage] = useState<string | null>(null)

    return (
        <>
            <tr className="hover:bg-gray-50/50 transition-colors align-top">
                <td className="px-4 py-4 text-sm text-gray-500 text-center font-mono">
                    {data.id}
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-800">
                    {data.siswa?.nis}
                </td>
                <td className="px-4 py-4">
                    <div className="max-w-[200px]">
                        <p className="text-sm font-bold text-gray-800 truncate">
                            {data.judul}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-1">
                            {data.isi}
                        </p>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {data.tanggal}
                </td>

                <td className="px-4 py-4">
                    {data.image && data.image.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {data.image.map((img: any) => (
                                <button
                                    key={img.id}
                                    onClick={() => setViewImage(API_URL + img.url)}
                                    className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-all group"
                                >
                                    <Image
                                        src={API_URL + img.url}
                                        alt="foto siswa"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                        <span className="text-white text-[10px] font-bold opacity-0 group-hover:opacity-100">
                                            Lihat
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <span className="text-xs text-gray-400 italic">
                            Tidak ada
                        </span>
                    )}
                </td>

                <td className="px-4 py-4">
                    <select
                        value={data.statuss}
                        onChange={(e) => onUpdate(data.documentId, "statuss", e.target.value)}
                        className="text-xs border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white py-1 outline-none cursor-pointer"
                    >
                        <option value="Terkirim">
                            Terkirim
                        </option>
                        <option value="Diproses">
                            Diproses
                        </option>
                        <option value="Selesai">
                            Selesai
                        </option>
                    </select>
                </td>

                <td className="px-4 py-4 min-w-[140px]">
                    <div className="flex flex-col gap-1">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                    data.statuss === "Terkirim" ? "bg-gray-400" :
                                    data.statuss === "Diproses" ? "bg-amber-400" : "bg-emerald-500"
                                }`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-[10px] font-medium text-gray-500 text-right">
                            {progress}%
                        </span>
                    </div>
                </td>

                <td className="px-4 py-4">
                    <textarea
                        defaultValue={data.reply ?? ""}
                        onBlur={(e) => {
                            if (e.target.value !== data.reply) {
                                onUpdate(data.documentId, "reply", e.target.value)
                            }
                        }}
                        placeholder="Tulis balasan..."
                        className="text-sm border-gray-200 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 resize-none py-1 px-2 outline-none bg-gray-50/50"
                        rows={1}
                    />
                </td>

                <td className="px-4 py-4 text-center">
                    <button
                        onClick={() => onDelete(data.documentId)}
                        className="p-3 bg-red-500 hover:bg-red-700 text-white rounded-lg transition-colors text-xs font-bold"
                    >
                        Hapus
                    </button>

                    {viewImage && (
                        <div
                            className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
                            onClick={() => setViewImage(null)}
                        >
                            <div className="relative max-w-3xl w-full h-[85vh]" onClick={e => e.stopPropagation()}>
                                <Image
                                    src={viewImage}
                                    alt="preview"
                                    fill
                                    className="object-contain rounded-xl"
                                    priority
                                    unoptimized={true} 
                                />
                                <button
                                    onClick={() => setViewImage(null)}
                                    className="absolute top-34 -right-8 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold"
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    )}
                </td>
            </tr>
        </>
    )
}