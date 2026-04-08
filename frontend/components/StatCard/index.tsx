"use client"

import Link from "next/link"

export const StatCard = ({ title, value, href, colorClass, loading }: any) => (
    <Link
        href={href}
        className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group"
    >
        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
        <div className="flex items-end justify-between mt-2">
            <h2 className="text-4xl font-bold text-gray-800">
                {loading ? <span className="animate-pulse">...</span> : value}
            </h2>
            <div className={`h-2 w-12 rounded-full ${colorClass} opacity-60 group-hover:opacity-100 transition-opacity`} />
        </div>
    </Link>
)