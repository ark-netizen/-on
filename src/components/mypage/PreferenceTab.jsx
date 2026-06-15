import { useState } from 'react'
import LocationSelect from './LocationSelect'
import AgeInput from './AgeInput'
import MaritalStatusButtonGroup from './MaritalStatusButtonGroup'
import IncomeRangeInput from './IncomeRangeInput'
import EducationButtonGroup from './EducationButtonGroup'
import EmploymentStatusButtonGroup from './EmploymentStatusButtonGroup'
import MajorFieldGrid from './MajorFieldGrid'
import SpecialFieldGrid from './SpecialFieldGrid'
import KeywordTagInput from './KeywordTagInput'
import PolicyPreviewSection from './PolicyPreviewSection'

/* 2열 행 아코디언 — 헤더 하나로 좌우 두 컬럼을 함께 접고 펼침 */
function RowAccordion({ title, icon, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div style={row.wrap}>
      <button type="button" style={row.header} onClick={() => setOpen(v => !v)}>
        <div style={row.left}>
          <span className="material-symbols-rounded" style={{ fontSize: 16, color: '#1D4ED8' }}>{icon}</span>
          <span style={row.title}>{title}</span>
        </div>
        <span
          className="material-symbols-rounded"
          style={{ fontSize: 20, color: '#9ca3af', transition: 'transform 0.2s', transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        >
          expand_more
        </span>
      </button>

      {open && (
        <div style={row.body}>
          {children}
        </div>
      )}
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, backgroundColor: '#f3f4f6' }} />
}

const row = {
  wrap: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 20px',
    backgroundColor: '#fafafa',
    border: 'none',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
  },
  left: { display: 'flex', alignItems: 'center', gap: 6 },
  title: { fontSize: 14, fontWeight: 700, color: '#374151' },
  body: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 0,
  },
}

const colStyle = {
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
  borderRight: '1px solid #f3f4f6',
}

const colLastStyle = {
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
}

export default function PreferenceTab({ prefs, onChange, onSave, refreshKey }) {
  const [saveState, setSaveState] = useState('idle')

  const update = (field) => (value) => {
    onChange(prev => ({ ...prev, [field]: value }))
    setSaveState('idle')
  }

  const handleSave = () => {
    setSaveState('saved')
    onSave?.()
    setTimeout(() => setSaveState('idle'), 2200)
  }

  return (
    <div style={styles.wrapper}>

      {/* 행 아코디언 1 — 기본 조건 + 학력/취업 */}
      <RowAccordion title="기본 조건  ·  학력 / 취업 상태" icon="tune">
        <div style={colStyle}>
          <LocationSelect
            sido={prefs.sido}
            sigungu={prefs.sigungu}
            onChangeSido={v => onChange(p => ({ ...p, sido: v, sigungu: '' }))}
            onChangeSigungu={update('sigungu')}
          />
          <Divider />
          <AgeInput value={prefs.age} onChange={update('age')} />
          <Divider />
          <MaritalStatusButtonGroup value={prefs.maritalStatus} onChange={update('maritalStatus')} />
          <Divider />
          <IncomeRangeInput
            min={prefs.incomeMin}
            max={prefs.incomeMax}
            onChangeMin={update('incomeMin')}
            onChangeMax={update('incomeMax')}
          />
        </div>
        <div style={colLastStyle}>
          <EducationButtonGroup value={prefs.education} onChange={update('education')} />
          <Divider />
          <EmploymentStatusButtonGroup value={prefs.employmentStatus} onChange={update('employmentStatus')} />
        </div>
      </RowAccordion>

      {/* 행 아코디언 2 — 전공 분야 + 특화 분야 */}
      <RowAccordion title="전공 분야  ·  특화 분야" icon="category">
        <div style={colStyle}>
          <MajorFieldGrid value={prefs.majorFields} onChange={update('majorFields')} />
        </div>
        <div style={colLastStyle}>
          <SpecialFieldGrid value={prefs.specialFields} onChange={update('specialFields')} />
        </div>
      </RowAccordion>

      {/* 선택 키워드 — 항상 노출 */}
      <div style={styles.keywordCard}>
        <KeywordTagInput value={prefs.keywords} onChange={update('keywords')} />
      </div>

      {/* 저장 버튼 */}
      <button
        style={saveState === 'saved' ? styles.saveBtnSaved : styles.saveBtn}
        onClick={handleSave}
        type="button"
      >
        {saveState === 'saved'
          ? <><span className="material-symbols-rounded" style={{ fontSize: 18 }}>check_circle</span> 저장되었습니다</>
          : <><span className="material-symbols-rounded" style={{ fontSize: 18 }}>save</span> 조건 저장하기</>
        }
      </button>

      {/* 정책 미리보기 */}
      <PolicyPreviewSection refreshKey={refreshKey} />
    </div>
  )
}

const baseSave = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  width: '100%',
  padding: '14px 0',
  borderRadius: 12,
  fontSize: 15,
  fontWeight: 700,
  border: 'none',
  cursor: 'pointer',
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  keywordCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    border: '1px solid #e5e7eb',
    padding: '20px 24px',
  },
  saveBtn: {
    ...baseSave,
    backgroundColor: '#1D4ED8',
    color: '#ffffff',
  },
  saveBtnSaved: {
    ...baseSave,
    backgroundColor: '#15803D',
    color: '#ffffff',
  },
}
