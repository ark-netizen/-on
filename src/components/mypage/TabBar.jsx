const TABS_LEFT = [
  { id: 'info',  icon: 'person',  label: '내 정보' },
  { id: 'prefs', icon: 'tune',    label: '맞춤 조건' },
]

const TAB_RIGHT = { id: 'settings', icon: 'manage_accounts', label: '계정 관리' }

export default function TabBar({ active, onChange }) {
  const renderTab = (t) => {
    const isActive = active === t.id
    return (
      <button
        key={t.id}
        type="button"
        style={isActive ? styles.tabActive : styles.tab}
        onClick={() => onChange(t.id)}
      >
        <span
          className="material-symbols-rounded"
          style={{ fontSize: 18, color: isActive ? '#1D4ED8' : '#9ca3af' }}
        >
          {t.icon}
        </span>
        {t.label}
      </button>
    )
  }

  return (
    <div style={styles.wrapper}>
      {TABS_LEFT.map(renderTab)}
      <div style={{ flex: 1 }} />
      {renderTab(TAB_RIGHT)}
    </div>
  )
}

const base = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '14px 20px',
  fontSize: 15,
  fontWeight: 500,
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  borderBottom: '2px solid transparent',
  whiteSpace: 'nowrap',
}

const styles = {
  wrapper: {
    display: 'flex',
    borderBottom: '2px solid #e5e7eb',
    backgroundColor: '#ffffff',
    borderRadius: '12px 12px 0 0',
    padding: '0 8px',
  },
  tab: {
    ...base,
    color: '#9ca3af',
  },
  tabActive: {
    ...base,
    color: '#1D4ED8',
    fontWeight: 700,
    borderBottom: '2px solid #1D4ED8',
  },
}
