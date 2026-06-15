import { useState } from 'react'

const CAT_DOT = {
  job:    '#1D4ED8',
  house:  '#15803D',
  money:  '#B45309',
  edu:    '#6D28D9',
  health: '#BE123C',
}

const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일']

// June 1, 2026 = Monday (offset 0 from Mon-start)
const MONTH_START_OFFSET = 0
const MONTH_DAYS = 30

export default function ApplicationCalendar({ applications }) {
  const [offset, setOffset] = useState(0) // month offset from Jun 2026

  const year = 2026
  const baseMonth = 6 // June
  const displayMonth = baseMonth + offset
  const normalizedMonth = ((displayMonth - 1 + 12) % 12) + 1
  const normalizedYear = year + Math.floor((displayMonth - 1) / 12)

  // Build a map of day → categories for June 2026 only
  const markedDays = {}
  if (offset === 0 && applications) {
    applications.forEach(a => {
      if (a.date.startsWith('2026-06-')) {
        const day = parseInt(a.date.split('-')[2], 10)
        if (!markedDays[day]) markedDays[day] = []
        markedDays[day].push(a.category)
      }
    })
  }

  // Build calendar grid (Mon-start)
  // For simplicity, offset for other months is approximate
  const startOffset = offset === 0 ? MONTH_START_OFFSET : (MONTH_START_OFFSET + offset * 2) % 7
  const daysInMonth = offset === 0 ? MONTH_DAYS : 30
  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const today = 15 // 2026-06-15

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <button type="button" style={styles.navBtn} onClick={() => setOffset(o => o - 1)}>
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>chevron_left</span>
        </button>
        <span style={styles.monthLabel}>
          {normalizedYear}년 {normalizedMonth}월
        </span>
        <button type="button" style={styles.navBtn} onClick={() => setOffset(o => o + 1)}>
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>chevron_right</span>
        </button>
      </div>

      <div style={styles.weekRow}>
        {WEEKDAYS.map(d => (
          <div key={d} style={{ ...styles.weekDay, color: d === '일' ? '#ef4444' : d === '토' ? '#3B82F6' : '#9ca3af' }}>
            {d}
          </div>
        ))}
      </div>

      <div style={styles.grid}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />
          const dots = markedDays[day] || []
          const isToday = offset === 0 && day === today
          const isSat = (i % 7) === 5
          const isSun = (i % 7) === 6
          return (
            <div
              key={day}
              style={{
                ...styles.cell,
                ...(isToday ? styles.cellToday : {}),
              }}
            >
              <span style={{
                ...styles.dayNum,
                color: isToday ? '#ffffff' : isSun ? '#ef4444' : isSat ? '#3B82F6' : '#374151',
                backgroundColor: isToday ? '#1D4ED8' : 'transparent',
              }}>
                {day}
              </span>
              {dots.length > 0 && (
                <div style={styles.dots}>
                  {dots.slice(0, 2).map((cat, idx) => (
                    <span key={idx} style={{ ...styles.dot, backgroundColor: CAT_DOT[cat] || '#9ca3af' }} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {Object.keys(markedDays).length === 0 && offset === 0 && (
        <div style={styles.noData}>이 달 신청 내역이 없습니다</div>
      )}
      {offset !== 0 && (
        <div style={styles.noData}>이 달 신청 내역이 없습니다</div>
      )}
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    border: '1px solid #e5e7eb',
    padding: '24px 28px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    flex: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  monthLabel: {
    fontSize: 15,
    fontWeight: 700,
    color: '#111827',
  },
  navBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 8,
    border: '1.5px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    color: '#6b7280',
    cursor: 'pointer',
    padding: 0,
  },
  weekRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    marginBottom: 4,
  },
  weekDay: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 600,
    padding: '6px 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '6px 0',
  },
  cell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '6px 0',
    borderRadius: 6,
  },
  cellToday: {
    backgroundColor: 'transparent',
  },
  dayNum: {
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1,
  },
  dots: {
    display: 'flex',
    gap: 2,
    marginTop: 2,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: '50%',
  },
  noData: {
    textAlign: 'center',
    fontSize: 12,
    color: '#d1d5db',
    padding: '12px 0 4px',
  },
}
