import { useCallback, useEffect, useState } from 'react'
import { ToastProps } from '@/components/ui/toast'
import { ToasterToast, useToast } from '@/hooks/use-toast'
import utils from '@/common/utils'

export const useSuccessToast = () => {
  const { toast } = useToast()

  const successToast = useCallback(
    (
      props: Omit<
        ToasterToast & {
          error?: unknown
        },
        'id'
      >,
    ) => {
      toast({
        variant: props.variant ?? 'default',
        duration: props.duration ?? 3000,
        description: props.description,
        ...props,
      })
    },
    [toast],
  )

  return successToast
}

export const useCatchErrorToast = () => {
  const { toast } = useToast()

  return useCallback(
    async <T>(
      callback: () => Promise<T> | T,
      successToastProps?: Pick<ToasterToast, 'variant' | 'description'> &
        Partial<Pick<ToastProps, 'duration'>>,
    ): Promise<T | undefined> => {
      let res = undefined
      try {
        res = await callback()
        if (successToastProps) {
          toast({
            description: successToastProps.description,
            variant: successToastProps.variant,
            duration: successToastProps.duration ?? 3000,
          })
        }
      } catch (e) {
        console.error(e)
        toast({
          description: utils.getClientErrorMessage(e),
          variant: 'destructive',
          duration: 3000,
        })
      }
      return res
    },
    [toast],
  )
}

export const useErrorToast = () => {
  const { toast } = useToast()

  const errorToast = useCallback(
    ({
      error,
      duration,
      description,
      ...props
    }: Omit<
      ToasterToast & {
        error?: unknown
      },
      'id'
    >) => {
      toast({
        variant: 'destructive',
        duration: duration ?? 3000,
        description: description ?? utils.getClientErrorMessage(error),
        ...props,
      })
    },
    [toast],
  )

  return errorToast
}

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)

  const errorToast = useErrorToast()
  const copyToClipboard = useCallback(
    async (url: string) => {
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 3000)
      } catch (error) {
        console.error(error)
        errorToast({
          description: 'Failed to copy to clipboard',
        })
      }
    },
    [errorToast],
  )

  return {
    copied,
    copyToClipboard,
  }
}

export const useWindowOrigin = () => {
  const [origin, setOrigin] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
    }
  }, [])

  return origin
}
