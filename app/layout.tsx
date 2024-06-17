import "./style.css"
import Sidebar from "@/components/Sidebar"

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="container">
          <div className="main">
            <Sidebar />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  )
}
