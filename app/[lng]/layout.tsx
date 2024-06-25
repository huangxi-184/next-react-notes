import "./style.css"
import Sidebar from "@/components/Sidebar"
import React from "react"
import { locales } from "@/config"
import Header from "@/components/Header"

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    lng: string
  }
}

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }))
}

export default function RootLayout({ children, params: { lng } }: RootLayoutProps) {
  return (
    <html lang={lng}>
      <body>
        <div className="container">
          <Header />
          <div className="main">
            <Sidebar />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  )
}
