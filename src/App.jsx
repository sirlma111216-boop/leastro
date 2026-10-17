import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { STEPS, TOTAL_MINUTES } from './data/steps.jsx'
import { CHECKED_ON } from './data/links.js'
import { usePageState } from './lib/storage.js'
import StepView from './components/StepView.jsx'
import { Overview, Troubles, Curriculum, Precheck, GuideDeploy, Glossary } from './components/Sections.jsx'

const SECTIONS = [
  { id: 'overview', label: '연수 개요', group: '시작' },
  ...STEPS.map((s) => ({ id: s.id, label: `${s.num}단계 · ${s.title}`, group: '단계별 실습', step: s })),
  { id: 'troubles', label: '오류 도움말', group: '참고' },
  { id: 'curriculum', label: '교육과정·수업 설계', group: '참고' },
  { id: 'glossary', label: '용어 사전', group: '참고' },
  { id: 'precheck', label: '강사용 사전 점검', group: '강사용' },
  { id: 'guide-deploy', label: '강사용 준비: 강의안 배포', group: '강사용' },
]
const IDS = SECTIONS.map((s) => s.id)

export default function App() {
  const [state, setState] = usePageState()
  const [tocOpen, setTocOpen] = useState(false)
  const mainRef = useRef(null)

  const current = IDS.includes(state.current) ? state.current : 'overview'
  const idx = IDS.indexOf(current)
  const sec = SECTIONS[idx]

  const go = useCallback((id) => {
    setState((s) => ({ ...s, current: id }))
    setTocOpen(false)
    window.scrollTo({ top: 0 })
    setTimeout(() => mainRef.current?.focus({ preventScroll: true }), 0)
  }, [setState])

  // 입력 칸 밖에서 ← → 로 이전·다음
  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
      const t = e.target
      if (t.closest && t.closest('input, textarea, select, [contenteditable="true"], pre')) return
      if (e.key === 'ArrowRight' && idx < IDS.length - 1) { e.preventDefault(); go(IDS[idx + 1]) }
      if (e.key === 'ArrowLeft' && idx > 0) { e.preventDefault(); go(IDS[idx - 1]) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx, go])

  const setUrl = (k, v) => setState((s) => ({ ...s, urls: { ...s.urls, [k]: v } }))

  const groups = useMemo(() => {
    const g = []
    for (const s of SECTIONS) {
      let last = g[g.length - 1]
      if (!last || last.name !== s.group) g.push((last = { name: s.group, items: [] }))
      last.items.push(s)
    }
    return g
  }, [])

  const renderSection = (s) => {
    if (s.step) {
      return (
        <StepView
          step={s.step}
          urls={state.urls}
          setUrl={setUrl}
        />
      )
    }
    switch (s.id) {
      case 'overview': return <Overview go={go} />
      case 'troubles': return <Troubles />
      case 'curriculum': return <Curriculum />
      case 'precheck': return <Precheck />
      case 'guide-deploy': return <GuideDeploy urls={state.urls} setUrl={setUrl} />
      case 'glossary': return <Glossary />
      default: return null
    }
  }

  return (
    <>
      <a className="skip" href="#main">본문으로 건너뛰기</a>
      <header className="top">
        <div className="top__inner">
          <p className="top__eyebrow">중학교 과학 · 초보 교사 바이브코딩 연수</p>
          <h1>오늘의 우주 사진으로 여는 과학 수업</h1>
          <p className="banner">
            강사는 이 안내 페이지를 공유하고, 참가자는 아래 단계별 프롬프트로 자신의 앱을 만듭니다.
          </p>
          <p className="top__meta">
            Google AI Studio → GitHub → Cloudflare Pages · 계정 준비 제외 120~150분(필수 단계 합계 {TOTAL_MINUTES}분, 선택 단계 제외) · 작성 기준일 {CHECKED_ON}
          </p>

          <div className="tools no-print">
            <button type="button" className="btn" onClick={() => window.print()}>전체 인쇄</button>
          </div>
        </div>
      </header>

      <div className="here no-print" aria-live="polite">
        <div className="here__inner">
          <button type="button" className="btn btn--toc" aria-expanded={tocOpen} aria-controls="toc" onClick={() => setTocOpen(!tocOpen)}>
            목차
          </button>
          <span className="here__text">
            현재 위치: <strong>{sec.label}</strong>
            {sec.step && <span className="here__place"> · 작업 위치: {sec.step.place}</span>}
          </span>
        </div>
      </div>

      <div className="layout">
        <nav id="toc" className={'toc no-print' + (tocOpen ? ' toc--open' : '')} aria-label="목차">
          {groups.map((g) => (
            <div key={g.name} className="toc__group">
              <p className="toc__name">{g.name}</p>
              <ul>
                {g.items.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className={'toc__item' + (current === s.id ? ' is-here' : '')}
                      aria-current={current === s.id ? 'page' : undefined}
                      onClick={() => go(s.id)}
                    >
                      <span className="toc__label">{s.label}</span>
                      {s.step && <span className="toc__meta">{s.step.minutes}분</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <main id="main" ref={mainRef} tabIndex={-1} className="main">
          {SECTIONS.map((s) => (
            <section
              key={s.id}
              id={'sec-' + s.id}
              className={'section' + (s.id === current ? '' : ' section--inactive') + (s.step ? ' section--step' : '')}
              aria-hidden={s.id === current ? undefined : true}
            >
              {renderSection(s)}
            </section>
          ))}

          <nav className="pager no-print" aria-label="이전·다음">
            <button type="button" className="btn" disabled={idx === 0} onClick={() => go(IDS[idx - 1])}>
              ← 이전{idx > 0 && <span className="pager__label">{SECTIONS[idx - 1].label}</span>}
            </button>
            <button type="button" className="btn btn--primary" disabled={idx === IDS.length - 1} onClick={() => go(IDS[idx + 1])}>
              다음 →{idx < IDS.length - 1 && <span className="pager__label">{SECTIONS[idx + 1].label}</span>}
            </button>
          </nav>
        </main>
      </div>

      <footer className="foot">
        <p>이 안내는 NASA·Google·GitHub·Cloudflare의 공식 서비스가 아니며 이들 기관을 대표하지 않습니다. 메뉴 이름과 서비스 조건은 바뀔 수 있으니 각 단계의 공식 문서를 함께 확인하세요.</p>
        <p>외부 정보 작성 기준일 {CHECKED_ON}. 이후 변경 사항은 강사가 연수 전에 다시 확인합니다.</p>
      </footer>
    </>
  )
}
