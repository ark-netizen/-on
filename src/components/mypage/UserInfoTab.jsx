import UserInfoCard from './UserInfoCard'
import JoinHistoryCard from './JoinHistoryCard'
import ApplicationCalendar from './ApplicationCalendar'

export default function UserInfoTab({ user, onUpdateUser }) {
  return (
    <div style={styles.wrapper}>
      {/* 상단 2열: 회원정보(읽기전용) + 신청 달력 */}
      <div style={styles.topGrid}>
        {/* 회원정보 — onEdit 없이 전달 → 수정 버튼 미표시 */}
        <div style={styles.infoCard}>
          <div style={styles.avatar}>{user.name.charAt(0)}</div>
          <div style={styles.infoBody}>
            <div style={styles.name}>{user.name}</div>
            <div style={styles.email}>{user.email}</div>
            <div style={styles.divider} />
            <InfoRow label="전화번호" value={user.phone} />
            <InfoRow label="가입일"   value={fmt(user.joinDate)} />
            <InfoRow label="최근 로그인" value={fmt(user.lastLogin)} />
          </div>
        </div>

        {/* 신청 달력 */}
        <ApplicationCalendar applications={user.joinedPolicies} />
      </div>

      {/* 하단: 신청 내역 전체 */}
      <JoinHistoryCard policies={user.joinedPolicies} />
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div style={styles.infoRow}>
      <span style={styles.infoLabel}>{label}</span>
      <span style={styles.infoValue}>{value}</span>
    </div>
  )
}

function fmt(str) {
  return str ? str.replace(/-/g, '.') : '-'
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  topGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
    alignItems: 'start',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    border: '1px solid #e5e7eb',
    padding: 24,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: '#EFF6FF',
    border: '2px solid #BFDBFE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 26,
    fontWeight: 700,
    color: '#1D4ED8',
    marginBottom: 14,
  },
  infoBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  name: {
    fontSize: 18,
    fontWeight: 700,
    color: '#111827',
  },
  email: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 3,
    marginBottom: 0,
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    margin: '16px 0',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: '#9ca3af',
    fontWeight: 500,
  },
  infoValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: 500,
  },
}
