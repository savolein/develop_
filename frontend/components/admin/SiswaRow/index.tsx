export interface Siswa {
    id: number
    documentId: string
    nis: string
    kelas: string
    user?: { id: number }
}

export const SiswaRow = ({ item, onUpdate, onDelete }: { item: Siswa, onUpdate: any, onDelete: any }) => (
    <tr className="hover:bg-gray-50/50 transition-colors group">
        <td className="px-6 py-4 text-sm text-gray-400 text-center font-mono">#{item.id}</td>
        <td className="px-6 py-4">
            <input
                defaultValue={item.nis}
                onBlur={(e) => onUpdate(item, e.target.value, item.kelas)}
                className="bg-transparent border-transparent hover:border-gray-300 focus:bg-white focus:border-blue-500 p-1.5 rounded w-full text-sm font-medium text-gray-700 transition-all outline-none"
            />
        </td>
        <td className="px-6 py-4">
            <input
                defaultValue={item.kelas}
                onBlur={(e) => onUpdate(item, item.nis, e.target.value)}
                className="bg-transparent border-transparent hover:border-gray-300 focus:bg-white focus:border-blue-500 p-1.5 rounded w-full text-sm text-gray-600 transition-all outline-none"
            />
        </td>
        <td className="px-6 py-4 text-center">
            <button
                onClick={() => onDelete(item)}
                className="p-3 bg-red-500 hover:bg-red-700 hover:text-white rounded-lg transition-colors group"
            >
                Hapus
            </button>
        </td>
    </tr>
)