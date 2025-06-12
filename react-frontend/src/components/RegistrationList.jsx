import { useEffect, useState } from 'react';
import './RegistrationList.css';

export default function RegistrationList() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('http://localhost:8080/api/registrations')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setRegistrations(data.data);
        } else {
          alert('⚠️ 無法取得掛號資料：' + data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert('⚠️ 取得掛號紀錄時發生錯誤');
        setLoading(false);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = registrations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(registrations.length / itemsPerPage);

  // 產生省略分頁
  function getPagination(current, total) {
    let pages = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 4) {
        pages = [1, 2, 3, 4, 5, 'ellipsis', total];
      } else if (current >= total - 3) {
        pages = [1, 'ellipsis', total - 4, total - 3, total - 2, total - 1, total];
      } else {
        pages = [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total];
      }
    }
    return pages;
  }

  return (
    <div className="reglist-card">
      <h2 className="reglist-title">📋 掛號紀錄列表</h2>
      {loading ? (
        <p className="reglist-msg">載入中...</p>
      ) : registrations.length === 0 ? (
        <p className="reglist-msg">目前沒有掛號紀錄。</p>
      ) : (
        <>
          <div className="reglist-table-wrapper">
            <table className="reglist-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>身分證 / 病歷號</th>
                  <th>醫師姓名</th>
                  <th>科別</th>
                  <th>日期</th>
                  <th>時段</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((r, index) => (
                  <tr key={r.id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{r.idNumber}</td>
                    <td>{r.doctorName}</td>
                    <td>{r.departmentName}</td>
                    <td>{r.registrationDate}</td>
                    <td>{r.timePeriod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="reglist-pagination">
            {/* 上一頁 */}
            <button
              className="reglist-page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt;
            </button>
            {/* 動態頁碼+省略 */}
            {getPagination(currentPage, totalPages).map((page, idx) =>
              page === 'ellipsis' ? (
                <span key={'e' + idx} className="reglist-ellipsis">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`reglist-page-btn ${page === currentPage ? 'active' : ''}`}
                >
                  {page}
                </button>
              )
            )}
            {/* 下一頁 */}
            <button
              className="reglist-page-btn"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}
