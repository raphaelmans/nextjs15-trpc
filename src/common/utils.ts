import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

import { type QueryParamRecord } from '@/common/constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const shimmerImage = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
  <defs>
  <linearGradient id="g">
  <stop stop-color="#e0e0e0" offset="20%" />
  <stop stop-color="#f5f5f5" offset="50%" />
  <stop stop-color="#e0e0e0" offset="70%" />
</linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#e0e0e0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlinkHref="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)

const blurImage = (w: number, h: number): `data:image/${string}` => {
  return `data:image/svg+xml;base64,${toBase64(shimmerImage(w, h))}`
}

export class URLQueryBuilder {
  private searchParams: URLSearchParams

  constructor() {
    this.searchParams = new URLSearchParams()
  }

  static startQuery(searchParams: string) {
    return '?' + searchParams
  }

  addParams(values: QueryParamRecord) {
    for (const [key, value] of Object.entries(values)) {
      if (value) {
        this.searchParams.append(key, value)
      }
    }
    return this
  }

  build() {
    return this.searchParams.toString()
  }

  buildWithStartQuery() {
    return URLQueryBuilder.startQuery(this.build())
  }
}

const utils = {
  parseImageSrc: (src: string) => {
    return z.string().url().safeParse(src).success ? src : undefined
  },
  getClientErrorMessage: (e: unknown) => {
    let errorMessage = 'Internal Server Error'
    console.error(e)
    if (e instanceof z.ZodError) {
      errorMessage = e.issues.map(issue => issue.message).join('\n')
    } else if (e instanceof Error) {
      errorMessage = e.message
    }

    return errorMessage
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  getNestedFormErrorMessages: (obj: {}): string[] => {
    console.error(obj)
    return Object.entries(obj).flatMap(([, value]) => {
      if (value && typeof value === 'object') {
        if ('message' in value) {
          return [value.message as string]
        }
        return utils.getNestedFormErrorMessages(value)
      }
      return []
    })
  },
  blurImage,
}

export default utils
