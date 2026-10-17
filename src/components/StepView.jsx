import Ext from './Ext.jsx'
import PromptCard from './PromptCard.jsx'
import { AiStudioCommon, ZipRoute, UrlField } from './Sections.jsx'

export default function StepView({ step, urls, setUrl }) {
  const extra = {
    aistudioCommon: <AiStudioCommon />,
    zipRoute: <ZipRoute />,
    appUrl: (
      <div className="card card--soft">
        <h4>내 앱 주소 기록</h4>
        <UrlField
          id="url-app"
          label="내 앱 주소 (참가 교사 → 학생에게 공유)"
          placeholder="https://프로젝트명.pages.dev"
          hint="이 브라우저에만 저장됩니다. 학생에게는 이 정식 공개 주소만 공유하고, 대시보드 주소는 공유하지 않습니다."
          value={urls.app}
          onChange={(v) => setUrl('app', v)}
        />
      </div>
    ),
  }[step.extra]

  return (
    <>
      <p className="step__kicker">{step.num}단계 · 권장 {step.minutes}분</p>
      <h2 className="section__title">{step.title}</h2>

      <div className="block block--goal">
        <h3>목표</h3>
        <p>{step.goal}</p>
      </div>

      <div className="block">
        <h3>지금 열어 둘 곳</h3>
        <p className="place"><span className="badge badge--place">작업 위치</span> {step.place}</p>
        {step.sites.length > 0 && (
          <ul className="sites">
            {step.sites.map((s) => <li key={s.href}><Ext href={s.href}>{s.label}</Ext></li>)}
          </ul>
        )}
      </div>

      {step.terms.length > 0 && (
        <aside className="terms" aria-label="용어 한 줄">
          <h3>용어 한 줄</h3>
          <dl>
            {step.terms.map(([t, d]) => (
              <div key={t}><dt>{t}</dt><dd>{d}</dd></div>
            ))}
          </dl>
        </aside>
      )}

      <div className="block block--do">
        <h3>참가자 실습 — 한 번에 한 행동씩</h3>
        <ol className="actions">
          {step.actions.map((a, i) => <li key={i}>{a}</li>)}
        </ol>
        {extra}
      </div>

      {step.prompts?.map((p) => (
        <div className="block" key={p.id}>
          <h3>복사할 프롬프트</h3>
          <PromptCard id={p.id} title={p.title} text={p.text} />
        </div>
      ))}

      <div className="block">
        <h3>예상 결과</h3>
        <p>{step.expected}</p>
      </div>

      <div className="block">
        <h3>직접 확인할 항목</h3>
        <ul className="checks">
          {step.checks.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>

      <div className="block">
        <h3>오류 해결</h3>
        {step.fixes.map((f, i) => (
          <div className="fix" key={i}>
            <p className="fix__symptom">{f.symptom}</p>
            {f.help && <p>{f.help}</p>}
            {f.prompt && <PromptCard title="수정 요청문" text={f.prompt} compact copyLabel="요청문 복사" />}
          </div>
        ))}
        <p className="muted">다른 증상은 목차의 ‘오류 도움말’을 보세요.</p>
      </div>

      <div className="block block--teacher">
        <h3><span className="badge badge--teacher">강사용 설명</span></h3>
        {step.instructor}
      </div>

    </>
  )
}
