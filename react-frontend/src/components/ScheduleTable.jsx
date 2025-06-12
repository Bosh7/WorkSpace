import { useState } from 'react';
import './ScheduleTable.css';

// 星期與時段固定
const days = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
const periods = ["上午", "下午", "晚上"];

export default function ScheduleTable({ scheduleData, selectedDepartment, onSelectTimeSlot }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const deptSchedule = scheduleData[selectedDepartment] || {};

  const handleClick = (day, period, doctor) => {
    const slot = { day, period, doctor };
    setSelectedSlot(slot);
    onSelectTimeSlot(slot);
  };

  return (
    <div className="schedtable-card">
      <h3 className="schedtable-title">門診時間表（{selectedDepartment}）</h3>
      <div className="schedtable-table-wrapper">
        <table className="schedtable-table">
          <thead>
            <tr>
              <th>時段</th>
              {days.map(day => <th key={day}>{day}</th>)}
            </tr>
          </thead>
          <tbody>
            {periods.map(period => (
              <tr key={period}>
                <td>{period}</td>
                {days.map(day => {
                  const doctor = deptSchedule[day]?.[period];
                  const isSelected = selectedSlot &&
                    selectedSlot.day === day &&
                    selectedSlot.period === period;
                  return (
                    <td
                      key={`${day}-${period}`}
                      onClick={() => doctor && handleClick(day, period, doctor)}
                      className={
                        doctor
                          ? isSelected
                            ? 'schedtable-cell selected'
                            : 'schedtable-cell active'
                          : 'schedtable-cell disabled'
                      }
                    >
                      {doctor || ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSlot && (
        <div className="schedtable-info">
          ✅ 你選擇的時段是：<strong>{selectedSlot.day} {selectedSlot.period} - {selectedSlot.doctor}</strong>
        </div>
      )}
    </div>
  );
}
