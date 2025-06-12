import { useState, useEffect } from 'react';
import './RegisterForm.css'; 

function RegisterForm({ selectedDepartment, onBack }) {
  const [idType, setIdType] = useState('身分證號');
  const [idValue, setIdValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [scheduleData, setScheduleData] = useState({});
  const [registrationCount, setRegistrationCount] = useState(0);
  const [registrationLimit, setRegistrationLimit] = useState(30);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 60);
  const todayStr = today.toISOString().split('T')[0];
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const days = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
  const periods = ['上午', '下午', '晚上'];

  useEffect(() => {
    if (selectedDepartment && selectedDate) {
      fetch(`http://localhost:8080/api/schedules/search-by-department-and-date?departmentName=${selectedDepartment}&date=${selectedDate}`)
        .then((res) => res.json())
        .then((data) => {
          const formatted = {};
          data.forEach((item) => {
            if (!formatted[item.timePeriod]) formatted[item.timePeriod] = {};
            formatted[item.timePeriod][item.dayOfWeek] = item.doctorName;
          });
          setScheduleData(formatted);
        });
    }
  }, [selectedDepartment, selectedDate]);

  useEffect(() => {
    if (selectedDate) {
      fetch(`http://localhost:8080/api/registrations/count?date=${selectedDate}`)
        .then(res => res.json())
        .then(data => {
          setRegistrationCount(data.count);
          setRegistrationLimit(data.limit);
        })
        .catch(() => {
          setRegistrationCount(0);
          setRegistrationLimit(30);
        });
    }
  }, [selectedDate]);

  const getDoctorIdByName = async (doctorName) => {
    const res = await fetch(`http://localhost:8080/api/doctors/find-id?name=${encodeURIComponent(doctorName)}`);
    if (!res.ok) throw new Error('找不到醫師 ID');
    return await res.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idValue || !selectedSlot || !selectedDate) {
      alert('請完整選擇掛號資訊與輸入識別資料');
      return;
    }
    if (idType === '身分證號') {
      const idRegex = /^[A-Z][0-9]{9}$/;
      if (!idRegex.test(idValue)) {
        alert('身分證號格式錯誤，請輸入正確格式（例如：A123456789）');
        return;
      }
    }
    if (idType === '病歷號' && idValue.length !== 10) {
      alert('病歷號需為 10 碼，請重新輸入');
      return;
    }

    try {
      const doctorId = await getDoctorIdByName(selectedSlot.doctor);
      const response = await fetch('http://localhost:8080/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idType,
          idNumber: idValue,
          doctorId,
          dayOfWeek: selectedSlot.day,
          timePeriod: selectedSlot.period,
          registrationDate: selectedDate
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '掛號失敗');
      }

      setSubmitted(true);
    } catch (error) {
      alert('錯誤：' + error.message);
    }
  };

  if (submitted) {
    return (
      <div className="register-form-container" style={{ textAlign: 'center', padding: '50px' }}>
        <h2>掛號完成！</h2>
        <p>科別：{selectedDepartment}</p>
        <p>日期：{selectedDate}</p>
        <p>時段：{selectedSlot.day} {selectedSlot.period}</p>
        <p>醫師：{selectedSlot.doctor}</p>
      </div>
    );
  }

  return (
    <div className="register-form-container">
      <h2>預約掛號確認</h2>

      <div className="register-form-date-picker">
        <label>選擇掛號日期：</label>
        <input
          type="date"
          value={selectedDate}
          min={todayStr}
          max={maxDateStr}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        {selectedDate && (
          <div className="register-form-count">
            看診人數：{registrationCount} / {registrationLimit}
          </div>
        )}
      </div>

      <div className="register-form-table-wrapper">
        <table className="register-form-table" border="1" cellPadding="10">
          <thead>
            <tr>
              <th>時段</th>
              {days.map((day) => <th key={day}>{day}</th>)}
            </tr>
          </thead>
          <tbody>
            {periods.map((period) => (
              <tr key={period}>
                <td>{period}</td>
                {days.map((day) => {
                  const doctor = scheduleData[period]?.[day];
                  const isSelected = selectedSlot &&
                    selectedSlot.day === day &&
                    selectedSlot.period === period;
                  return (
                    <td
                      key={`${day}-${period}`}
                      onClick={() => doctor && setSelectedSlot({ day, period, doctor })}
                      className={
                        doctor
                          ? isSelected
                            ? 'selected'
                            : ''
                          : 'disabled'
                      }
                    >
                      {doctor || ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSlot && (
        <div className="register-form-selected-info">
          您選擇了：{selectedSlot.day} {selectedSlot.period} - {selectedSlot.doctor}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="register-form-input-block">
          <label>
            <input
              type="radio"
              value="病歷號"
              checked={idType === '病歷號'}
              onChange={(e) => setIdType(e.target.value)}
            /> 病歷號
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input
              type="radio"
              value="身分證號"
              checked={idType === '身分證號'}
              onChange={(e) => setIdType(e.target.value)}
            /> 身分證號
          </label>
        </div>

        <div className="register-form-input-block">
          <input
            type="text"
            placeholder={`請輸入 ${idType}`}
            value={idValue}
            onChange={(e) => setIdValue(e.target.value)}
          />
        </div>

        <button type="submit" className="register-form-button">
          掛號確認
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
