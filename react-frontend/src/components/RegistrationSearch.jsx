import { useState } from 'react';
import './RegistrationSearch.css';

export default function RegistrationSearch() {
  const [idType, setIdType] = useState('身分證號');
  const [idNumber, setIdNumber] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaImgSrc, setCaptchaImgSrc] = useState('http://localhost:8080/api/captcha');
  const [records, setRecords] = useState([]);

  // 查詢掛號（含驗證碼驗證）
  const handleSearch = async () => {
    if (!idNumber) {
      alert('請輸入識別號碼');
      return;
    }

    if (!captcha) {
      alert('請輸入驗證碼');
      return;
    }

    // 格式驗證
    if (idType === '身分證號') {
      const idRegex = /^[A-Z][0-9]{9}$/;
      if (!idRegex.test(idNumber)) {
        alert('身分證格式錯誤，請輸入正確格式（例如：A123456789）');
        return;
      }
    }

    if (idType === '病歷號') {
      const caseNoRegex = /^[0-9]{10}$/;
      if (!caseNoRegex.test(idNumber)) {
        alert('病歷號格式錯誤，請輸入 10 碼數字');
        return;
      }
    }

    const url = `http://localhost:8080/api/registrations/search?idType=${idType}&idNumber=${idNumber}&captcha=${captcha}`;

    try {
      const res = await fetch(url, { credentials: 'include' });
      const data = await res.json();

      if (data.code !== 200) {
        alert(data.message || '查詢失敗');
        setCaptcha('');
        setCaptchaImgSrc(`http://localhost:8080/api/captcha?${Date.now()}`);
        return;
      }

      setRecords(data.data || []);
      setCaptcha('');
      setIdNumber('');
      setCaptchaImgSrc(`http://localhost:8080/api/captcha?${Date.now()}`);
    } catch (err) {
      console.error('查詢錯誤', err);
      alert('無法查詢，請稍後再試');
    }
  };

  // 刪除功能（前端直接更新 records）
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('確定要刪除這筆掛號嗎？');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8080/api/registrations/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        alert('已刪除掛號');
        //  直接移除 records 中該筆資料，不用重新查詢
        setRecords(prev => prev.filter(r => r.id !== id));
      } else {
        alert('刪除失敗');
      }
    } catch (error) {
      alert('錯誤：' + error.message);
    }
  };

  return (
    <div className="regsearch-card">
      <h2 className="regsearch-title">🔍 查詢掛號紀錄</h2>

      <div className="regsearch-type-group">
        <label>
          <input
            type="radio"
            value="身分證號"
            checked={idType === '身分證號'}
            onChange={(e) => setIdType(e.target.value)}
          /> 身分證號
        </label>
        <label style={{ marginLeft: '20px' }}>
          <input
            type="radio"
            value="病歷號"
            checked={idType === '病歷號'}
            onChange={(e) => setIdType(e.target.value)}
          /> 病歷號
        </label>
      </div>

      <input
        type="text"
        value={idNumber}
        onChange={(e) => setIdNumber(e.target.value)}
        placeholder={`請輸入 ${idType}`}
        className="regsearch-input"
      />

      <div className="regsearch-captcha-group">
        <label>請輸入圖片中的數字：</label>
        <div className="regsearch-captcha-row">
          <input
            type="text"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            placeholder="驗證碼"
            className="regsearch-captcha-input"
          />
          <img
            src={captchaImgSrc}
            alt="驗證碼"
            onClick={() => setCaptchaImgSrc(`http://localhost:8080/api/captcha?${Date.now()}`)}
            className="regsearch-captcha-img"
            title="點我更換驗證碼"
          />
        </div>
      </div>

      <button onClick={handleSearch} className="regsearch-search-btn">查詢</button>

      <hr style={{ margin: '20px 0' }} />

      {records.length > 0 ? (
        <div className="regsearch-table-wrapper">
          <table className="regsearch-table">
            <thead>
              <tr>
                <th>科別</th>
                <th>醫師</th>
                <th>日期</th>
                <th>星期</th>
                <th>時段</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td>{r.departmentName || '未提供'}</td>
                  <td>{r.doctorName}</td>
                  <td>{r.registrationDate}</td>
                  <td>{r.dayOfWeek}</td>
                  <td>{r.timePeriod}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="regsearch-delete-btn"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="regsearch-msg">尚無掛號紀錄</p>
      )}
    </div>
  );
}
