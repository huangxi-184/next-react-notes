"use client"

import { useEffect, useState } from "react"
import NotePreview from "@/components/NotePreview"
import { useFormState } from "react-dom"
import { deleteNote, saveNote } from "@/app/[lng]/actions"

import SaveButton from "@/components/SaveButton"
import DeleteButton from "@/components/DeleteButton"

const initialState = {
  message: null,
}

type NoteEditorProps = {
  noteId: string | null
  initialTitle: string
  initialBody: string
}

export default function NoteEditor({ noteId, initialTitle, initialBody }: NoteEditorProps) {
  const [saveState, saveFormAction] = useFormState(saveNote as any, initialState)
  const [, delFormAction] = useFormState(deleteNote as any, initialState)

  const [title, setTitle] = useState(initialTitle)
  const [body, setBody] = useState(initialBody)

  const isDraft = !noteId

  useEffect(() => {
    if ((saveState as any).errors) {
      // 处理错误
      console.log((saveState as any).errors)
    }
  }, [saveState])

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <input type="hidden" name="noteId" value={noteId || ""} />
        <div className="note-editor-menu" role="menubar">
          <SaveButton formAction={saveFormAction} />
          <DeleteButton isDraft={isDraft} formAction={delFormAction} />
        </div>
        <div className="note-editor-menu">
          {saveState?.message}
          {(saveState as any).errors && (saveState as any).errors[0].message}
        </div>
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea name="body" value={body} id="note-body-input" onChange={(e) => setBody(e.target.value)} />
      </form>
      <div className="note-editor-preview">
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  )
}
