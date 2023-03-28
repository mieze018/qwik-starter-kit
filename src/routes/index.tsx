import { component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import {
  getBuilderSearchParams,
  getContent,
  RenderContent,
} from '@builder.io/sdk-qwik'

export const BUILDER_PUBLIC_API_KEY = import.meta.env
  .VITE_BUILDER_PUBLIC_API_KEY
export const BUILDER_MODEL = 'page'

// Qwik Cityの `useBuilderContent` を使って、Builderからコンテンツを取得します。
// `routeLoader$()` は非同期関数を受け取り、 `getContent()` で Builder からコンテンツを取得します。

export const useBuilderContent = routeLoader$(async ({ url, error }) => {
  const builderContent = await getContent({
    model: BUILDER_MODEL,
    apiKey: BUILDER_PUBLIC_API_KEY,
    options: getBuilderSearchParams(url.searchParams),
    userAttributes: {
      urlPath: url.pathname,
    },
  })
  if (!builderContent) {
    throw error(404, 'File Not Found')
  }
  // Builderから取得したコンテンツを返す
  return builderContent
})

export default component$(() => {
  // useBuilderContent() を呼び出し、返された builderContent と同じ内容を設定する。
  const content = useBuilderContent()
  // RenderContent は `content` を使用して、与えられたモデル（ここではページ）のコンテンツを
  // レンダリングします（API キーで指定します）。

  return (
    <RenderContent
      model={BUILDER_MODEL}
      content={content.value}
      apiKey={BUILDER_PUBLIC_API_KEY}
    />
  )
})
