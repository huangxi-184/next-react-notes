import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { NextResponse } from "next/server"
import { locales, defaultLocale } from "@/config"

const publicFile = /\.(.*)$/
const excludeFile = ["logo.svg"]

function getLocale(request: any) {
  const headers = { "accept-language": request.headers.get("accept-language") || "" }
  const language = new Negotiator({ headers }).language()
  return match(language as any, locales, defaultLocale)
}

export function middleware(request: { nextUrl: URL }) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale: string) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // 如果是 public 文件，不重定向
  if (publicFile.test(pathname) && excludeFile.indexOf(pathname.substr(1)) == -1) return

  // 获取匹配的 locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`

  // 默认语言不重定向
  if (locale == defaultLocale) {
    return NextResponse.rewrite(request.nextUrl)
  }

  // 重定向，如 /products 重定向到 /en-US/products
  return Response.redirect(request.nextUrl)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
