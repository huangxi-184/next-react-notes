import SidebarNoteItemContent from "@/components/SidebarNoteItemContent"
import SidebarNoteItemHeader from "@/components/SidebarNoteItemHeader"

interface Note {
  title: string
  content: string
  updateTime: string
}

interface SidebarNoteItemProps {
  noteId: string
  note: Note
}

export default function SidebarNoteItem({ noteId, note }: SidebarNoteItemProps) {
  const { title, content = "", updateTime } = note
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={title}
      expandedChildren={<p className="sidebar-note-excerpt">{content.substring(0, 20) || <i>(No content)</i>}</p>}>
      <SidebarNoteItemHeader title={title} updateTime={updateTime}></SidebarNoteItemHeader>
    </SidebarNoteItemContent>
  )
}
