# 마이페이지 연동 가이드

> 이 문서는 프로토타입을 실제 서비스에 붙일 때 참고하는 연동 명세입니다.  
> 현재 모든 데이터는 `MyPageContainer.jsx`의 **목 데이터(MOCK)**를 사용 중입니다.  
> 연동 시 아래 항목들을 순서대로 교체하세요.

---

## 1. 컴포넌트 진입점

마이페이지 전체는 단일 컴포넌트에서 시작합니다.

```jsx
// 라우터에서 /mypage 경로에 등록
import MyPageContainer from './components/mypage/MyPageContainer'

<Route path="/mypage" element={<MyPageContainer />} />
```

내부 라우팅 없음. 탭 전환은 컴포넌트 내부 state로 처리합니다.

---

## 2. 교체해야 할 목 데이터 위치

### 2-1. 유저 정보 — `MyPageContainer.jsx`

```js
// 현재 (목 데이터)
const MOCK_USER = {
  name: '김청년',
  email: 'youth@example.com',
  phone: '010-1234-5678',
  joinDate: '2025-03-15',
  lastLogin: '2026-06-15',
  joinedPolicies: [ ... ],
}

// 교체 후 (API 호출)
const [user, setUser] = useState(null)

useEffect(() => {
  fetch('/api/user/me', { headers: { Authorization: `Bearer ${token}` } })
    .then(r => r.json())
    .then(setUser)
}, [])
```

**User 객체 스펙:**

| 필드 | 타입 | 설명 |
|------|------|------|
| `name` | `string` | 이름 |
| `email` | `string` | 이메일 (수정 불가) |
| `phone` | `string` | 전화번호 |
| `joinDate` | `string` | 가입일 `YYYY-MM-DD` |
| `lastLogin` | `string` | 최근 로그인일 `YYYY-MM-DD` |
| `joinedPolicies` | `PolicyApplication[]` | 신청 내역 (아래 참고) |

**PolicyApplication 객체:**

| 필드 | 타입 | 값 |
|------|------|----|
| `id` | `number` | 고유 ID |
| `title` | `string` | 정책명 |
| `category` | `string` | `'job'` `'house'` `'money'` `'edu'` `'health'` |
| `date` | `string` | 신청일 `YYYY-MM-DD` |
| `status` | `string` | `'신청완료'` `'심사중'` `'결과확인'` `'지원완료'` |

---

### 2-2. 맞춤 조건 — `MyPageContainer.jsx`

```js
// 현재 (초기 빈 값)
const INITIAL_PREFS = {
  sido: '', sigungu: '', age: '',
  maritalStatus: '', incomeMin: '', incomeMax: '',
  education: '', employmentStatus: '',
  majorFields: [], specialFields: [], keywords: [],
}

// 교체 후 (API에서 저장된 조건 불러오기)
const [prefs, setPrefs] = useState(INITIAL_PREFS)

useEffect(() => {
  fetch('/api/user/prefs', { headers: { Authorization: `Bearer ${token}` } })
    .then(r => r.json())
    .then(data => data && setPrefs(data))
}, [])
```

**Prefs 객체 스펙:**

| 필드 | 타입 | 비고 |
|------|------|------|
| `sido` | `string` | 시/도명 (예: `'서울특별시'`) |
| `sigungu` | `string` | 시/군/구명 |
| `age` | `string` | 만 나이 |
| `maritalStatus` | `string` | `'미혼'` `'기혼'` `'이혼'` `'사별'` |
| `incomeMin` | `string` | 연 소득 최소 (만원) |
| `incomeMax` | `string` | 연 소득 최대 (만원) |
| `education` | `string` | 학력 (10개 옵션 중 1개) |
| `employmentStatus` | `string` | 취업 상태 (10개 옵션 중 1개) |
| `majorFields` | `string[]` | 전공 분야 ID 배열 (복수) |
| `specialFields` | `string[]` | 특화 분야 ID 배열 (복수) |
| `keywords` | `string[]` | 선택 키워드 배열 |

<details>
<summary>education 허용 값 목록</summary>

`'중졸이하'` `'고교재학'` `'고교졸업'` `'전문대재학'` `'전문대졸업'`  
`'대학재학'` `'대학졸업'` `'대학원재학'` `'대학원졸업'` `'기타'`
</details>

<details>
<summary>employmentStatus 허용 값 목록</summary>

`'제한없음'` `'재직자'` `'자영업자'` `'미취업자'` `'프리랜서'`  
`'일용근로자'` `'(예비)창업자'` `'단기근로자'` `'영농종사자'` `'기타'`
</details>

<details>
<summary>majorFields ID 목록</summary>

`'engineering'` `'humanities'` `'arts'` `'medical'` `'education'`  
`'science'` `'business'` `'law'` `'agriculture'` `'architecture'`
</details>

<details>
<summary>specialFields ID 목록</summary>

`'no_limit'` `'basic_welfare'` `'near_poverty'` `'disability'` `'single_parent'`  
`'female'` `'sme'` `'local_talent'` `'military'` `'farmer'`  
`'multicultural'` `'defector'` `'career_break'` `'homeless'` `'single_hh'`  
`'startup'` `'farm_return'` `'low_credit'` `'veteran'` `'foreign'` `'etc'`
</details>

---

