import type { AlovaGenerics } from 'alova'
import type { AlovaFrontMiddleware } from 'alova/client'
import type { DialogOptions, FormInst } from 'naive-ui'

type Middleware = AlovaFrontMiddleware<AlovaGenerics>

export class MiddlewareReject extends Error {
  override name = 'MiddlewareReject'
}

export function middlewares(middlewares: Middleware[]): Middleware {
  return middlewares.reverse().reduce(
    (a, b) => (context, next) => b(context, () => a(context, next)),
    (context, next) => next()
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formValidationMiddleware(getForm: () => any): Middleware {
  return (context, next) =>
    (getForm() as FormInst)
      .validate()
      .then(() => next())
      .catch(() => Promise.reject(new MiddlewareReject()))
}

export function dialogMiddleware(options?: DialogOptions): Middleware {
  return (context, next) =>
    new Promise((resolve, reject) =>
      createNaiveDialog({
        ...options,
        onPositiveClick(event) {
          options?.onPositiveClick?.(event)
          resolve(next())
        },
        onNegativeClick(event) {
          options?.onNegativeClick?.(event)
          reject(new MiddlewareReject())
        },
        onClose() {
          options?.onClose?.()
          reject(new MiddlewareReject())
        },
        onEsc() {
          options?.onEsc?.()
          reject(new MiddlewareReject())
        }
      })
    )
}
