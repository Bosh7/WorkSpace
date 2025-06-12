import { useState } from 'react';
import './AdminDashboard.css';

export default function AdminDashboard({
  user,
  onViewAllRegistrations,
  onAddSchedule,
  onManageUsers,
  onAddUser
}) {
  const isAdmin = user?.role === 'ADMIN';
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="admin-dashboard-card">
      <h2 className="admin-dashboard-title">👨‍⚕️ 後台管理系統</h2>
      <p className="admin-dashboard-description">
        歡迎進入後台，這裡可以管理排班、查看掛號名單等功能。
      </p>
      <ul className="admin-dashboard-list">
        <li>
          <button className="admin-dashboard-button" onClick={onViewAllRegistrations}>
            📋 查看全部掛號紀錄
          </button>
        </li>
        <li>
          <button
            className={
              isAdmin
                ? 'admin-dashboard-button'
                : 'admin-dashboard-button admin-dashboard-disabled'
            }
            onClick={isAdmin ? onAddSchedule : undefined}
            disabled={!isAdmin}
          >
            ➕ 新增醫師排班
          </button>
        </li>
        <li>
          <button
            className={
              isAdmin
                ? 'admin-dashboard-button'
                : 'admin-dashboard-button admin-dashboard-disabled'
            }
            onClick={isAdmin ? () => setUserMenuOpen((prev) => !prev) : undefined}
            disabled={!isAdmin}
          >
            👤 使用者管理 {userMenuOpen ? '▲' : '▼'}
          </button>
          {isAdmin && userMenuOpen && (
            <ul className="admin-dashboard-sublist">
              <li>
                <button className="admin-dashboard-sub-button" onClick={onManageUsers}>
                  🔧 管理用戶權限
                </button>
              </li>
              <li>
                <button className="admin-dashboard-sub-button" onClick={onAddUser}>
                  ➕ 新增使用者
                </button>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}
