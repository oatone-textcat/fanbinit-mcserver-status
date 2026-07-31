# Minecraft Server Status Page

GitHub Pages에서 동작하는 단순한 마인크래프트 서버 상태 페이지입니다.
mcstatus.io API를 브라우저에서 직접 호출하며, 화면에는 서버 주소를 표시하지 않습니다.

> 주의: 서버 주소는 `script.js`와 브라우저 개발자 도구의 Network 탭에서 확인할 수 있습니다. 비밀 정보로 취급할 수 없습니다.

## 설정

1. `script.js`를 엽니다.
2. 아래 값을 서버 주소로 변경합니다.

```js
const SERVER_ADDRESS = "play.example.com";
```

기본 포트가 아니라면 포트도 포함합니다.

```js
const SERVER_ADDRESS = "play.example.com:25566";
```

Bedrock 서버라면 다음 값도 변경합니다.

```js
const SERVER_EDITION = "bedrock";
```

## 로컬 테스트

파일을 직접 열어도 대체로 동작하지만, 브라우저 보안 정책 때문에 로컬 웹 서버를 사용하는 편이 안전합니다.

Python이 설치되어 있다면 이 폴더에서 실행합니다.

```bash
python -m http.server 8000
```

그다음 브라우저에서 `http://localhost:8000`을 엽니다.

## GitHub Pages 배포

1. GitHub에서 새 저장소를 만듭니다. 예: `minecraft-server-status`
2. 이 폴더의 파일 네 개를 저장소 루트에 업로드합니다.
3. 서버 주소를 수정한 뒤 커밋합니다.
4. 저장소의 `Settings` → `Pages`로 이동합니다.
5. `Build and deployment`의 Source를 `Deploy from a branch`로 선택합니다.
6. Branch를 `main`, 폴더를 `/(root)`로 선택하고 `Save`를 누릅니다.
7. 배포 후 표시되는 주소로 접속합니다.

일반적인 프로젝트 Pages 주소 형식:

```text
https://GITHUB_ID.github.io/REPOSITORY_NAME/
```

저장소 이름을 `GITHUB_ID.github.io`로 만들면 루트 주소로 사용할 수 있습니다.

```text
https://GITHUB_ID.github.io/
```
