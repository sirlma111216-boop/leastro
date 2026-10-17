import { useEffect, useRef, useState } from 'react'

// 이 브라우저에만 저장한다. 저장이 막혀도(시크릿 창·차단 설정) 페이지는 그대로 쓸 수 있어야 한다.
const KEY = 'space-photo-workshop-guide:v1'

export const EMPTY = { current: 'overview', urls: { app: '', guide: '' } }

function read() {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return { state: EMPTY, ok: true }
    const s = JSON.parse(raw)
    return { state: { current: s.current || EMPTY.current, urls: { ...EMPTY.urls, ...(s.urls || {}) } }, ok: true }
  } catch {
    return { state: EMPTY, ok: false }
  }
}

export function usePageState() {
  const first = useRef(null)
  if (first.current === null) first.current = read()
  const [state, setState] = useState(first.current.state)
  const [ok, setOk] = useState(first.current.ok)

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state))
      setOk(true)
    } catch {
      setOk(false)
    }
  }, [state])

  const reset = () => {
    try { window.localStorage.removeItem(KEY) } catch { /* 저장 차단 시 화면 상태만 초기화 */ }
    setState({ ...EMPTY, urls: { ...EMPTY.urls } })
  }

  return [state, setState, ok, reset]
}
