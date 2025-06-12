import { useEffect, useState } from 'react';
import './AddScheduleForm.css';

export default function AddScheduleForm() {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [currentSchedules, setCurrentSchedules] = useState([]);
  const [historyRecords, setHistoryRecords] = useState([]);

  const [form, setForm] = useState({
    departmentId: '',
    doctorId: '',
    dayOfWeek: '',
    timePeriod: '',
    available: 'true'
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/departments')
      .then(res => res.json())
      .then(data => setDepartments(Array.isArray(data) ? data : []))
      .catch(err => console.error('❌ 無法載入科別:', err));
  }, []);

  useEffect(() => {
    if (form.departmentId) {
      fetch(`http://localhost:8080/api/doctors/department/${form.departmentId}`)
        .then(res => res.json())
        .then(data => setDoctors(Array.isArray(data) ? data : []))
        .catch(err => console.error('❌ 無法載入醫師:', err));
    } else {
      setDoctors([]);
    }
  }, [form.departmentId]);

  useEffect(() => {
    if (form.doctorId) {
      fetchSchedule();
      fetchHistory();
    } else {
      setCurrentSchedules([]);
      setHistoryRecords([]);
    }
  }, [form.doctorId]);

  const fetchSchedule = () => {
    fetch(`http://localhost:8080/api/schedules/doctor?name=${getDoctorNameById(form.doctorId)}`)
      .then(res => res.json())
      .then(data => setCurrentSchedules(Array.isArray(data) ? data : []));
  };

  const fetchHistory = () => {
    fetch('http://localhost:8080/api/schedule-history')
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setHistoryRecords(sorted);
      });
  };

  const getDoctorNameById = (id) => {
    const found = doctors.find(d => d.id.toString() === id.toString());
    return found ? found.name : '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isDuplicate = currentSchedules.some(s =>
      s.dayOfWeek === form.dayOfWeek && s.timePeriod === form.timePeriod
    );
    if (isDuplicate) {
      alert('❌ 此醫師該時段已有排班，請勿重複新增');
      return;
    }

    const dto = {
      doctorId: parseInt(form.doctorId),
      dayOfWeek: form.dayOfWeek,
      timePeriod: form.timePeriod,
      available: form.available === 'true'
    };

    const res = await fetch('http://localhost:8080/api/schedules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto)
    });

    if (res.ok) {
      await createHistory('新增排班', `${getDoctorNameById(form.doctorId)} ${form.dayOfWeek} ${form.timePeriod}`);
      alert('✅ 新增排班成功');
      setForm({ ...form, dayOfWeek: '', timePeriod: '' });
      fetchSchedule();
      fetchHistory();
    } else {
      alert('❌ 新增失敗');
    }
  };

  const handleDeleteSchedule = async (id) => {
    const confirmed = window.confirm('是否確認刪除這筆排班？');
    if (!confirmed) return;

    const target = currentSchedules.find(s => s.id === id);
    const res = await fetch(`http://localhost:8080/api/schedules/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      const content = `${getDoctorNameById(form.doctorId)} ${target.dayOfWeek} ${target.timePeriod}`;
      await createHistory('刪除排班', content);
      alert('✅ 刪除成功');
      fetchSchedule();
      fetchHistory();
    } else {
      alert('❌ 刪除失敗');
    }
  };

  const createHistory = async (action, content) => {
    const historyDto = {
      action,
      content
    };
    await fetch('http://localhost:8080/api/schedule-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(historyDto)
    });
  };

  return (
    <div className="add-schedule-wrapper">
      {/* --- 新增排班表單 --- */}
      <div className="card schedule-form-card">
        <form onSubmit={handleSubmit}>
          <h3>➕ 新增醫師排班</h3>
          <div className="form-row">
            <label>科別：</label>
            <select name="departmentId" value={form.departmentId} onChange={handleChange} required>
              <option value="">請選擇科別</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label>醫師：</label>
            <select name="doctorId" value={form.doctorId} onChange={handleChange} required>
              <option value="">請選擇醫師</option>
              {doctors.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.name}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label>星期：</label>
            <select name="dayOfWeek" value={form.dayOfWeek} onChange={handleChange} required>
              <option value="">請選擇星期</option>
              {['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label>時段：</label>
            <select name="timePeriod" value={form.timePeriod} onChange={handleChange} required>
              <option value="">請選擇時段</option>
              <option value="上午">上午</option>
              <option value="下午">下午</option>
            </select>
          </div>
          <div className="form-row">
            <label>是否開放掛號：</label>
            <select name="available" value={form.available} onChange={handleChange}>
              <option value="true">開放</option>
              <option value="false">不開放</option>
            </select>
          </div>
          <button type="submit" className="add-schedule-btn">
             提交
          </button>
        </form>
      </div>
      {/* --- 目前排班 --- */}
      <div className="card schedule-list-card">
        <h4>📋 目前排班</h4>
        {currentSchedules.length > 0 ? (
          <table className="schedule-table">
            <thead>
              <tr>
                <th>星期</th>
                <th>時段</th>
                <th>狀態</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {currentSchedules.map(s => (
                <tr key={s.id}>
                  <td>{s.dayOfWeek}</td>
                  <td>{s.timePeriod}</td>
                  <td>{s.available ? '✅ 開放' : '⛔ 關閉'}</td>
                  <td>
                    <button
                      className="del-btn"
                      onClick={() => handleDeleteSchedule(s.id)}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-schedule-msg">尚無排班</p>
        )}
      </div>
      {/* --- 歷史紀錄 --- */}
      <div className="card history-list-card">
        <h4>🕘 歷史紀錄</h4>
        {historyRecords.length > 0 ? (
          <table className="schedule-table">
            <thead>
              <tr>
                <th>操作</th>
                <th>紀錄內容</th>
                <th>時間</th>
              </tr>
            </thead>
            <tbody>
              {historyRecords.map((h, i) => (
                <tr key={i}>
                  <td style={{ whiteSpace: 'nowrap' }}>{h.action}</td>
                  <td>{h.content}</td>
                  <td style={{ whiteSpace: 'nowrap', maxWidth: '200px' }}>
                    {new Date(h.timestamp).toLocaleString('zh-TW', {
                      timeZone: 'Asia/Taipei',
                      hour12: true,
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-schedule-msg">尚無歷史紀錄</p>
        )}
      </div>
    </div>
  );
}
