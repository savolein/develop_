export const SiswaInputField = ({ label, ...props }: any) => (
    <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-600 ml-1">{label}</label>
        <input {...props} className="w-full border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-gray-50 outline-none" />
    </div>
)