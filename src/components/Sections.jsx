import { useState } from 'react'
import Ext from './Ext.jsx'
import PromptCard from './PromptCard.jsx'
import { L, CHECKED_ON } from '../data/links.js'
import { STEPS, TOTAL_MINUTES } from '../data/steps.jsx'
import { TROUBLES } from '../data/troubles.js'

/* ---------- 개요 ---------- */
export function Overview({ go }) {
  return (
    <>
      <h2 className="section__title">연수 개요</h2>
      <p className="lead">
        중학교 과학교사가 코딩 경험 없이, NASA의 공개 APOD(Astronomy Picture of the Day) 자료를 불러오는
        ‘우주 사진 탐구실’ 앱을 직접 만들고 인터넷에 공개합니다. 자료를 구경하는 앱이 아니라
        <strong> 관찰 → 추론 → 원문 확인 → 설명 수정</strong>의 수업 흐름을 돕는 앱입니다.
      </p>

      <div className="two-col">
        <div className="card">
          <h3>이 페이지 = 연수 안내서</h3>
          <p>강사가 공유하는 읽기 자료입니다. 이 페이지는 NASA API를 부르거나 AI를 실행하지 않습니다. 참가자는 여기의 프롬프트를 복사합니다.</p>
        </div>
        <div className="card">
          <h3>참가자가 만드는 것 = 우주 사진 탐구실 앱</h3>
          <p>참가자 각자가 Google AI Studio에서 만들고, GitHub에 저장해, Cloudflare Pages에 공개하는 별도의 앱입니다.</p>
        </div>
      </div>

      <h3>기본 경로</h3>
      <ol className="route" aria-label="제작 경로">
        <li><strong>Google AI Studio</strong><span>프롬프트로 앱 만들기</span></li>
        <li><strong>GitHub</strong><span>원본 코드 저장</span></li>
        <li><strong>Cloudflare Pages</strong><span>공개 주소로 배포</span></li>
      </ol>
      <p className="note">강의안 페이지와 참가자 앱은 <strong>둘 다 Cloudflare Pages</strong>에 올리지만, 서로 <strong>다른 저장소·다른 프로젝트·다른 주소</strong>입니다.</p>

      <h3>대상과 시간</h3>
      <ul>
        <li>대상: 중학교 과학교사, 코딩 경험 없음</li>
        <li>권장 시간: 계정 준비 제외 120~150분(필수 단계 합계 {TOTAL_MINUTES}분, 선택 단계 제외). AI 생성 속도·수정 횟수·네트워크 상태에 따라 달라집니다.</li>
        <li>필요한 것: Google 계정, GitHub 계정, Cloudflare 계정, 인터넷이 되는 PC(휴대폰은 확인용)</li>
      </ul>

      <table className="timetable">
        <caption>단계별 권장 시간</caption>
        <thead><tr><th scope="col">단계</th><th scope="col">내용</th><th scope="col">시간</th></tr></thead>
        <tbody>
          {STEPS.map((s) => (
            <tr key={s.id}>
              <td>{s.num}단계</td>
              <td><button type="button" className="linkbtn no-print-btn" onClick={() => go(s.id)}>{s.title}</button></td>
              <td>{s.minutes}분{s.optional && ' · 선택'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>꼭 알아 둘 다섯 가지</h3>
      <ul className="facts">
        <li><strong>‘오늘의 사진’은 오늘 촬영한 사진이 아닐 수 있습니다.</strong> APOD 게시일과 천체 촬영일은 다릅니다. 앱은 응답의 실제 게시 날짜를 보여 줍니다.</li>
        <li><strong>NASA의 새 공개 API를 씁니다.</strong> <Ext href={L.nasaApi}>science.nasa.gov/wp-json/wp/v2/apod-basic/</Ext> — API 키가 필요 없습니다. 예전 api.nasa.gov/planetary/apod와 DEMO_KEY 예제는 쓰지 않습니다(<Ext href={L.nasaRepo}>NASA 변경 안내</Ext>).</li>
        <li><strong>생성형 AI(Gemini)를 앱에 넣지 않습니다.</strong> AI Studio는 앱을 ‘만드는’ 도구로만 씁니다. 자동 번역·자동 퀴즈는 없습니다. 한국어 질문은 고정 콘텐츠, 한국어 해설은 교사가 작성·검토합니다.</li>
        <li><strong>저작자·권리 표시를 지키세요.</strong> NASA에 게시된 모든 사진이 자유 저작물은 아닙니다. 자료마다 credit·copyright를 남깁니다.</li>
        <li><strong>‘무료’의 뜻.</strong> 공개 서비스·호스팅의 현재 조건과 한도 안에서 무료라는 뜻입니다. 무제한·영구 제공을 보장하지 않습니다(<Ext href={L.cfLimits}>Cloudflare Pages 한도</Ext>).</li>
      </ul>

      <h3>완성 앱의 기능</h3>
      <ol className="features">
        <li>최신 공개 APOD 자료 불러오기</li>
        <li>날짜를 골라 과거 자료 열기</li>
        <li>제목·설명을 숨긴 관찰 모드로 시작</li>
        <li>제목·설명 단계적 공개</li>
        <li>사진과 영상·기타 미디어 구분</li>
        <li>원문·원출처·제작자·권리 정보 확인</li>
        <li>‘관찰한 사실 / 내 추론 / 설명에서 확인한 점 / 더 궁금한 점’ 기록</li>
        <li>두 자료 나란히 비교</li>
        <li>즐겨찾기·탐구 기록을 이 기기에 저장하고 인쇄</li>
        <li>교사 검토가 끝난 수업 자료 묶음을 정적 설정으로 공유</li>
        <li>GitHub 저장 · Cloudflare Pages 배포 · 수정 재배포 경험</li>
      </ol>

      <figure className="mock" aria-label="설명용 예시 화면">
        <figcaption><span className="badge badge--warn">설명용 예시</span> 실제 서비스 화면이나 실제 NASA 자료가 아닙니다. 1단계 직후 앱의 대략적인 배치입니다.</figcaption>
        <div className="mock__app">
          <div className="mock__bar">우주 사진 탐구실 <span className="mock__tag">준비 중</span></div>
          <div className="mock__media">아직 자료를 연결하지 않았습니다</div>
          <div className="mock__row"><span className="mock__input">YYYY-MM-DD</span><span className="mock__btn">자료 불러오기 · 준비 중</span></div>
          <div className="mock__grid">
            <span>관찰한 사실</span><span>내 추론</span><span>설명에서 확인한 점</span><span>더 궁금한 점</span>
          </div>
        </div>
      </figure>

      <h3>저장 · 다운로드 · 배포는 서로 다른 행동입니다</h3>
      <dl className="defs">
        <dt>브라우저 저장</dt><dd>이 브라우저 안에만 남습니다. 다른 기기·다른 사람에게 가지 않습니다.</dd>
        <dt>다운로드</dt><dd>파일을 내 컴퓨터 폴더로 받는 것입니다(예: AI Studio의 ZIP 내보내기).</dd>
        <dt>배포</dt><dd>GitHub에 저장된 코드를 Cloudflare Pages가 빌드해 누구나 여는 인터넷 주소로 공개하는 것입니다.</dd>
      </dl>

      <h3>이 안내 페이지 사용법</h3>
      <ul>
        <li>왼쪽(휴대폰은 위쪽 ‘목차’) 목차에서 단계를 고르거나, 아래 ‘이전·다음’ 버튼을 누릅니다. 키보드 <kbd>←</kbd> <kbd>→</kbd>로도 이동합니다(입력 칸 밖에서).</li>
        <li>각 단계의 ‘직접 확인할 항목’은 미리보기·공개 주소에서 여러분이 직접 확인합니다. 이 페이지는 GitHub·Cloudflare 계정 상태를 읽지 않습니다.</li>
        <li>마지막으로 본 단계와 기록한 주소는 이 브라우저에만 저장됩니다. 저장이 막힌 환경에서도 페이지는 그대로 쓸 수 있습니다.</li>
        <li>‘전체 인쇄’는 접힌 단계와 긴 프롬프트까지 모두 출력합니다.</li>
      </ul>
      <p className="muted">페이지 구성 참고: <Ext href={L.highmap}>highmap.labbitory.com</Ext> · 내용 작성 기준일 {CHECKED_ON}</p>
    </>
  )
}

/* ---------- 단계 안의 추가 블록 ---------- */
export function AiStudioCommon() {
  return (
    <div className="card card--soft">
      <h4>AI Studio 공통 시작 안내</h4>
      <ol>
        <li><Ext href={L.aiStudio}>aistudio.google.com</Ext>에 접속해 본인 계정으로 로그인합니다.</li>
        <li>Build(앱 만들기) 기능에서 새 프로젝트를 엽니다. 버튼 위치는 화면 개편으로 바뀔 수 있으니 <Ext href={L.aiStudioDoc}>공식 Build mode 안내</Ext>를 함께 봅니다.</li>
        <li>프롬프트 01부터 순서대로 입력합니다. <strong>매번 새 앱을 만들지 않고 같은 프로젝트에서 이어 갑니다.</strong></li>
        <li>미리보기에서 각 단계의 성공 기준을 직접 시험한 뒤 다음 프롬프트를 입력합니다.</li>
        <li>기본 앱은 React + Vite 정적 앱으로 지정합니다. AI Studio가 Node 서버나 Gemini 기능을 추가했다면 기본판에 불필요한 의존성을 제거해 달라고 요청합니다.</li>
        <li>AI Studio의 Publish/Deploy 기능이 이 연수의 호스팅(Cloudflare Pages)으로 자동 연결되지는 않습니다. 코드를 GitHub에 저장한 다음 Cloudflare Pages에 연결합니다.</li>
        <li>설정(Settings)의 GitHub 연결·Push/Pull 기능은 현재 공식 안내를 확인하고 사용합니다. 동기화 뒤에는 실제 GitHub의 최신 커밋과 파일을 확인합니다.</li>
        <li>연동이 안 되면 ZIP 내보내기 → 압축 풀기 → GitHub 새 저장소 → 원본 파일·폴더 업로드 → 커밋으로 이어 갑니다(8단계 대체 경로). ZIP 파일 자체만 올리지 않습니다. package.json이 저장소 최상위인지, 숨김 폴더·배포 설정 파일이 빠지지 않았는지 확인합니다.</li>
        <li>AI Studio를 쓰는 이유는 제작 경험을 일관되게 하기 위해서입니다. 완성 앱이 Gemini API를 쓴다는 뜻이 아닙니다.</li>
      </ol>
    </div>
  )
}

export function ZipRoute() {
  return (
    <div className="card card--soft">
      <h4>대체 경로: GitHub 연동이 안 될 때(ZIP 업로드)</h4>
      <ol>
        <li>AI Studio에서 프로젝트를 ZIP으로 내보냅니다(다운로드).</li>
        <li>내 컴퓨터에서 ZIP의 압축을 풉니다.</li>
        <li><Ext href={L.githubNew}>GitHub 새 저장소</Ext>를 space-photo-classroom 이름으로 만듭니다.</li>
        <li>저장소 화면에서 Add file → Upload files를 누릅니다(<Ext href={L.githubUploadDoc}>GitHub 공식 안내</Ext>).</li>
        <li>압축을 푼 폴더 <strong>안의</strong> 파일과 폴더(package.json, index.html, src 등)를 끌어다 놓습니다. <strong>ZIP 파일 하나만 올리지 않습니다.</strong></li>
        <li>node_modules, dist 폴더가 있으면 올리지 않습니다. 숨김 파일(.gitignore 등)이 탐색기에서 안 보이면 ‘숨긴 항목 표시’를 켭니다.</li>
        <li>Commit changes를 누릅니다.</li>
        <li>저장소 첫 화면(루트)에 package.json이 바로 보이는지 확인합니다.</li>
      </ol>
      <p className="note">이 경로를 쓰면 이후 수정할 때도 ZIP을 다시 받아 같은 방법으로 덮어 올리고 커밋해야 Cloudflare가 재배포합니다.</p>
    </div>
  )
}

export function UrlField({ label, hint, value, onChange, id, placeholder }) {
  return (
    <div className="urlfield">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="url"
        inputMode="url"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value.trim())}
      />
      {hint && <p className="muted">{hint}</p>}
      {value && !/^https:\/\/[^\s/]+\.pages\.dev\/?$/.test(value) && (
        <p className="warn">정식 공개 주소는 보통 https://프로젝트명.pages.dev 모양입니다. 대시보드 주소(dash.cloudflare.com)나 미리보기 주소가 아닌지 확인하세요.</p>
      )}
      <p className="print-only">{label}: {value || '______________________________'}</p>
    </div>
  )
}

/* ---------- 오류 도움말 ---------- */
export function Troubles() {
  return (
    <>
      <h2 className="section__title">오류 도움말</h2>
      <p className="lead">증상을 찾고, ‘확인할 점’을 먼저 읽은 뒤, 요청문을 복사해 AI Studio의 같은 프로젝트에 붙여 넣습니다. 오류 내용이 필요한 요청문은 대괄호 [ ] 부분을 실제 오류로 바꿔 넣으세요.</p>
      <div className="troubles">
        {TROUBLES.map((t) => (
          <article key={t.id} className="trouble" id={t.id}>
            <h3>{t.symptom}</h3>
            <p><strong>확인할 점:</strong> {t.check}</p>
            <PromptCard title="수정 요청문" text={t.prompt} compact copyLabel="요청문 복사" />
          </article>
        ))}
      </div>
    </>
  )
}

/* ---------- 교육과정·수업 설계 ---------- */
export function Curriculum() {
  return (
    <>
      <h2 className="section__title">교육과정과 수업 설계</h2>
      <p className="lead">
        아래는 2022 개정 중학교 과학 성취기준을 요약한 것입니다(원문: <Ext href={L.moe}>교육부 고시</Ext>).
        <strong> 교사가 특정 자료를 골랐을 때 연결할 수 있는 기준</strong>이며, 임의의 오늘 사진이 자동으로 이 기준을 충족하지 않습니다.
      </p>
      <table className="std">
        <thead><tr><th scope="col">코드</th><th scope="col">요약</th><th scope="col">사용할 때 주의</th></tr></thead>
        <tbody>
          <tr><td>[9과07-01]</td><td>태양계 천체의 특징과 지구형·목성형 행성 비교</td><td>사진 속 크기로 행성 크기를 비교하지 않습니다. 원문의 관측 정보로 근거를 찾습니다.</td></tr>
          <tr><td>[9과07-02]</td><td>태양 표면·대기 현상과 태양 활동의 영향</td><td>원문에서 확인되는 현상과 사진만으로 알 수 없는 것을 구분합니다.</td></tr>
          <tr><td>[9과07-04]</td><td>달의 위상변화와 일식·월식</td><td>사진 한 장으로 원리를 충분히 설명할 수 없습니다. 모형·관측 활동과 결합합니다.</td></tr>
          <tr><td>[9과15-02]</td><td>우리은하와 성운·성단의 특징 비교</td><td>외부은하 사진은 비교 자료입니다. 우리은하를 밖에서 찍은 실제 사진처럼 설명하지 않습니다.</td></tr>
          <tr><td>[9과15-04]</td><td>우주탐사의 의의와 과학의 유용성 조사</td><td>어떤 관측 기술·탐사가 정보를 주었는지 원문에서 찾습니다.</td></tr>
        </tbody>
      </table>
      <p className="note"><strong>[9과15-01] 별의 색과 온도</strong>: 일반적인 합성 천체사진의 픽셀 색만으로 별의 온도를 판정하게 하지 않습니다. 관측 파장과 색 처리에 대한 원자료 설명이 있어야 합니다.</p>

      <h3>수준별 활동 <span className="badge">자체 설계 예시</span></h3>
      <p className="muted">공식 성취수준(A~E) 원문이나 자동 성취도 판정이 아닙니다.</p>
      <dl className="defs">
        <dt>기초 관찰</dt><dd>제목을 보기 전에 형태·밝기·무늬 등 눈에 보이는 특징을 기록합니다.</dd>
        <dt>설명</dt><dd>원자료 설명을 읽고 관찰·추론·출처에서 확인한 정보를 구분합니다.</dd>
        <dt>적용</dt><dd>교사가 선정한 두 자료를 같은 기준으로 비교하고, 설명의 근거와 자료의 한계를 제시합니다.</dd>
      </dl>

      <h3>수업에서 지킬 점</h3>
      <ul>
        <li>APOD 게시일과 천체 촬영일은 다를 수 있습니다. ‘오늘의 사진’은 오늘 촬영했다는 뜻이 아닙니다.</li>
        <li>사진에서 천체의 실제 크기·거리·온도를 직접 읽을 수 있다고 가르치지 않습니다.</li>
        <li>배율·시야·파장이 다른 사진을 크기 비교 실험처럼 쓰지 않습니다.</li>
        <li>오늘 자료가 수업 목표와 맞지 않으면 교사가 미리 고른 자료를 사용합니다.</li>
      </ul>

      <h3>강사용 예시 질문</h3>
      <p className="muted">질문만 제시합니다. 실제 사진을 확인하지 않은 정답 해설이나 ‘검토 완료’ 예시는 만들지 않습니다.</p>
      <ul>
        <li>태양 자료: 원문에서 확인되는 표면 또는 대기 현상은 무엇이며, 사진 관찰만으로는 무엇을 알 수 없는가?</li>
        <li>달 자료: 관찰한 밝은 부분을 설명하려면 태양·지구·달의 어떤 모형이 필요한가?</li>
        <li>성운과 성단: 형태의 차이와 원문에서 확인한 구성 물질을 구분하여 비교할 수 있는가?</li>
        <li>탐사 자료: 어떤 관측 기술이 새로운 정보를 제공했는가?</li>
      </ul>

      <h3>앱의 고정 기록 질문(프롬프트 04에 포함)</h3>
      <ol>
        <li>무엇이 실제로 보이나요?</li>
        <li>어떤 부분은 추측인가요?</li>
        <li>내 설명을 뒷받침하는 근거는 무엇인가요?</li>
        <li>원문을 읽고 바꾼 생각은 무엇인가요?</li>
      </ol>
    </>
  )
}

/* ---------- 강사용 사전 점검 ---------- */
export function Precheck() {
  return (
    <>
      <h2 className="section__title">강사용 사전 점검</h2>
      <h3>연수 전에 강사가 직접 확인할 것</h3>
      <ul className="checklist-plain">
        <li>실제 연수 장소(학교) 네트워크에서 <Ext href={L.nasaLatest}>최신 1개 API</Ext>와 이미지 주소(hdurl)가 열리는지 확인합니다.</li>
        <li>사진인 날, 영상인 날, 자료가 없는 날짜를 각각 시험합니다.</li>
        <li>API 문서를 읽은 것과, 실제 브라우저·배포 환경(pages.dev)에서 연결을 시험한 것을 구분해 기록합니다.</li>
        <li>교육과정에 맞는 자료 3~5개를 미리 고르고, 원문·촬영 맥락·한국어 설명·출처·권리 정보를 확인합니다. 오늘 자료가 수업 목표와 맞지 않으면 선정 자료를 씁니다.</li>
        <li>AI Studio·GitHub·Cloudflare의 메뉴 이름과 위치를 연수 직전에 다시 봅니다. 이 안내는 실제 화면 스크린샷을 싣지 않았으며, 메뉴 이름은 기능 목적과 공식 문서로 안내합니다.</li>
      </ul>

      <h3>예비 자료(네트워크가 막혔을 때)</h3>
      <p>허용된 실제 자료와 메타데이터(날짜·제목·원문 주소·credit·copyright)를 미리 준비합니다. 앱에 저장 자료 모드를 넣는다면 화면에 <strong>‘연습용 저장 자료’</strong>라고 표시합니다. 이 안내 페이지에는 예비 자료 파일이 들어 있지 않으며, 다운로드 버튼도 없습니다.</p>

      <h3>NASA 서비스 이전과 응답 변화</h3>
      <ul>
        <li>APOD 자료는 새 주소 <Ext href={L.nasaApi}>science.nasa.gov/wp-json/wp/v2/apod-basic/</Ext>에서 제공됩니다. 변경 안내는 <Ext href={L.nasaRepo}>nasa/apod-api 저장소</Ext>와 그곳에서 연결한 <Ext href={L.nasaGuide}>APOD Feed and API 사용 안내</Ext>를 확인합니다.</li>
        <li>새 형식에서는 url/permalink가 게시물 페이지 주소일 수 있고, 이미지에는 hdurl을 씁니다. explanation·credit·copyright에 HTML이 섞여 있습니다. basic_html(게시물 HTML 전체)은 앱에 그대로 넣지 않습니다.</li>
        <li>최신 목록 주소는 배열, 날짜 주소는 객체로 옵니다.</li>
        <li>참가자 본문에는 실제로 쓸 한 경로(새 API)만 안내합니다. 옛 경로 비교는 강사 설명으로만 합니다.</li>
        <li>2026년 12월 이후 연수에서는 옛 저장소의 유지 상태와 새 공식 안내를 다시 확인합니다. 저장소 보관(archive) 예정 공지를 옛 API가 특정일에 반드시 종료된다는 보장으로 확대 해석하지 않습니다.</li>
      </ul>

      <div className="card card--soft">
        <h4>제작자가 {CHECKED_ON}에 확인한 것과 확인하지 못한 것</h4>
        <p><strong>확인함(제작용 PC에서 명령줄로 요청):</strong></p>
        <ul>
          <li>최신 1개 주소(?per_page=1)가 HTTP 200과 <strong>배열</strong>을 돌려줌. 그날 최신 항목은 date 2026-10-16, media_type <strong>video</strong>, hdurl은 <strong>빈 값</strong>, url과 permalink는 게시물 페이지 주소였음 — “url을 이미지로 쓰면 깨진다”는 실제 예입니다.</li>
          <li>날짜 주소 /260916이 HTTP 200과 <strong>객체</strong>를 돌려줌(media_type image, 은하 M64 자료). 외부은하 사진이므로 [9과15-02]에서는 비교 자료로만 씁니다.</li>
          <li>자료 시작일 이전 날짜(/950101)는 HTTP 404.</li>
          <li>explanation·credit에 a, strong 등 HTML 태그가 들어 있음.</li>
          <li>임의의 Origin 헤더를 붙인 요청에 Access-Control-Allow-Origin 응답 헤더가 돌아옴(브라우저 직접 호출 가능성을 시사하지만, 실제 브라우저·학교 네트워크 시험은 아님).</li>
        </ul>
        <p><strong>확인하지 못함(강사가 직접 확인):</strong> 학교 네트워크에서의 접속, 실제 pages.dev 주소에서 브라우저 요청, 이미지 호스트 접속, AI Studio·GitHub·Cloudflare의 현재 메뉴 화면, 429 발생 조건.</p>
      </div>

      <p className="note">기본 과정에 Gemini를 추가하지 않습니다. 질문·해설 자동 생성은 별도 연수로 분리합니다.</p>
    </>
  )
}

/* ---------- 강사용 준비: 강의안 페이지 자체 배포 (접기 영역) ---------- */
export function GuideDeploy({ urls, setUrl }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <h2 className="section__title">강사용 준비: 이 강의안 페이지 배포하기</h2>
      <p className="lead">참가자는 이 부분을 하지 않습니다. 강사가 연수 전에 이 안내 페이지를 공개 주소로 올리는 방법입니다.</p>
      <button type="button" className="btn no-print" aria-expanded={open} aria-controls="guide-deploy-body" onClick={() => setOpen(!open)}>
        {open ? '강사용 준비 접기' : '강사용 준비 펼치기'}
      </button>
      <div id="guide-deploy-body" className={'fold' + (open ? '' : ' fold--closed')}>
        <h3>1. 저장소 만들기</h3>
        <ul>
          <li>강의안 저장소는 참가자 앱 저장소와 <strong>다른 이름</strong>으로 만듭니다. 예: <code>space-photo-classroom-workshop-guide</code></li>
          <li>이 프로젝트 폴더의 파일(package.json, package-lock.json, index.html, vite.config.js, src, README.md, .gitignore)을 저장소 최상위에 올립니다. node_modules와 dist는 올리지 않습니다.</li>
        </ul>
        <h3>2. Cloudflare Pages 연결</h3>
        <ul>
          <li><Ext href={L.cfDash}>Cloudflare 대시보드</Ext> → Workers & Pages → Pages에서 Git 저장소 연결(<Ext href={L.cfReact}>공식 안내</Ext>, <Ext href={L.cfGit}>Git 연동 안내</Ext>).</li>
          <li>Build command: <code>npm run build</code> · Build output directory: <code>dist</code> · Root directory: 비워 둠(package.json이 최상위) · 환경변수: 없음</li>
          <li>이 페이지는 Cloudflare Pages 루트 주소에 배포하므로 vite의 base 설정은 기본값(/)입니다. GitHub Pages 전용 base 경로를 넣지 않습니다.</li>
        </ul>
        <h3>3. 로컬에서 미리 보기(선택)</h3>
        <pre className="code">npm install{'\n'}npm run dev{'\n'}npm run build</pre>
        <h3>4. 주소 기록 — 누구에게 무엇을 공유하나요?</h3>
        <UrlField
          id="url-guide"
          label="강의안 페이지 주소 (강사 → 연수 참가자에게 공유)"
          placeholder="https://space-photo-classroom-workshop-guide.pages.dev"
          value={urls.guide}
          onChange={(v) => setUrl('guide', v)}
        />
        <p className="note">참가자 앱 주소는 각 참가자가 9단계에서 기록합니다. 참가 교사는 <strong>자기 앱 주소</strong>를 학생에게 공유하고, 강의안 주소는 학생에게 공유하지 않습니다.</p>
        <h3>5. 무료 요금제</h3>
        <p>유료 도메인을 살 필요가 없습니다. 무료 요금제의 현재 제공 조건과 한도는 <Ext href={L.cfLimits}>Cloudflare Pages 한도 문서</Ext>에서 확인합니다. 무제한·영구 보장이 아닙니다.</p>
      </div>
    </>
  )
}

/* ---------- 용어 사전 ---------- */
export function Glossary() {
  const extra = [
    ['엔드포인트', 'API에서 특정 자료를 달라고 요청하는 구체적인 주소 하나입니다(예: 최신 1개 주소, 날짜 주소).'],
    ['정규화(어댑터)', 'API마다 다른 응답 모양을 앱이 쓰기 좋은 한 가지 모양으로 바꾸는 코드입니다. API가 바뀌면 이 부분만 고칩니다.'],
    ['basic_html', '새 API 응답에 들어 있는 게시물 HTML 전체입니다. 앱에 그대로 넣지 않습니다.'],
    ['HTML 텍스트 변환', '설명 속 <a>, <strong> 같은 태그를 실행하지 않고 글자만 안전하게 보여 주는 처리입니다.'],
    ['iframe', '웹페이지 안에 다른 웹페이지를 끼워 넣는 틀입니다. 출처를 모르는 iframe 코드는 실행하지 않습니다.'],
  ]
  const all = [...STEPS.flatMap((s) => s.terms.map((t) => [...t, s.num])), ...extra.map((t) => [...t, null])]
  return (
    <>
      <h2 className="section__title">용어 사전</h2>
      <p className="lead">각 단계에 처음 나오는 용어를 쉬운 한 문장으로 모았습니다.</p>
      <dl className="defs defs--glossary">
        {all.map(([term, def, num]) => (
          <div key={term} className="defs__row">
            <dt>{term}{num !== null && <span className="muted"> · {num}단계</span>}</dt>
            <dd>{def}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}
