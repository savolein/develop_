import NavbarSiswa from "@/components/NavbarSiswa"

export default function SiswaLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavbarSiswa />
            {children}
        </>
    )
}