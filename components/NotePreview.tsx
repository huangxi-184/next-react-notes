import { marked } from "marked"
import sanitizeHtml from "sanitize-html"

const allowedTags = sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "h3"])
const allowedAttributes = Object.assign({}, sanitizeHtml.defaults.allowedAttributes, {
  img: ["alt", "src"],
})

export default async function NotePreview({ children }: { children: string }) {
  return (
    <div className="note-preview">
      <div
        className="text-with-markdown"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(await marked(children || ""), {
            allowedTags,
            allowedAttributes,
          }),
        }}
      />
    </div>
  )
}
