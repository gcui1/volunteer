const API_URL = 'https://volunteer.guoqiang-cui.workers.dev/'; // ? ????? Worker URL

document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    employee_id: document.getElementById('employee_id').value,
    project: document.getElementById('project').value,
    hours: parseFloat(document.getElementById('hours').value),
  };

  try {
    const res = await fetch(`${API_URL}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.success) {
      document.getElementById('message').innerText = '? ????!';
      document.getElementById('signupForm').reset();
    } else {
      alert('? ????:' + (result.error || '????'));
    }
  } catch (err) {
    alert('????:' + err.message);
  }
});

async function fetchSummary() {
  const empId = document.getElementById('queryEmpId').value;
  if (!empId) return alert('?????');
  
  try {
    const res = await fetch(`${API_URL}/summary?employee_id=${encodeURIComponent(empId)}`);
    const data = await res.json();
    
    let html = '<h3>????:</h3><ul>';
    if (data.length === 0) {
      html += '<li>????</li>';
    } else {
      let total = 0;
      data.forEach(item => {
        total += item.total_hours;
        html += `<li>${item.project}:${item.total_hours} ??</li>`;
      });
      html += `<li><strong>??:${total.toFixed(1)} ??</strong></li>`;
    }
    html += '</ul>';
    document.getElementById('summaryResult').innerHTML = html;
  } catch (err) {
    alert('????:' + err.message);
  }
}