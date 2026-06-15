export default function PageHeader() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.topRow}>
        <span style={styles.badge}>마이페이지</span>
      </div>
      <h1 style={styles.title}>내 정보 관리</h1>
      <p style={styles.subtitle}>회원 정보를 확인하고 맞춤 정책 조건을 설정하세요.</p>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    backgroundColor: '#EFF6FF',
    color: '#1D4ED8',
    fontSize: 13,
    fontWeight: 600,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#111827',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
  },
}
