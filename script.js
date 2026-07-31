// 반드시 이 값만 본인의 서버 주소로 변경하세요.
// 포트가 기본값이 아니라면 "example.com:25566"처럼 입력합니다.
const SERVER_ADDRESS = "kcbk.kro.kr";

// Java 서버는 "java", Bedrock 서버는 "bedrock"으로 설정합니다.
const SERVER_EDITION = "java";

// 자동 갱신 간격. mcstatus.io 응답은 자체적으로 캐시될 수 있습니다.
const REFRESH_INTERVAL_MS = 60_000;

const elements = {
  dot: document.querySelector("#status-dot"),
  status: document.querySelector("#status-text"),
  players: document.querySelector("#player-count"),
  message: document.querySelector("#message"),
  updatedAt: document.querySelector("#updated-at"),
  refreshButton: document.querySelector("#refresh-button"),
};

function setState(state, data = {}) {
  elements.dot.className = `status-dot ${state}`;

  if (state === "loading") {
    elements.status.textContent = "확인 중…";
    elements.message.textContent = "서버 정보를 불러오고 있습니다.";
    return;
  }

  if (state === "online") {
    elements.status.textContent = "온라인";
    elements.players.textContent = `${data.onlinePlayers} / ${data.maxPlayers}명`;
    elements.message.textContent = "서버가 정상적으로 운영 중입니다.";
    return;
  }

  if (state === "offline") {
    elements.status.textContent = "오프라인";
    elements.players.textContent = "0명";
    elements.message.textContent = "현재 서버에 연결할 수 없습니다.";
    return;
  }

  elements.status.textContent = "확인 실패";
  elements.players.textContent = "—";
  elements.message.textContent = data.message ?? "잠시 후 다시 시도해 주세요.";
}

function formatTime(timestamp) {
  const date = timestamp ? new Date(timestamp) : new Date();
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

async function fetchServerStatus() {
  if (!SERVER_ADDRESS || SERVER_ADDRESS === "YOUR_SERVER_ADDRESS") {
    setState("error", { message: "script.js에서 서버 주소를 먼저 설정해 주세요." });
    return;
  }

  setState("loading");
  elements.refreshButton.disabled = true;

  const encodedAddress = encodeURIComponent(SERVER_ADDRESS);
  const queryPart = SERVER_EDITION === "java" ? "?query=false&timeout=5" : "?timeout=5";
  const apiUrl = `https://api.mcstatus.io/v2/status/${SERVER_EDITION}/${encodedAddress}${queryPart}`;

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`API 요청 실패 (${response.status})`);
    }

    const data = await response.json();

    if (!data.online) {
      setState("offline");
    } else {
      setState("online", {
        onlinePlayers: data.players?.online ?? 0,
        maxPlayers: data.players?.max ?? "?",
      });
    }

    elements.updatedAt.textContent = `마지막 확인: ${formatTime(data.retrieved_at)}`;
  } catch (error) {
    console.error(error);
    setState("error", { message: "상태 API 요청에 실패했습니다." });
    elements.updatedAt.textContent = `마지막 시도: ${formatTime()}`;
  } finally {
    elements.refreshButton.disabled = false;
  }
}

elements.refreshButton.addEventListener("click", fetchServerStatus);
fetchServerStatus();
setInterval(fetchServerStatus, REFRESH_INTERVAL_MS);
