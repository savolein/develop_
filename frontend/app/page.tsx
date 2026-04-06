"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default async function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if(token){
      const user = JSON.parse(localStorage.getItem("user") || "{}")

      if(user.email === "admin@sekolah.sch.id"){  
        router.push("/admin/dashboard")
      } else{
        router.push("/siswa/dashboard")
      }
    } else{
      router.push("/login")
    }
  }, [])

  return null
}
