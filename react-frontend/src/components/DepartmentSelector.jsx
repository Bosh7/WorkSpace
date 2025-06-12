import { useState } from 'react';
import './DepartmentSelector.css';

// 科別資料
const departments = {
  "內科系": ["一般內科", "心臟內科", "血液腫瘤科", "風濕免疫科", "腎臟內科", "內分泌科", "感染科", "呼吸胸腔科", "消化內科", "神經內科", "老人醫學科"],
  "外科系": ["一般外科", "心臟血管外科", "腦神經外科", "整形外科", "直腸外科", "胸腔外科", "骨科", "泌尿科"]
};

export default function DepartmentSelector({ onSelect }) {
  const [selectedDept, setSelectedDept] = useState(null);

  return (
    <div className="dept-selector">
      {Object.entries(departments).map(([group, deptList]) => (
        <div key={group} className="dept-group">
          <h3 className="dept-group-title">{group}</h3>
          <div className="dept-list">
            {deptList.map((dept) => (
              <button
                key={dept}
                className={`dept-btn${dept === selectedDept ? ' selected' : ''}`}
                onClick={() => {
                  setSelectedDept(dept);
                  onSelect(dept);
                }}
                type="button"
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
