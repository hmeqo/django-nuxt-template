import type { BaseModel } from '@hmeqo/easymodel'
import { createAlova } from 'alova'
import fetchAdapter from 'alova/fetch'
import VueHook from 'alova/vue'
import { toString } from 'lodash'
import {
  RequestCompleteEvent,
  RequestErrorEvent,
  RequestInternetErrorEvent,
  RequestStartEvent,
  RequestSuccessEvent
} from './event'

export const alovaInst = createAlova({
  baseURL: '/api',
  statesHook: VueHook,
  requestAdapter: fetchAdapter(),
  beforeRequest(method) {
    Object.assign(method.config.headers, {
      [useCsrf().headerName]: useCookie('csrftoken').value,
      'Content-Type': 'application/json'
    })

    let data = method.data
    if ((data as BaseModel)?.toRepresentation) {
      data = (data as BaseModel).toRepresentation()
      method.data = data
    }
    if (method.meta?.multipart || data instanceof FormData) {
      delete method.config.headers['Content-Type']
      if (!(data instanceof FormData)) {
        const formData = new FormData()
        for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
          formData.append(key, toString(value))
        }
        method.data = formData
      }
    }

    new RequestStartEvent(method).emit()
  },
  cacheFor: null,
  responded: {
    async onSuccess(response, method) {
      if (response.headers.get('Content-Type')?.includes('application/json')) {
        let data = await response.json()
        if (response.status >= 400) {
          new RequestErrorEvent(response, method, data).emit()
          throw response
        }
        if (method.meta?.model) {
          data = method.meta.model.init(data)
          if (method.meta.instance) Object.assign(method.meta.instance!, data)
        }
        new RequestSuccessEvent(response, method, data).emit()
        return data
      }
      if (response.status >= 400) {
        const error = { detail: $t(i18nKeys.error_occurred) }
        new RequestErrorEvent(response, method, error).emit()
        throw response
      }
      new RequestSuccessEvent(response, method, null).emit()
      return await response.text()
    },
    async onError(response: Response | Error, method) {
      if (response instanceof Error) {
        new RequestInternetErrorEvent(response, method).emit()
      } else {
        let error = { detail: $t(i18nKeys.error_occurred) }
        if (response.headers.get('Content-Type')?.includes('application/json')) {
          error = await response.json()
        }
        new RequestErrorEvent(response, method, error).emit()
      }
      throw response
    },
    async onComplete(method) {
      new RequestCompleteEvent(method).emit()
    }
  }
})
