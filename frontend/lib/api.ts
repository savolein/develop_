import { count, error } from "console"
import { json } from "stream/consumers"
export const API_URL = process.env.NEXT_PUBLIC_API_URL
export async function fetchAPI(
    url: string,
    options: RequestInit = {}
){
    const token = localStorage.getItem("token") 
    const res = await fetch(API_URL + url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? {Authorization: `Bearer ${token}`}: {})
        }
    })
    if (res.status === 204) {
        return null
    }
    const text = await res.text()
    const data = text ? JSON.parse(text) : null
    if (!res.ok) {
        throw new Error("API Error")
    }
    return data
}
export const siswaAPI = {
    getByUserId (userId: number){
        return fetchAPI(`/api/siswas?filters[user][id][$eq]=${userId}&populate=user`)
    }
}
export const kategoriAPI = {
    getAll(){
        return fetchAPI(`/api/kategoris`)
    }
}
export const pengaduanAPI = {
    getBySiswa(siswaId: number){
        return fetchAPI(`/api/aspirasis?filters[siswa][id][$eq]=${siswaId}&populate=kategoris`)
    },
    update(documentId: string, data: {
        judul: string,
        isi: string,
        kategoris: number[]
        image?: number[]
    }){
        return fetchAPI(`/api/aspirasis/${documentId}`, {
            method: "PUT",
            body: JSON.stringify({ data })
        })
    },
    create(data: {
        judul: string,
        isi: string,
        siswa: number,
        kategoris: number[],
        image?: number[]          
    }){
        return fetchAPI(`/api/aspirasis`, {
            method: "POST",
            body: JSON.stringify({
                data: {
                    judul: data.judul,
                    isi: data.isi,
                    siswa: data.siswa,
                    kategoris: data.kategoris,
                    image: data.image ?? [],   
                    statuss: "Terkirim",
                    tanggal: new Date().toISOString().split("T")[0]
                }
            })
        })
    }
}
export const UserAPI = {
    me(){
        return fetchAPI("/api/users/me")
    },
}
export const pengaduanSiswaAPI = {
    getByUser(userId: number) {
        return fetchAPI(
            `/api/aspirasis?filters[siswa][user][id][$eq]=${userId}&populate=*`
        )
    },
}
export const pengaduanTableAPI = {
    getAll(){
        return fetchAPI('/api/aspirasis?populate=*')
    },
    update(documentId: string, data: any) {
        return fetchAPI(`/api/aspirasis/${documentId}`, {
            method: "PUT",
                body: JSON.stringify({
                data,
            }),
        })
    },
    delete(documentId: string) {
        return fetchAPI(`/api/aspirasis/${documentId}`, {
            method: "DELETE",
        })
    },
}
export const siswaTableAPI = {
    getAll(){
        return fetchAPI('/api/siswas?populate=*')
    },
    create(data: {
        nis: string
        kelas: string
        user?: number
    }){
        return fetchAPI('/api/siswas', {
            method: "POST",
            body: JSON.stringify({
                data: {
                    nis: data.nis,
                    kelas: data.kelas,
                    ...(data.user ? {user: data.user}: {})
                }
            })
        })
    },
    update(documentId: string, data: any){
        return fetchAPI(`/api/siswas/${documentId}`, {
            method: "PUT",
            body: JSON.stringify({data})
        })
    },
}
export const paginationPengaduan = {
    getAll(){
        return fetchAPI(`/api/aspirasis?pagination[pageSize]=1000`)
    }
}
export const paginationSiswa = {
    getAll(){
        return fetchAPI(`/api/siswas?pagination[pageSize]=1000`)
    }
}
export const EditadminSiswaAPI = {
    update(userId: number, data: any) {
        return fetchAPI(`/api/users/${userId}`, {
            method: "PUT",
            body: JSON.stringify(data),
        })
    },
}
export const DeleteadminSiswaAPI = {
    async deleteSiswaAndUser(siswa: {
        documentId: string
        userId: number
    }){
        await fetchAPI(`/api/siswas/${siswa.documentId}`, {
            method: "DELETE"
        })
        await fetchAPI(`/api/users/${siswa.userId}`, {
            method: "DELETE"
        })
    }
}

export const uploadAPI = {
    async uploadImage(file: File): Promise<number> {
        const token = localStorage.getItem("token")
        const formData = new FormData()
        formData.append("files", file)
        formData.append("folder", "images")

        const res = await fetch(API_URL + "/api/upload", {
            method: "POST",
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: formData
        })

        if (!res.ok) throw new Error("Upload gagal")
        const data = await res.json()
        return data[0].id
    }
}