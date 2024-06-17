import dayjs from "dayjs"

interface HeaderNote {
  title: string
  updateTime: string
}
export default function SidebarNoteItemHeader({ title, updateTime }: HeaderNote) {
  return (
    <header className="sidebar-note-header">
      <strong>{title}</strong>
      <small>{dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}</small>
    </header>
  )
}
