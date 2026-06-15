import { useState } from 'react'
import UserInfoCard from './UserInfoCard'

export default function SettingsTab({ user, onUpdateUser }) {
  const [showWithdraw, setShowWithdraw] = useState(false)

  return (
    <div style={styles.wrapper}>
      {/* 정보 수정 */}
      <UserInfoCard user={user} onUpdateUser={onUpdateUser} />

      {/* 계정 관리 */}
      <div style={styles.accountCard}>
        <div style={styles.sectionTitle}>
          <span className="material-symbols-rounded" style={{ fontSize: 18, color: '#374151' }}>manage_accounts</span>
          계정 관리
        </div>

        <div style={styles.actionRow}>
          <button style={styles.logoutBtn} type="button">
            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>logout</span>
            로그아웃
          </button>

          {!showWithdraw ? (
            <button
              style={styles.withdrawLink}
              type="button"
              onClick={() => setShowWithdraw(true)}
            >
              회원 탈퇴
            </button>
          ) : (
            <div style={styles.withdrawConfirm}>
              <span style={styles.withdrawWarn}>
                <span className="material-symbols-rounded" style={{ fontSize: 15, color: '#ef4444', verticalAlign: 'middle' }}>warning</span>
                {' '}탈퇴 시 모든 데이터가 삭제되며 복구가 불가합니다.
              </span>
              <div style={styles.withdrawBtns}>
                <button style={styles.cancelBtn} type="button" onClick={() => setShowWithdraw(false)}>취소</button>
                <button style={styles.confirmWithdrawBtn} type="button">탈퇴 확인</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    maxWidth: 560,
  },
  accountCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    border: '1px solid #e5e7eb',
    padding: '20px 24px',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 15,
    fontWeight: 700,
    color: '#374151',
    marginBottom: 16,
  },
  actionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '9px 20px',
    borderRadius: 8,
    border: '1.5px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  withdrawLink: {
    fontSize: 13,
    color: '#9ca3af',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: 0,
  },
  withdrawConfirm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: '12px 16px',
    borderRadius: 10,
    backgroundColor: '#FFF5F5',
    border: '1px solid #fecaca',
    flex: 1,
  },
  withdrawWarn: {
    fontSize: 13,
    color: '#ef4444',
  },
  withdrawBtns: {
    display: 'flex',
    gap: 8,
  },
  cancelBtn: {
    padding: '7px 16px',
    borderRadius: 8,
    border: '1.5px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
  },
  confirmWithdrawBtn: {
    padding: '7px 16px',
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
  },
}
