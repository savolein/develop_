const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function Register(
    nis: string,
    kelas: string,
    password: string
) {
    const res = await fetch(`${API_URL}/api/auth/local/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: nis,
            email: `${nis}@siswa.sch.id`,
            password
        })
    })

    const { jwt, user } = await res.json()

    await fetch(`${API_URL}/api/siswas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify({
            data: {
                nis,
                kelas,
                user: user.id
            }
        })
    })
    return user
}

export async function Login(
    identifier: string,
    password: string
){
    const res = await fetch(`${API_URL}/api/auth/local/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            identifier,
            password
        })
    })
    const data = await res.json()

    if(!res.ok){
        throw new Error("Error")
    }
    return data
}

export async function createSiswaByAdmin(
    nis: string,
    kelas: string
){
    const res = await fetch(`${API_URL}/api/auth/local/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: nis,
            email: `${nis}@siswa.sch.id`,
            password: nis
        })
    })
    const data = await res.json()

    if(!res.ok){
        throw new Error(data?.error?.message || "Gagal register siswa")
    }

    const {jwt, user} = data

    await fetch(`${API_URL}/api/siswas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify({
            data: {
                nis,
                kelas,
                user: user.id
            }
        })
    })
    return user
}