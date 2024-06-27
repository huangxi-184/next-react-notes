import SidebarNoteItem from "@/components/SidebarNoteItem"
import { getAllNotes } from "@/lib/redis"
import SidebarNoteItemHeader from "@/components/SidebarNoteItemHeader"
import SidebarNoteListFilter from "@/components/SidebarNoteListFilter"

type Note = {
  title: string
  content: string
  updateTime: string
}

export default async function NoteList() {
  const notes = await getAllNotes()
  const arr = Object.entries(notes)

  if (arr.length === 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>
  }

  return (
    <>
      <SidebarNoteListFilter
        notes={Object.entries(notes)
          .map(([noteId, note]) => {
            const noteData = JSON.parse(note)
            return {
              noteId,
              note: noteData,
              header: <SidebarNoteItemHeader title={noteData.title} updateTime={noteData.updateTime} />,
            }
          })
          .sort((a, b) => Number(b.noteId) - Number(a.noteId))}
      />
    </>
  )
}
