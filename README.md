# 오늘의 우주 사진으로 여는 과학 수업 — 연수 강의안 페이지

중학교 과학교사(코딩 경험 없음) 대상 바이브코딩 연수의 **안내 웹페이지**입니다.
참가자는 이 페이지의 단계별 프롬프트(01~07)를 Google AI Studio에 순서대로 넣어 각자 ‘우주 사진 탐구실’ 앱을 만들고, GitHub에 저장해 Cloudflare Pages에 배포합니다.

- 이 페이지 = 강사가 공유하는 연수 안내서(React + Vite 정적 사이트)
- 참가자 앱 = 참가자가 따로 만드는 앱(이 저장소에 들어 있지 않음)
- 이 페이지는 NASA API를 호출하거나 Gemini를 실행하지 않습니다. 외부 사이트는 링크로만 엽니다.

## 기능

- 0~10단계 + 선택 단계 7-1(getdesign.md의 DESIGN.md로 디자인 일괄 변경) + 프롬프트 01~07 전문, 단계별 오류 복구 요청문, 오류 도움말 11가지
- 각 단계: 목표 → 열어 둘 곳 → 용어 한 줄 → 참가자 실습 → 복사할 프롬프트 → 예상 결과 → 직접 확인 → 오류 해결 → 강사용 설명
- 프롬프트 카드: 전체 복사, 글자 수, 펼치기/접기, 수동 복사(자동 복사 실패 시 자동으로 열림)
- 마지막으로 본 단계와 기록한 주소는 이 브라우저 localStorage에만 저장(저장이 막혀도 페이지 사용 가능)
- 전체 인쇄(접힌 단계·긴 프롬프트까지 출력, 메뉴·버튼 숨김)
- 모바일 한 열 배치, 키보드 ←/→ 이전·다음, 본문 건너뛰기 링크
- 교육과정 연결·수업 설계, 용어 사전, 강사용 사전 점검, 강사용 준비(이 페이지 배포) 접기 영역

## 로컬 실행

```bash
npm install
npm run dev
```

빌드: `npm run build` → 결과물은 `dist/`

## Cloudflare Pages 배포(이 강의안 페이지)

1. 이 폴더를 참가자 앱과 **다른 이름**의 GitHub 저장소로 올립니다(예: `space-photo-classroom-workshop-guide`). `node_modules`, `dist`는 올리지 않습니다(.gitignore에 포함).
2. Cloudflare 대시보드 → Workers & Pages → Pages → Git 저장소 연결.
3. Build command `npm run build` · Build output directory `dist` · Root directory 비움 · 환경변수 없음.
4. 루트 주소에 배포하므로 `vite.config.js`의 base는 기본값(`/`)입니다.

## 내용 수정

- 프롬프트 전문: `src/data/prompts.js`
- 단계 내용: `src/data/steps.jsx`
- 오류 도움말: `src/data/troubles.js`
- 외부 링크·작성 기준일: `src/data/links.js`
- 개요·교육과정·강사용 섹션: `src/components/Sections.jsx`

외부 서비스 정보의 작성 기준일은 2026-10-16입니다. 메뉴 이름·무료 한도·NASA API 형식은 바뀔 수 있으니 연수 전에 강사가 다시 확인하세요.
이 안내는 NASA·Google·GitHub·Cloudflare의 공식 자료가 아닙니다.
