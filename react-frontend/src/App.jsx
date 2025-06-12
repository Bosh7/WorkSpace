import { useEffect, useState, useCallback } from 'react';
import DepartmentSelector from './components/DepartmentSelector';
import RegisterForm from './components/RegisterForm';
import RegistrationSearch from './components/RegistrationSearch';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import RegistrationDashboard from './components/RegistrationDashboard';
import AddScheduleForm from './components/AddScheduleForm';
import ScheduleHistoryPanel from './components/ScheduleHistoryPanel';
import UserRoleManager from './components/UserRoleManager';
import UserCreateForm from './components/UserCreateForm';
import './App.css';

function App() {
  const [step, setStep] = useState('select');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // 正確的 handleLogout，要用 useCallback 避免 useEffect 早期閉包問題
  const handleLogout = useCallback(async () => {
    try {
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      // 即使錯誤還是清前端
      console.error('Logout error:', err);
    }
    localStorage.removeItem('user');
    localStorage.removeItem('step');
    setCurrentUser(null);
    setStep('select');
  }, []);

  // session 檢查，**不能直接用 handleLogout，必須自己清狀態**
  useEffect(() => {
    // 先取 localStorage
    const savedUser = localStorage.getItem('user');
    const savedStep = localStorage.getItem('step');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setStep(savedStep || 'admin');
    }

    // 檢查 session
    const checkSession = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.data && data.data.username) {
            setCurrentUser(data.data);
            localStorage.setItem('user', JSON.stringify(data.data));
            setCheckingSession(false);
            return;
          }
        }
        // session 失效，這裡「只能清前端，不可呼叫 handleLogout（會造成閉包副作用）」
        localStorage.removeItem('user');
        localStorage.removeItem('step');
        setCurrentUser(null);
        setStep('select');
        setCheckingSession(false);
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('step');
        setCurrentUser(null);
        setStep('select');
        setCheckingSession(false);
      }
    };
    checkSession();

    // 2分鐘後再檢查
    const timer = setInterval(checkSession, 2 * 60 * 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, []);

  // 同步 localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
      localStorage.setItem('step', step);
    }
  }, [currentUser, step]);

  // 檢查中 Loading
  if (checkingSession) {
    return (
      <div className="app-root">
        <header className="header-bar">
          <div className="header-content">
            <span className="header-title">網路掛號系統</span>
          </div>
        </header>
        <main className="main-container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>載入中...</span>
        </main>
        <footer className="footer-bar">
          © 2025 健康醫療網掛號系統
        </footer>
      </div>
    );
  }

  // 主畫面
  return (
    <div className="app-root">
      {/* 頁首 */}
      <header className="header-bar">
        <div className="header-content">
          <div className="header-logo-title">
            <span role="img" aria-label="logo" className="header-logo">🏥</span>
            <span className="header-title">網路掛號系統</span>
          </div>
          <div className="header-login">
            {currentUser ? (
              <>
                <span>👤 {currentUser.username}</span>
                <button className="btn logout-btn" onClick={handleLogout}>登出</button>
              </>
            ) : (
              <button className="btn login-btn" onClick={() => setStep('login')}>登入</button>
            )}
          </div>
        </div>
      </header>

      {/* 主要內容區 */}
      <main className="main-container">
        {step === 'select' && (
          <section className="main-section">
            <DepartmentSelector selected={selectedDepartment} onSelect={setSelectedDepartment} />
            {selectedDepartment && (
              <div className="select-confirm-block">
                <div>
                  ✅ 你選擇的科別是：<strong>{selectedDepartment}</strong>
                </div>
                <button className="btn main-btn" onClick={() => setStep('register')}>確認掛號</button>
              </div>
            )}
            <div className="main-btn-group">
              <button className="btn main-btn" onClick={() => setStep('search')}>查詢掛號紀錄</button>
              {currentUser && (
                <button className="btn admin-btn" onClick={() => setStep('admin')}>
                  返回後台
                </button>
              )}
            </div>
          </section>
        )}

        {step === 'register' && (
          <RegisterForm
            selectedDepartment={selectedDepartment}
            onBack={() => {
              setSelectedDepartment(null);
              setStep('select');
            }}
          />
        )}

        {step === 'search' && (
          <section className="main-section">
            <RegistrationSearch />
          </section>
        )}

        {step === 'login' && (
          <section className="main-section">
            <Login
              onLoginSuccess={(user) => {
                if (user && user.username) {
                  alert('登入成功！');
                  setCurrentUser(user);
                  setStep('admin');
                } else {
                  alert('登入失敗，請確認帳號與密碼');
                }
              }}
              onCancel={() => setStep('select')}
            />
          </section>
        )}

        {currentUser && step === 'admin' && (
          <section className="main-section">
            <AdminDashboard
              user={currentUser}
              onViewAllRegistrations={() => setStep('registrationList')}
              onAddSchedule={() => setStep('addSchedule')}
              onViewHistory={() => setStep('scheduleHistory')}
              onManageUsers={() => setStep('manageUsers')}
              onAddUser={() => setStep('addUser')}
            />
          </section>
        )}

        {currentUser && step === 'registrationList' && (
          <section className="main-section">
            <button className="btn back-btn" onClick={() => setStep('admin')}>⬅️ 返回後台</button>
            <RegistrationDashboard />
          </section>
        )}

        {currentUser && step === 'addSchedule' && (
          <section className="main-section">
            <button className="btn back-btn" onClick={() => setStep('admin')}>⬅️ 返回後台</button>
            <AddScheduleForm onScheduleAdded={() => {}} />
          </section>
        )}

        {currentUser && step === 'scheduleHistory' && (
          <section className="main-section">
            <button className="btn back-btn" onClick={() => setStep('admin')}>⬅️ 返回後台</button>
            <ScheduleHistoryPanel />
          </section>
        )}

        {currentUser && step === 'manageUsers' && (
          <section className="main-section">
            <button className="btn back-btn" onClick={() => setStep('admin')}>⬅️ 返回後台</button>
            <UserRoleManager />
          </section>
        )}

        {currentUser && step === 'addUser' && (
          <section className="main-section">
            <button className="btn back-btn" onClick={() => setStep('admin')}>⬅️ 返回後台</button>
            <UserCreateForm />
          </section>
        )}
      </main>

      {/* 頁尾 */}
      <footer className="footer-bar">
        © 2025 健康醫療網掛號系統
      </footer>

      {/* 浮動回首頁按鈕，非首頁才顯示 */}
      {step !== 'select' && (
        <button
          className="float-home-btn"
          onClick={() => setStep('select')}
        >
          回首頁
        </button>
      )}
    </div>
  );
}

export default App;
