import { useState } from 'react'
import PageHeader from './PageHeader'
import TabBar from './TabBar'
import UserInfoTab from './UserInfoTab'
import PreferenceTab from './PreferenceTab'
import SettingsTab from './SettingsTab'

const MOCK_USER = {
  name: '김청년',
  email: 'youth@example.com',
  phone: '010-1234-5678',
  joinDate: '2025-03-15',
  lastLogin: '2026-06-15',
  joinedPolicies: [
    { id: 1, title: '청년 주거 지원 사업',      category: 'house',  date: '2026-06-10', status: '심사중' },
    { id: 2, title: '청년도약계좌',              category: 'money',  date: '2026-06-03', status: '지원완료' },
    { id: 3, title: '국민취업지원제도 1유형',    category: 'job',    date: '2026-05-22', status: '신청완료' },
    { id: 4, title: '청년 내일저축계좌',         category: 'money',  date: '2026-05-14', status: '결과확인' },
    { id: 5, title: '청년 창업 사관학교',        category: 'edu',    date: '2026-04-07', status: '지원완료' },
    { id: 6, title: '청년 건강보험료 지원',      category: 'health', date: '2026-03-18', status: '지원완료' },
  ],
}

const INITIAL_PREFS = {
  sido: '',
  sigungu: '',
  age: '',
  maritalStatus: '',
  incomeMin: '',
  incomeMax: '',
  education: '',
  employmentStatus: '',
  majorFields: [],
  specialFields: [],
  keywords: [],
}

export default function MyPageContainer() {
  const [activeTab, setActiveTab] = useState('info')
  const [user, setUser]     = useState(MOCK_USER)
  const [prefs, setPrefs]   = useState(INITIAL_PREFS)
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <PageHeader />

        {/* 프로필 바 — 유저 정보 전체 */}
        <div style={styles.profileBar}>
          <div style={styles.profileLeft}>
            <div style={styles.userName}>{user.name}</div>
            <div style={styles.userEmail}>{user.email}</div>
          </div>
          <div style={styles.profileMeta}>
            <MetaItem icon="call" label="전화번호" value={user.phone} />
            <div style={styles.metaDivider} />
            <MetaItem icon="calendar_today" label="가입일" value={user.joinDate.replace(/-/g, '.')} />
            <div style={styles.metaDivider} />
            <MetaItem icon="login" label="최근 로그인" value={user.lastLogin.replace(/-/g, '.')} />
          </div>
        </div>

        {/* 탭 + 콘텐츠 */}
        <div style={styles.tabContainer}>
          <TabBar active={activeTab} onChange={setActiveTab} />
          <div style={styles.tabContent}>
            {activeTab === 'info' && (
              <UserInfoTab user={user} onUpdateUser={setUser} />
            )}
            {activeTab === 'prefs' && (
              <PreferenceTab
                prefs={prefs}
                onChange={setPrefs}
                onSave={() => setRefreshKey(k => k + 1)}
                refreshKey={refreshKey}
              />
            )}
            {activeTab === 'settings' && (
              <SettingsTab user={user} onUpdateUser={setUser} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function MetaItem({ icon, label, value }) {
  return (
    <div style={metaItem.wrap}>
      <span className="material-symbols-rounded" style={{ fontSize: 14, color: '#9ca3af' }}>{icon}</span>
      <span style={metaItem.label}>{label}</span>
      <span style={metaItem.value}>{value}</span>
    </div>
  )
}

const metaItem = {
  wrap: { display: 'flex', alignItems: 'center', gap: 5 },
  label: { fontSize: 12, color: '#9ca3af', fontWeight: 500 },
  value: { fontSize: 13, color: '#374151', fontWeight: 600 },
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '40px 20px 80px',
  },
  inner: {
    maxWidth: 1100,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  profileBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    border: '1px solid #e5e7eb',
    padding: '20px 28px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  profileLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  profileMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  metaDivider: {
    width: 1,
    height: 14,
    backgroundColor: '#e5e7eb',
  },
  userName: {
    fontSize: 17,
    fontWeight: 700,
    color: '#111827',
  },
  userEmail: {
    fontSize: 13,
    color: '#9ca3af',
  },
  tabContainer: {
    borderRadius: 16,
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  tabContent: {
    backgroundColor: '#f8fafc',
    padding: '24px',
  },
}
