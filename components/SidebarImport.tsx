"use client"

import React, { Suspense } from "react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export default function SidebarImport() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target

    if (!fileInput.files || fileInput.files.length === 0) {
      console.log("No file selected")
      return
    }

    const file = fileInput.files[0]
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        console.error("Failed to import file")
        return
      }

      const data = await response.json()

      startTransition(() => router.push(`/note/${data.uid}`))
      startTransition(() => router.refresh())
      
    } catch (error) {
      console.error("something went wrong")
    }

    e.target.type = "text"
    e.target.type = "file"
  }

  return (
    <div style={{ textAlign: "center" }}>
      <label htmlFor="file" style={{ cursor: "pointer" }}>
        点我上传.md文件
      </label>
      <input
        type="file"
        id="file"
        name="file"
        style={{ position: "absolute", clip: "rect(0 0 0 0)" }}
        onChange={onChange}
        accept=".md"
      />
    </div>
  )
}
