import { useEffect, useState } from 'react';
import './ScheduleHistoryPanel.css';

export default function ScheduleHistoryPanel() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/schedule-history')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setHistory(data);
        } else {
          setHistory([]);
          console.error('❌ 回傳格式錯誤', data);
        }
      })
      .catch(err => console.error('❌ 載入歷史紀錄失敗', err));
  }, []);

  return (
    <div className="shistory-card">
      <h3 className="shistory-title">🕘 排班歷史紀錄</h3>
      {history.length === 0 ? (
        <p className="shistory-msg">尚無紀錄</p>
      ) : (
        <div className="shistory-table-wrapper">
          <table className="shistory-table">
            <thead>
              <tr>
                <th>醫師</th>
                <th>動作</th>
                <th>星期</th>
                <th>時段</th>
                <th>建立時間</th>
              </tr>
            </thead>
            <tbody>
              {history.map(h => (
                <tr key={h.id}>
                  <td>{h.doctorName || h.content?.split(' ')[0]}</td>
                  <td>{h.action}</td>
                  <td>{h.dayOfWeek || h.content?.split(' ')[1]}</td>
                  <td>{h.timePeriod || h.content?.split(' ')[2]}</td>
                  <td>{h.timestamp ? (new Date(h.timestamp).toLocaleString('zh-TW', {
                    timeZone: 'Asia/Taipei',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })) : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
