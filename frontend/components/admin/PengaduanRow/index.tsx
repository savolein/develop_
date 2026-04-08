"use client"

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
}

interface RowProps {
    data: Pengaduan;
    onUpdate: (docId: string, field: string, val: string) => void;
    onDelete: (docId: string) => void;
    progress: number;
}

export const PengaduanRow = ({ data, onUpdate, onDelete, progress }: RowProps) => {
    return (
        <tr className="hover:bg-gray-50/50 transition-colors">
            <td className="px-4 py-4 text-sm text-gray-500 text-center font-mono">{data.id}</td>
            <td className="px-4 py-4 text-sm font-medium text-gray-800">{data.siswa?.nis}</td>
            <td className="px-4 py-4">
                <div className="max-w-[200px]">
                    <p className="text-sm font-bold text-gray-800 truncate">{data.judul}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{data.isi}</p>
                </div>
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{data.tanggal}</td>
            <td className="px-4 py-4">
                <select
                    value={data.statuss}
                    onChange={(e) => onUpdate(data.documentId, "statuss", e.target.value)}
                    className="text-xs border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white py-1 outline-none cursor-pointer"
                >
                    <option value="Terkirim">Terkirim</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Selesai">Selesai</option>
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
                        ></div>
                    </div>
                    <span className="text-[10px] font-medium text-gray-500 text-right">{progress}%</span>
                </div>
            </td>
            <td className="px-4 py-4">
                <textarea
                    defaultValue={data.reply ?? ""}
                    onBlur={(e) => {
                        if (e.target.value !== data.reply) {
                            onUpdate(data.documentId, "reply", e.target.value);
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
                    className="p-3 bg-red-500 hover:bg-red-700 hover:text-white rounded-lg transition-colors group"
                >
                    Hapus
                </button>
            </td>
        </tr>
    );
}