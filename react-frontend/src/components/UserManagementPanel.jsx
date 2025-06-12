import React from 'react';
import './UserManagementPanel.css';

export default function UserManagementPanel({ onManageUsers, onAddUser }) {
  return (
    <div className="usermgmt-panel">
      <h3>👥 使用者管理</h3>
      <p>請選擇以下操作：</p>
      <div className="usermgmt-btn-group">
        <button className="usermgmt-btn" onClick={onManageUsers}>
          🔧 管理用戶權限
        </button>
        <button className="usermgmt-btn" onClick={onAddUser}>
          ➕ 新增使用者
        </button>
      </div>
    </div>
  );
}
