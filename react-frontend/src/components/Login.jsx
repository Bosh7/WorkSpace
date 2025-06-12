import { useState } from 'react';
import './Login.css';

export default function Login({ onLoginSuccess, onCancel }) {
  // 狀態管理
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaImg, setCaptchaImg] = useState('http://localhost:8080/api/captcha');
  const [showSuccess, setShowSuccess] = useState(false);

  // 刷新驗證碼圖片（避免快取）
  const refreshCaptcha = () => {
    setCaptchaImg(`http://localhost:8080/api/captcha?${Date.now()}`);
  };

  // 處理表單送出
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, captcha }),
        credentials: 'include', // session/captcha 對應
      });

      if (response.ok) {
        const res = await response.json();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
        onLoginSuccess(res.data); // 這裡只會帶回登入成功的必要資訊
      } else {
        setShowSuccess(false); // ❗️失敗時確保成功提示消失
        // 統一顯示模糊訊息
        alert('❌ 登入失敗，請確認帳號密碼或驗證碼');
        refreshCaptcha();
        setCaptcha('');
      }
    } catch (error) {
      setShowSuccess(false); // 保險起見
      alert('⚠️ 系統錯誤，請稍後再試');
      refreshCaptcha();
      setCaptcha('');
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <div className="login-card">
        <h2 className="login-title">🔐 登入系統</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">帳號</label>
          <input
            type="text"
            value={username}
            placeholder="請輸入帳號"
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            autoFocus
            required
          />

          <label className="login-label">密碼</label>
          <input
            type="password"
            value={password}
            placeholder="請輸入密碼"
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />

          <label className="login-label">驗證碼</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <input
              type="text"
              value={captcha}
              placeholder="請輸入驗證碼"
              onChange={(e) => setCaptcha(e.target.value)}
              className="login-input"
              style={{ width: '100px' }}
              autoComplete="off"
              required
            />
            <img
              src={captchaImg}
              alt="驗證碼"
              onClick={refreshCaptcha}
              title="點擊更換驗證碼"
              style={{ cursor: 'pointer', border: '1px solid #ccc', height: '38px', background: '#fff' }}
            />
          </div>

          <div className="login-btn-group">
            <button type="submit" className="login-btn">登入</button>
            <button type="button" className="cancel-btn" onClick={onCancel}>取消</button>
          </div>
        </form>
      </div>
    </>
  );
}
