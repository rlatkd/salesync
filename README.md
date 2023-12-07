# frontend

## 테스트 제목


📁 frontend
 ├──── 📁 .github
 │      ├──── 📁 ISSUE_TEMPLATE
 │      │      ├──── 📄 ✅-feature-request.md
 │      │      └──── 📄 🐞-bug-report.md
 │      ├──── 📁 workflows
 │      │      ├──── 📄 deploy.yml
 │      │      └──── 📄 desc.txt
 │      ├──── 📄 CODEOWNERS
 │      └──── 📄 PULL_REQUEST_TEMPLATE
 ├──── 📁 assets
 ├──── 📁 public 
 ├──── 📁 src
 │      ├──── 📁 api
 │      ├──── 📁 components
 │      ├──── 📁 pages
 │      ├──── 📁 popups 
 │      ├──── 📁 styles
 │      ├──── 📁 ui
 │      ├──── 📄 App.js
 │      └──── 📄 index.js
 │──── 📄 .eslintrc.js
 │──── 📄 .gitignore
 │──── 📄 .prettierrc
 │──── 📄 package-lock.json
 └──── 📄 package.json

 - api: 서버와 통신하거나 데이터를 가져오는 API 요청을 수행하는 코드 디렉터리
 - assets: 이미지 등 정적 파일 디렉터리
 - components: Nav, Header 등 사용하는 컴포넌트 디렉터리
    - common: Header 등 공통 컴포넌트
    - {화면이름}: 화면에 사용되는 컴포넌트
 - pages: 서비스 페이지 디렉터리
 - popup: 팝업 디렉터리
 - styles: css 디렉터리
 - ui: 재사용 가능한 ui 디렉터리