### 2-3. 맞춤 정책 미리보기 — `PolicyPreviewSection.jsx`

```js
// 현재: MOCK_POLICIES 하드코딩
// 교체 후: refreshKey가 바뀔 때마다 API 호출

useEffect(() => {
  if (refreshKey === 0) return
  setLoading(true)
  fetch(`/api/policies/recommended`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(currentPrefs),   // prefs를 prop으로 받아야 함
  })
    .then(r => r.json())
    .then(data => { setPolicies(data); setLoading(false) })
}, [refreshKey])
```

> **주의:** `PolicyPreviewSection`에 `prefs` prop을 추가로 전달해야 합니다.  
> 현재는 `refreshKey`만 받고 있습니다.

---

## 3. 필요한 API 엔드포인트 목록

| 메서드 | 경로 | 용도 | 호출 위치 |
|--------|------|------|-----------|
| `GET` | `/api/user/me` | 유저 프로필 조회 | `MyPageContainer` 마운트 시 |
| `PUT` | `/api/user/me` | 프로필 수정 (이름, 전화번호) | `UserInfoEditForm` 저장 버튼 |
| `PUT` | `/api/user/me/password` | 비밀번호 변경 | `UserInfoEditForm` 비밀번호 변경 |
| `GET` | `/api/user/prefs` | 저장된 맞춤 조건 조회 | `MyPageContainer` 마운트 시 |
| `PUT` | `/api/user/prefs` | 맞춤 조건 저장 | `PreferenceTab` 저장 버튼 |
| `GET` | `/api/user/applications` | 신청 내역 조회 | `MyPageContainer` 마운트 시 |
| `POST` | `/api/policies/recommended` | 맞춤 정책 추천 | `PolicyPreviewSection` (조건 저장 후) |
| `DELETE` | `/api/user/me` | 회원 탈퇴 | `SettingsTab` 탈퇴 확인 버튼 |
| `POST` | `/api/auth/logout` | 로그아웃 | `SettingsTab` 로그아웃 버튼 |

---

## 4. 맞춤 조건 미설정 감지 (신규 가입자 온보딩)

현재 프론트에서는 모든 prefs가 빈 값이면 팝업을 띄워 맞춤 조건 탭으로 유도합니다.  
백엔드 연동 시 아래 방식으로 교체하는 것을 권장합니다.

```js
// 방법 A: GET /api/user/prefs 응답이 null이면 신규
fetch('/api/user/prefs').then(r => r.json()).then(data => {
  if (!data) setShowPrefPrompt(true)
  else setPrefs(data)
})

// 방법 B: 유저 객체에 플래그 포함
// GET /api/user/me 응답에 has_set_prefs: boolean 추가
if (!user.has_set_prefs) setShowPrefPrompt(true)
```

---

## 5. 환경 변수

`.env` 파일에 아래 변수를 추가하세요.

```env
VITE_API_BASE_URL=https://api.your-service.com
```

사용 예:

```js
fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/me`)
```

---

## 6. 인증 토큰 처리

모든 API 요청에 인증 토큰이 필요합니다.  
토큰 저장 방식(localStorage, cookie, context)은 메인 사이트 auth 방식을 따르세요.

```js
// 예: axios 인터셉터 사용 시
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 401 응답 시 로그인 페이지로 리다이렉트
axios.interceptors.response.use(null, err => {
  if (err.response?.status === 401) window.location.href = '/login'
  return Promise.reject(err)
})
```

---

## 7. 달력 — 현재월 계산 로직 교체

`ApplicationCalendar.jsx`는 현재 `2026-06-15` 기준으로 하드코딩되어 있습니다.

```js
// 현재 (하드코딩)
const today = 15
const MONTH_START_OFFSET = 0  // June 1 = Monday
const MONTH_DAYS = 30

// 교체 후: 실제 날짜 기준으로 계산
const now = new Date()
const today = now.getDate()
const year = now.getFullYear()
const month = now.getMonth() + 1

// 1일의 요일 계산 (월요일 시작 기준)
const firstDay = new Date(year, month - 1, 1).getDay()
const startOffset = (firstDay + 6) % 7  // 0=월, 6=일
const daysInMonth = new Date(year, month, 0).getDate()
```

---

## 8. 현재 미구현 / 목 처리 중인 기능 요약

| 기능 | 현재 상태 | 연동 필요 작업 |
|------|-----------|---------------|
| 유저 정보 조회 | 목 데이터 | `GET /api/user/me` 연결 |
| 정보 수정 저장 | UI만 존재 | `PUT /api/user/me` 연결 |
| 맞춤 조건 저장 | UI만 존재 | `PUT /api/user/prefs` 연결 |
| 신청 내역 조회 | 목 데이터 | `GET /api/user/applications` 연결 |
| 맞춤 정책 추천 | 목 데이터 | `POST /api/policies/recommended` 연결 |
| 로그아웃 | 버튼만 존재 | `POST /api/auth/logout` + 리다이렉트 |
| 회원 탈퇴 | 모달만 존재 | `DELETE /api/user/me` + 세션 제거 |
| 달력 현재월 | 2026-06 고정 | `new Date()` 기반으로 교체 |
| 신규 가입 감지 | 빈 값 여부로 판단 | 백엔드 플래그로 교체 권장 |
