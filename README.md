# f-ai-th

AI & Theology Benchmark 프로젝트 프론트엔드 레포지토리입니다.

## 🛠 Tech Stack
- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling & UI:** Tailwind CSS, Radix UI, Framer Motion

## 🚀 시작하기 (명령어)
비개발자 및 AI 에이전트를 위한 필수 실행 명령어입니다. 프로젝트 폴더 최상단(root)에서 터미널을 열고 아래 명령어를 입력하세요.

### 1. 개발 서버 실행 (화면 띄우기)
```bash
npm run dev
```
> 터미널에 나타나는 `http://localhost:5173` 주소를 누르면 브라우저에 화면이 나타납니다. AI가 코드를 수정하면 새로고침 없이 화면이 실시간으로 업데이트됩니다.

### 2. 배포용 빌드 생성
```bash
npm run build
```
> GitHub Pages 등에 웹사이트를 배포할 때, 사용자에게 서비스하기 위한 최적화된 파일을 `dist/` 폴더 안에 생성합니다.

---

## 🤖 AI 에이전트 스킬 연동
코드를 수정하거나 새로운 기능을 추가할 때, AI 에이전트(Cursor, Claude 등)가 프로젝트의 구조를 깨지 않고 개발하게 하려면 [`SKILL_FRONTEND.md`](./SKILL_FRONTEND.md) 파일의 내용을 복사해서 시스템 프롬프트(지시사항)에 넣어주세요.
