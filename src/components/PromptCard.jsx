import { useId, useRef, useState } from 'react'

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch { /* 아래 대체 방법으로 */ }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  } catch {
    return false
  }
}

// 프롬프트 카드: 전체 복사 · 글자 수 · 펼치기/접기 · 수동 복사.
// compact 는 오류 도움말 요청문처럼 짧은 카드.
export default function PromptCard({ id, title, text, compact = false, copyLabel }) {
  const [open, setOpen] = useState(compact)
  const [manual, setManual] = useState(false)
  const [msg, setMsg] = useState('')
  const taRef = useRef(null)
  const bodyId = useId()

  const onCopy = async () => {
    const ok = await copyText(text)
    if (ok) {
      setMsg('복사했습니다. AI Studio 입력창에 붙여 넣으세요(Ctrl+V, Mac은 Cmd+V).')
    } else {
      setMsg('자동 복사가 되지 않았습니다. 아래 칸에서 직접 복사하세요.')
      setManual(true)
      setTimeout(() => { taRef.current?.focus(); taRef.current?.select() }, 0)
    }
  }

  const long = text.split('\n').length > 6 || text.length > 420

  return (
    <section className={'prompt' + (compact ? ' prompt--compact' : '')} aria-label={title}>
      <header className="prompt__head">
        {id && <span className="prompt__id">{id}</span>}
        <h4 className="prompt__title">{title}</h4>
        <span className="prompt__count">{text.length.toLocaleString('ko-KR')}자</span>
      </header>
      <pre
        id={bodyId}
        className={'prompt__body' + (!open && long ? ' is-collapsed' : '')}
        tabIndex={0}
      >{text}</pre>
      <div className="prompt__actions no-print">
        <button type="button" className="btn btn--primary" onClick={onCopy}>
          {copyLabel || '이 단계 전체 복사'}
        </button>
        {long && (
          <button type="button" className="btn" aria-expanded={open} aria-controls={bodyId} onClick={() => setOpen(!open)}>
            {open ? '접기' : '펼치기'}
          </button>
        )}
        <button type="button" className="btn btn--ghost" aria-expanded={manual} onClick={() => setManual(!manual)}>
          수동 복사
        </button>
      </div>
      <p className="prompt__msg no-print" role="status" aria-live="polite">{msg}</p>
      {manual && (
        <div className="manual no-print">
          <label htmlFor={bodyId + '-ta'}>
            칸을 클릭한 뒤 <kbd>Ctrl</kbd>+<kbd>A</kbd> → <kbd>Ctrl</kbd>+<kbd>C</kbd> (Mac: <kbd>Cmd</kbd>+<kbd>A</kbd> → <kbd>Cmd</kbd>+<kbd>C</kbd>)
          </label>
          <textarea
            id={bodyId + '-ta'}
            ref={taRef}
            readOnly
            value={text}
            rows={Math.min(14, text.split('\n').length + 2)}
            onFocus={(e) => e.target.select()}
          />
        </div>
      )}
    </section>
  )
}
