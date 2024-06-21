import { useTranslation } from "@/app/[lng]/i18n/index"

type PageProps = {
  params: {
    lng: string
  }
}

export default async function Page({ params: { lng } }: PageProps) {
  const { t } = await useTranslation(lng,"basic")
  return (
    <div className="note--empty--state">
      <span className="note-text--empty--state">{t("initText")}</span>
    </div>
  )
}
