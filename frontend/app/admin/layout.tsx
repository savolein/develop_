import NavbarAdmin from "@/components/NavbarAdmin"

export default function SiswaLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavbarAdmin />
            {children}
        </>
    )
}