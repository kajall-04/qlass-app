/* ============================================
   QLASS MAIN APPLICATION
   Router, Page Renderers, State Management
   ============================================ */

const QlassApp = (function() {
  'use strict';

  // -- State --
  let currentPage = 'dashboard';
  let sidebarCollapsed = false;
  let darkMode = false;
  let studentPage = 1;
  let teacherPage = 1;
  let lecturePage = 1;
  let dppPage = 1;
  const pageSize = 15;
  let studentSearch = '';
  let teacherSearch = '';
  let studentClassFilter = '';
  let studentRiskFilter = '';

  // -- DOM Refs --
  const pageContent = document.getElementById('pageContent');
  const pageTitle = document.getElementById('pageTitle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const drawer = document.getElementById('drawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerBody = document.getElementById('drawerBody');
  const drawerTitle = document.getElementById('drawerTitle');

  // -- NAVIGATION --
  function navigateTo(page) {
    currentPage = page;
    // Update sidebar active
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (navItem) navItem.classList.add('active');
    // Update mobile nav
    document.querySelectorAll('.mobile-nav-item').forEach(n => n.classList.remove('active'));
    const mobileItem = document.querySelector(`.mobile-nav-item[data-page="${page}"]`);
    if (mobileItem) mobileItem.classList.add('active');

    // Update title
    const titles = {
      'dashboard': 'Dashboard', 'classes': 'Classes', 'students': 'Students',
      'teachers': 'Teachers', 'lectures': 'Lectures', 'dpp': 'Daily Practice Problems',
      'audit': 'Classroom Audit', 'ai-insights': 'AI Insights',
      'notifications': 'Notifications', 'profile': 'Settings & Profile'
    };
    pageTitle.textContent = titles[page] || 'Dashboard';

    // Close mobile sidebar
    sidebar.classList.remove('mobile-open');
    sidebarOverlay.classList.remove('active');

    // Render page
    renderPage(page);
    window.scrollTo(0, 0);
  }

  // -- PAGE RENDERER --
  function renderPage(page) {
    switch(page) {
      case 'dashboard': renderDashboard(); break;
      case 'classes': renderClasses(); break;
      case 'students': renderStudents(); break;
      case 'teachers': renderTeachers(); break;
      case 'lectures': renderLectures(); break;
      case 'dpp': renderDPP(); break;
      case 'audit': renderAudit(); break;
      case 'ai-insights': renderAIInsights(); break;
      case 'notifications': renderNotifications(); break;
      case 'profile': renderProfile(); break;
      default: renderDashboard();
    }
  }

  // -- Helper: KPI Card HTML --
  function kpiCardHTML(icon, iconClass, value, label, change, trend) {
    const trendClass = trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'neutral';
    const arrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';
    return `<div class="kpi-card"><div class="kpi-icon ${iconClass}">${icon}</div><div class="kpi-value">${value}</div><div class="kpi-label">${label}</div><div class="kpi-trend ${trendClass}">${arrow} ${change}</div></div>`;
  }

  // Helper: Badge HTML
  function badgeHTML(text, type) {
    return `<span class="badge badge-dot badge-${type}">${text}</span>`;
  }

  // Helper: Progress Bar
  function progressHTML(value, color) {
    const fillClass = value >= 80 ? 'fill-success' : value >= 60 ? 'fill-blue' : value >= 40 ? 'fill-warning' : 'fill-danger';
    return `<div class="progress-bar-wrapper"><div class="progress-bar"><div class="progress-fill ${color || fillClass}" style="width:${value}%"></div></div><span class="progress-value">${value}%</span></div>`;
  }

  // Helper: Pagination
  function paginationHTML(total, currentPage, pageSize, onPageChange) {
    const totalPages = Math.ceil(total / pageSize);
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, total);
    let btns = '';
    btns += `<button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="${onPageChange}(${currentPage - 1})">‹</button>`;
    for (let i = 1; i <= Math.min(totalPages, 7); i++) {
      btns += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="${onPageChange}(${i})">${i}</button>`;
    }
    if (totalPages > 7) btns += `<button class="pagination-btn" disabled>…</button><button class="pagination-btn" onclick="${onPageChange}(${totalPages})">${totalPages}</button>`;
    btns += `<button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="${onPageChange}(${currentPage + 1})">›</button>`;
    return `<div class="table-pagination"><span class="pagination-info">Showing ${start}–${end} of ${total}</span><div class="pagination-controls">${btns}</div></div>`;
  }

  // ============================
  // DASHBOARD PAGE
  // ============================
  function renderDashboard() {
    const kpis = QlassData.dashboardKPIs;
    const recentActivities = [
      { color: 'var(--color-success)', text: 'Class 10A Mathematics unit test completed', time: '10 min ago' },
      { color: 'var(--color-secondary)', text: 'Prof. Rajesh Sharma uploaded Physics lecture recording', time: '25 min ago' },
      { color: 'var(--color-warning)', text: '15 students pending DPP submission for Trigonometry', time: '1 hour ago' },
      { color: 'var(--color-danger)', text: '3 students flagged as high-risk in Class 9B', time: '2 hours ago' },
      { color: 'var(--color-accent)', text: 'New teacher Dr. Garima Tiwari onboarded', time: '3 hours ago' },
      { color: 'var(--color-info)', text: 'Monthly audit report generated for June', time: '5 hours ago' }
    ];

    pageContent.innerHTML = `
      <div class="grid grid-4 stagger" style="margin-bottom:var(--space-6);">
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', 'blue', kpis.totalStudents.value, kpis.totalStudents.label, kpis.totalStudents.change + ' this month', kpis.totalStudents.trend)}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>', 'purple', kpis.activeClasses.value, kpis.activeClasses.label, 'All active', kpis.activeClasses.trend)}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>', 'green', kpis.avgAttendance.value, kpis.avgAttendance.label, kpis.avgAttendance.change + ' vs last month', kpis.avgAttendance.trend)}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>', 'orange', kpis.atRiskStudents.value, kpis.atRiskStudents.label, kpis.atRiskStudents.change + ' this week', 'down')}
      </div>

      <div class="grid grid-2" style="margin-bottom:var(--space-6);">
        <div class="card"><div class="card-header"><span class="card-title">Attendance Trend</span></div><div style="position:relative;"><canvas id="chartAttendance"></canvas></div></div>
        <div class="card"><div class="card-header"><span class="card-title">Class Performance</span></div><div style="position:relative;"><canvas id="chartPerformance"></canvas></div></div>
      </div>

      <div class="grid grid-3" style="margin-bottom:var(--space-6);">
        <div class="card" style="grid-column:span 2;">
          <div class="card-header"><span class="card-title">Recent Activity</span></div>
          ${recentActivities.map(a => `<div class="activity-item"><div class="activity-dot" style="background:${a.color}"></div><div><div class="activity-text">${a.text}</div><div class="activity-time">${a.time}</div></div></div>`).join('')}
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Quick Actions</span></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="quick-action" onclick="QlassApp.navigateTo('students')"><div class="quick-action-icon" style="background:var(--color-secondary-50);color:var(--color-secondary)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></div><span class="quick-action-label">Add Student</span></div>
            <div class="quick-action" onclick="QlassApp.navigateTo('classes')"><div class="quick-action-icon" style="background:var(--color-accent-50);color:var(--color-accent)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div><span class="quick-action-label">View Classes</span></div>
            <div class="quick-action" onclick="QlassApp.navigateTo('dpp')"><div class="quick-action-icon" style="background:var(--color-success-50);color:var(--color-success)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><span class="quick-action-label">Assign DPP</span></div>
            <div class="quick-action" onclick="QlassApp.navigateTo('ai-insights')"><div class="quick-action-icon" style="background:var(--color-warning-50);color:var(--color-warning)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/></svg></div><span class="quick-action-label">AI Reports</span></div>
          </div>
        </div>
      </div>
    `;

    // Render charts after DOM update
    setTimeout(() => {
      QlassCharts.lineChart('chartAttendance', QlassData.chartData.attendanceTrend, { height: 220 });
      QlassCharts.barChart('chartPerformance', QlassData.chartData.classPerformance, { height: 220, title: '' });
    }, 50);
  }

  // ============================
  // CLASSES PAGE
  // ============================
  function renderClasses() {
    const cls = QlassData.classes;
    pageContent.innerHTML = `
      <div class="page-header">
        <div class="page-header-left"><h2 class="page-header-title">Classes Management</h2><p class="page-header-desc">Manage all classes, sections, and academic progress</p></div>
        <div class="page-header-right">
          <button class="btn btn-secondary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Import</button>
          <button class="btn btn-primary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Create Class</button>
        </div>
      </div>

      <div class="table-container">
        <div class="table-toolbar">
          <div class="table-toolbar-left">
            <div class="table-search"><span class="search-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span><input type="text" placeholder="Search classes..."></div>
          </div>
          <div class="table-toolbar-right">
            <button class="btn btn-ghost btn-sm">Bulk Edit</button>
            <select class="form-select" style="width:auto;padding:8px 36px 8px 12px;font-size:12px;"><option>All Statuses</option><option>Active</option><option>Inactive</option></select>
          </div>
        </div>
        <table class="data-table">
          <thead><tr><th>Class</th><th>Section</th><th>Teacher</th><th>Students</th><th>Attendance</th><th>Syllabus Progress</th><th>Performance</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            ${cls.map(c => `<tr>
              <td><span class="font-semibold">${c.name}</span></td>
              <td>${c.section}</td>
              <td class="cell-name"><div class="cell-avatar">${c.teacher.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>${c.teacher}</td>
              <td>${c.students}</td>
              <td>${progressHTML(c.attendance)}</td>
              <td>${progressHTML(c.syllabusProgress, 'fill-purple')}</td>
              <td><span class="font-semibold" style="color:${c.performance >= 80 ? 'var(--color-success)' : c.performance >= 70 ? 'var(--color-secondary)' : 'var(--color-warning)'}">${c.performance}%</span></td>
              <td>${badgeHTML(c.status, 'success')}</td>
              <td><button class="btn btn-ghost btn-xs" onclick="QlassApp.openClassDrawer('${c.fullName}')">View</button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function openClassDrawer(className) {
    const cls = QlassData.classes.find(c => c.fullName === className);
    if (!cls) return;
    drawerTitle.textContent = `Class ${cls.fullName}`;
    drawerBody.innerHTML = `
      <div class="class-detail-tabs">
        <button class="class-detail-tab active">Overview</button>
        <button class="class-detail-tab">Timetable</button>
        <button class="class-detail-tab">Tests</button>
        <button class="class-detail-tab">Announcements</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
        <div class="kpi-card" style="padding:16px;"><div class="kpi-value" style="font-size:var(--text-lg);">${cls.students}</div><div class="kpi-label">Students</div></div>
        <div class="kpi-card" style="padding:16px;"><div class="kpi-value" style="font-size:var(--text-lg);">${cls.attendance}%</div><div class="kpi-label">Attendance</div></div>
        <div class="kpi-card" style="padding:16px;"><div class="kpi-value" style="font-size:var(--text-lg);">${cls.syllabusProgress}%</div><div class="kpi-label">Syllabus</div></div>
        <div class="kpi-card" style="padding:16px;"><div class="kpi-value" style="font-size:var(--text-lg);">${cls.performance}%</div><div class="kpi-label">Performance</div></div>
      </div>
      <h4 style="font-size:var(--text-sm);font-weight:var(--font-semibold);margin-bottom:12px;">Class Teacher</h4>
      <div class="cell-name" style="margin-bottom:20px;"><div class="cell-avatar">${cls.teacher.split(' ').map(w=>w[0]).join('').slice(0,2)}</div><div><div class="font-semibold">${cls.teacher}</div><div class="text-xs text-secondary">Assigned Teacher</div></div></div>
      <h4 style="font-size:var(--text-sm);font-weight:var(--font-semibold);margin-bottom:12px;">Upcoming Tests</h4>
      ${cls.upcomingTests.map(t => `<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--color-border-light);font-size:13px;"><span>${t.subject}</span><span class="text-secondary">${t.date}</span></div>`).join('')}
      <h4 style="font-size:var(--text-sm);font-weight:var(--font-semibold);margin:20px 0 12px;">Announcements</h4>
      ${cls.announcements.map(a => `<div style="padding:10px;background:var(--color-bg-secondary);border-radius:var(--radius-md);margin-bottom:8px;font-size:13px;"><div>${a.text}</div><div class="text-xs text-tertiary" style="margin-top:4px;">${a.date}</div></div>`).join('')}
    `;
    openDrawer();
  }

  // ============================
  // STUDENTS PAGE
  // ============================
  function renderStudents() {
    let filtered = [...QlassData.students];
    if (studentSearch) filtered = QlassData.searchStudents(studentSearch);
    if (studentClassFilter) filtered = filtered.filter(s => s.class === studentClassFilter);
    if (studentRiskFilter) filtered = filtered.filter(s => s.riskLevel === studentRiskFilter);

    const total = filtered.length;
    const paged = filtered.slice((studentPage - 1) * pageSize, studentPage * pageSize);
    const active = filtered.filter(s => s.status === 'Active').length;
    const atRisk = filtered.filter(s => s.riskLevel === 'High' || s.riskLevel === 'Critical').length;
    const avgAtt = Math.round(filtered.reduce((a, s) => a + s.attendance, 0) / filtered.length);

    pageContent.innerHTML = `
      <div class="grid grid-4 stagger" style="margin-bottom:var(--space-6);">
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>', 'blue', total, 'Total Students', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>', 'green', active, 'Active Students', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>', 'red', atRisk, 'At-Risk Students', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>', 'orange', avgAtt + '%', 'Avg Attendance', '', 'neutral')}
      </div>

      <div class="table-container">
        <div class="table-toolbar">
          <div class="table-toolbar-left">
            <div class="table-search"><span class="search-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span><input type="text" placeholder="Search students..." value="${studentSearch}" id="studentSearchInput"></div>
            <select class="form-select" style="width:auto;padding:8px 36px 8px 12px;font-size:12px;" id="classFilter"><option value="">All Classes</option>${['8A','8B','9A','9B','10A','10B'].map(c => `<option value="${c}" ${studentClassFilter===c?'selected':''}>${c}</option>`).join('')}</select>
            <select class="form-select" style="width:auto;padding:8px 36px 8px 12px;font-size:12px;" id="riskFilter"><option value="">All Risk</option>${['Low','Medium','High','Critical'].map(r => `<option value="${r}" ${studentRiskFilter===r?'selected':''}>${r}</option>`).join('')}</select>
          </div>
          <div class="table-toolbar-right">
            <button class="btn btn-secondary btn-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Export</button>
          </div>
        </div>
        <table class="data-table">
          <thead><tr><th>Student</th><th>Roll No</th><th>Class</th><th>Attendance</th><th>Avg Score</th><th>Pending DPP</th><th class="hide-mobile">Weak Topics</th><th>Risk</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            ${paged.map(s => {
              const riskType = s.riskLevel === 'Critical' ? 'danger' : s.riskLevel === 'High' ? 'warning' : s.riskLevel === 'Medium' ? 'info' : 'success';
              return `<tr>
                <td class="cell-name"><div class="cell-avatar" style="background:var(--color-${s.avatarColor === 'blue' ? 'secondary' : s.avatarColor === 'green' ? 'success' : s.avatarColor === 'purple' ? 'accent' : s.avatarColor === 'orange' ? 'warning' : 'danger'}-50);color:var(--color-${s.avatarColor === 'blue' ? 'secondary' : s.avatarColor === 'green' ? 'success' : s.avatarColor === 'purple' ? 'accent' : s.avatarColor === 'orange' ? 'warning' : 'danger'})">${s.initials}</div><div><div class="font-medium">${s.name}</div><div class="text-xs text-tertiary">${s.id}</div></div></td>
                <td>${s.rollNumber}</td>
                <td>${badgeHTML(s.class, 'info')}</td>
                <td><span style="color:${s.attendance >= 80 ? 'var(--color-success)' : s.attendance >= 65 ? 'var(--color-warning)' : 'var(--color-danger)'};font-weight:600;">${s.attendance}%</span></td>
                <td><span class="font-semibold">${s.avgScore}</span></td>
                <td><span style="color:${s.pendingDPP > 5 ? 'var(--color-danger)' : 'var(--color-text)'};">${s.pendingDPP}</span></td>
                <td class="hide-mobile">${s.weakTopics.length > 0 ? s.weakTopics.slice(0,2).map(t => `<span class="badge badge-neutral" style="margin:1px;">${t}</span>`).join('') : '—'}</td>
                <td>${badgeHTML(s.riskLevel, riskType)}</td>
                <td>${badgeHTML(s.status, s.status === 'Active' ? 'success' : 'neutral')}</td>
                <td><button class="btn btn-ghost btn-xs" onclick="QlassApp.openStudentDrawer('${s.id}')">View</button></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
        ${paginationHTML(total, studentPage, pageSize, 'QlassApp.goStudentPage')}
      </div>
    `;

    // Bind search & filters
    document.getElementById('studentSearchInput')?.addEventListener('input', e => {
      studentSearch = e.target.value; studentPage = 1; renderStudents();
    });
    document.getElementById('classFilter')?.addEventListener('change', e => {
      studentClassFilter = e.target.value; studentPage = 1; renderStudents();
    });
    document.getElementById('riskFilter')?.addEventListener('change', e => {
      studentRiskFilter = e.target.value; studentPage = 1; renderStudents();
    });
  }

  function goStudentPage(p) { studentPage = p; renderStudents(); }

  function openStudentDrawer(id) {
    const s = QlassData.getStudentById(id);
    if (!s) return;
    drawerTitle.textContent = s.name;
    const riskColor = s.riskLevel === 'Critical' ? 'danger' : s.riskLevel === 'High' ? 'warning' : s.riskLevel === 'Medium' ? 'info' : 'success';
    drawerBody.innerHTML = `
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px;">
        <div class="avatar avatar-lg avatar-${s.avatarColor}">${s.initials}</div>
        <div><h3 class="font-semibold" style="font-size:var(--text-lg);">${s.name}</h3><p class="text-sm text-secondary">${s.id} · Class ${s.class} · Roll ${s.rollNumber}</p></div>
      </div>
      <div class="class-detail-tabs"><button class="class-detail-tab active">Overview</button><button class="class-detail-tab">Marks</button><button class="class-detail-tab">Attendance</button><button class="class-detail-tab">Parent Info</button></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
        <div class="kpi-card" style="padding:14px;"><div class="kpi-value" style="font-size:var(--text-lg);">${s.attendance}%</div><div class="kpi-label">Attendance</div></div>
        <div class="kpi-card" style="padding:14px;"><div class="kpi-value" style="font-size:var(--text-lg);">${s.avgScore}</div><div class="kpi-label">Avg Score</div></div>
        <div class="kpi-card" style="padding:14px;"><div class="kpi-value" style="font-size:var(--text-lg);">${s.pendingDPP}</div><div class="kpi-label">Pending DPP</div></div>
        <div class="kpi-card" style="padding:14px;">${badgeHTML(s.riskLevel, riskColor)}<div class="kpi-label" style="margin-top:4px;">Risk Level</div></div>
      </div>
      <h4 style="font-size:var(--text-sm);font-weight:var(--font-semibold);margin-bottom:12px;">Subject Marks</h4>
      ${Object.entries(s.marks).map(([sub, mark]) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--color-border-light);font-size:13px;"><span style="text-transform:capitalize;">${sub}</span>${progressHTML(mark)}</div>`).join('')}
      <h4 style="font-size:var(--text-sm);font-weight:var(--font-semibold);margin:20px 0 12px;">Weak Topics</h4>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">${s.weakTopics.length ? s.weakTopics.map(t => `<span class="badge badge-warning">${t}</span>`).join('') : '<span class="text-sm text-secondary">No weak topics identified</span>'}</div>
      <h4 style="font-size:var(--text-sm);font-weight:var(--font-semibold);margin:20px 0 12px;">Parent Details</h4>
      <div style="font-size:13px;"><div style="margin-bottom:8px;"><span class="text-secondary">Name:</span> <span class="font-medium">${s.parentName}</span></div><div style="margin-bottom:8px;"><span class="text-secondary">Phone:</span> <span class="font-medium">${s.parentPhone}</span></div><div><span class="text-secondary">Email:</span> <span class="font-medium">${s.email.replace('student', 'parent')}</span></div></div>
    `;
    openDrawer();
  }

  // ============================
  // TEACHERS PAGE
  // ============================
  function renderTeachers() {
    let filtered = [...QlassData.teachers];
    if (teacherSearch) filtered = QlassData.searchTeachers(teacherSearch);
    const total = filtered.length;
    const paged = filtered.slice((teacherPage - 1) * pageSize, teacherPage * pageSize);
    const avgAudit = Math.round(filtered.reduce((a, t) => a + t.auditScore, 0) / total);
    const avgCompliance = Math.round(filtered.reduce((a, t) => a + t.recordingCompliance, 0) / total);
    const avgCoverage = Math.round(filtered.reduce((a, t) => a + t.topicCoverage, 0) / total);
    const avgSat = Math.round(filtered.reduce((a, t) => a + t.studentSatisfaction, 0) / total);

    pageContent.innerHTML = `
      <div class="grid grid-5 stagger" style="margin-bottom:var(--space-6);">
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>', 'blue', total, 'Total Teachers', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/></svg>', 'green', avgAudit + '%', 'Audit Score', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>', 'purple', avgCompliance + '%', 'Recording Compliance', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>', 'orange', avgCoverage + '%', 'Topic Coverage', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>', 'green', avgSat + '%', 'Satisfaction', '', 'neutral')}
      </div>

      <div class="table-container">
        <div class="table-toolbar">
          <div class="table-toolbar-left"><div class="table-search"><span class="search-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span><input type="text" placeholder="Search teachers..." value="${teacherSearch}" id="teacherSearchInput"></div></div>
          <div class="table-toolbar-right"><button class="btn btn-primary btn-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Teacher</button></div>
        </div>
        <table class="data-table">
          <thead><tr><th>Teacher</th><th>Subjects</th><th class="hide-mobile">Classes</th><th>Audit</th><th class="hide-mobile">Lectures</th><th class="hide-mobile">DPP Rate</th><th>Performance</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            ${paged.map(t => `<tr>
              <td class="cell-name"><div class="cell-avatar" style="background:var(--color-${t.avatarColor === 'blue' ? 'secondary' : t.avatarColor === 'green' ? 'success' : t.avatarColor === 'purple' ? 'accent' : t.avatarColor === 'orange' ? 'warning' : 'danger'}-50);color:var(--color-${t.avatarColor === 'blue' ? 'secondary' : t.avatarColor === 'green' ? 'success' : t.avatarColor === 'purple' ? 'accent' : t.avatarColor === 'orange' ? 'warning' : 'danger'})">${t.initials}</div><div><div class="font-medium">${t.name}</div><div class="text-xs text-tertiary">${t.id}</div></div></td>
              <td>${t.subjects.map(s => `<span class="badge badge-info" style="margin:1px;">${s}</span>`).join('')}</td>
              <td class="hide-mobile">${t.classes.join(', ')}</td>
              <td><span class="font-semibold" style="color:${t.auditScore >= 80 ? 'var(--color-success)' : t.auditScore >= 65 ? 'var(--color-warning)' : 'var(--color-danger)'}">${t.auditScore}%</span></td>
              <td class="hide-mobile">${progressHTML(t.lectureCompletion, 'fill-blue')}</td>
              <td class="hide-mobile">${t.dppAssignmentRate}%</td>
              <td>${progressHTML(t.studentPerformance)}</td>
              <td>${badgeHTML(t.status, t.status === 'Active' ? 'success' : t.status === 'On Leave' ? 'warning' : 'danger')}</td>
              <td><button class="btn btn-ghost btn-xs" onclick="QlassApp.openTeacherDrawer('${t.id}')">View</button></td>
            </tr>`).join('')}
          </tbody>
        </table>
        ${paginationHTML(total, teacherPage, pageSize, 'QlassApp.goTeacherPage')}
      </div>
    `;
    document.getElementById('teacherSearchInput')?.addEventListener('input', e => {
      teacherSearch = e.target.value; teacherPage = 1; renderTeachers();
    });
  }

  function goTeacherPage(p) { teacherPage = p; renderTeachers(); }

  function openTeacherDrawer(id) {
    const t = QlassData.getTeacherById(id);
    if (!t) return;
    drawerTitle.textContent = t.name;
    drawerBody.innerHTML = `
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px;">
        <div class="avatar avatar-lg avatar-${t.avatarColor}">${t.initials}</div>
        <div><h3 class="font-semibold" style="font-size:var(--text-lg);">${t.name}</h3><p class="text-sm text-secondary">${t.id} · ${t.qualification} · ${t.experience}</p></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
        <div class="kpi-card" style="padding:14px;"><div class="kpi-value" style="font-size:var(--text-lg);">${t.auditScore}%</div><div class="kpi-label">Audit Score</div></div>
        <div class="kpi-card" style="padding:14px;"><div class="kpi-value" style="font-size:var(--text-lg);">${t.lectureCompletion}%</div><div class="kpi-label">Lecture Completion</div></div>
        <div class="kpi-card" style="padding:14px;"><div class="kpi-value" style="font-size:var(--text-lg);">${t.recordingCompliance}%</div><div class="kpi-label">Recording Compliance</div></div>
        <div class="kpi-card" style="padding:14px;"><div class="kpi-value" style="font-size:var(--text-lg);">${t.studentSatisfaction}%</div><div class="kpi-label">Student Satisfaction</div></div>
      </div>
      <h4 style="font-size:var(--text-sm);font-weight:var(--font-semibold);margin-bottom:12px;">Subjects</h4>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px;">${t.subjects.map(s => `<span class="badge badge-info">${s}</span>`).join('')}</div>
      <h4 style="font-size:var(--text-sm);font-weight:var(--font-semibold);margin-bottom:12px;">Assigned Classes</h4>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px;">${t.classes.map(c => `<span class="badge badge-purple">${c}</span>`).join('')}</div>
      <h4 style="font-size:var(--text-sm);font-weight:var(--font-semibold);margin-bottom:12px;">Contact</h4>
      <div style="font-size:13px;"><div style="margin-bottom:8px;"><span class="text-secondary">Email:</span> <span class="font-medium">${t.email}</span></div><div><span class="text-secondary">Phone:</span> <span class="font-medium">${t.phone}</span></div></div>
    `;
    openDrawer();
  }

  // ============================
  // LECTURES PAGE
  // ============================
  function renderLectures() {
    const lectures = QlassData.lectures.slice(0, 100); // Show first 100
    const upcoming = lectures.filter(l => l.status === 'Upcoming').length;
    const completed = lectures.filter(l => l.status === 'Completed').length;
    const missing = lectures.filter(l => l.recordingStatus === 'Missing').length;
    const paged = lectures.slice((lecturePage - 1) * pageSize, lecturePage * pageSize);

    pageContent.innerHTML = `
      <div class="grid grid-4 stagger" style="margin-bottom:var(--space-6);">
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>', 'blue', lectures.length, 'Total Lectures', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>', 'purple', upcoming, 'Upcoming', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>', 'green', completed, 'Completed', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>', 'red', missing, 'Missing Recordings', '', 'neutral')}
      </div>
      <div class="table-container">
        <div class="table-toolbar">
          <div class="table-toolbar-left"><div class="table-search"><span class="search-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span><input type="text" placeholder="Search lectures..."></div></div>
          <div class="table-toolbar-right"><button class="btn btn-primary btn-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Upload Recording</button></div>
        </div>
        <table class="data-table">
          <thead><tr><th>Lecture</th><th>Subject</th><th>Class</th><th class="hide-mobile">Duration</th><th>Recording</th><th class="hide-mobile">Coverage</th><th>Status</th></tr></thead>
          <tbody>
            ${paged.map(l => `<tr>
              <td><div class="font-medium">${l.title}</div><div class="text-xs text-tertiary">${l.date}</div></td>
              <td>${badgeHTML(l.subject, 'info')}</td>
              <td>${l.class}</td>
              <td class="hide-mobile">${l.duration}</td>
              <td>${badgeHTML(l.recordingStatus, l.recordingStatus === 'Available' ? 'success' : l.recordingStatus === 'Missing' ? 'danger' : 'neutral')}</td>
              <td class="hide-mobile">${l.topicCoverage > 0 ? progressHTML(l.topicCoverage) : '—'}</td>
              <td>${badgeHTML(l.status, l.status === 'Completed' ? 'success' : l.status === 'Upcoming' ? 'info' : 'neutral')}</td>
            </tr>`).join('')}
          </tbody>
        </table>
        ${paginationHTML(lectures.length, lecturePage, pageSize, 'QlassApp.goLecturePage')}
      </div>
    `;
  }
  function goLecturePage(p) { lecturePage = p; renderLectures(); }

  // ============================
  // DPP PAGE
  // ============================
  function renderDPP() {
    const dpp = QlassData.dpp;
    const totalDPP = dpp.length;
    const submitted = dpp.filter(d => d.submissionRate >= 80).length;
    const pending = dpp.filter(d => d.status === 'Pending').length;
    const avgScore = Math.round(dpp.reduce((a, d) => a + d.avgScore, 0) / totalDPP);
    const paged = dpp.slice((dppPage - 1) * pageSize, dppPage * pageSize);

    pageContent.innerHTML = `
      <div class="grid grid-4 stagger" style="margin-bottom:var(--space-6);">
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>', 'blue', totalDPP, 'Total DPP', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>', 'green', submitted, 'Submitted (80%+)', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>', 'orange', pending, 'Pending', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>', 'purple', avgScore + '%', 'Avg Score', '', 'neutral')}
      </div>
      <div class="grid grid-2" style="margin-bottom:var(--space-6);">
        <div class="card"><div class="card-header"><span class="card-title">Submission Trends</span></div><div><canvas id="dppChart"></canvas></div></div>
        <div class="card"><div class="card-header"><span class="card-title">Subject Scores</span></div><div><canvas id="subjectChart"></canvas></div></div>
      </div>
      <div class="table-container">
        <div class="table-toolbar"><div class="table-toolbar-left"><div class="table-search"><span class="search-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span><input type="text" placeholder="Search DPPs..."></div></div></div>
        <table class="data-table">
          <thead><tr><th>DPP Name</th><th>Class</th><th>Subject</th><th class="hide-mobile">Assigned</th><th>Submission</th><th>Avg Score</th><th>Status</th></tr></thead>
          <tbody>${paged.map(d => `<tr>
            <td class="font-medium">${d.name}</td><td>${d.class}</td><td>${badgeHTML(d.subject, 'info')}</td>
            <td class="hide-mobile">${d.assignedDate}</td><td>${progressHTML(d.submissionRate)}</td>
            <td><span class="font-semibold" style="color:${d.avgScore >= 70 ? 'var(--color-success)' : d.avgScore >= 50 ? 'var(--color-warning)' : 'var(--color-danger)'}">${d.avgScore}%</span></td>
            <td>${badgeHTML(d.status, d.status === 'Active' ? 'success' : 'warning')}</td>
          </tr>`).join('')}</tbody>
        </table>
        ${paginationHTML(totalDPP, dppPage, pageSize, 'QlassApp.goDppPage')}
      </div>
    `;
    setTimeout(() => {
      QlassCharts.barChart('dppChart', QlassData.chartData.dppSubmission, { height: 200, color: '#8B5CF6', title: '' });
      QlassCharts.barChart('subjectChart', QlassData.chartData.subjectScores, { height: 200, title: '' });
    }, 50);
  }
  function goDppPage(p) { dppPage = p; renderDPP(); }

  // ============================
  // AUDIT PAGE
  // ============================
  function renderAudit() {
    const audits = QlassData.audits;
    const avgScore = Math.round(audits.reduce((a, au) => a + au.auditScore, 0) / audits.length);
    const audited = audits.reduce((a, au) => a + au.lecturesAudited, 0);
    const compliance = Math.round(audits.reduce((a, au) => a + au.recordingCompliance, 0) / audits.length);
    const needSupport = audits.filter(a => a.needsSupport).length;

    pageContent.innerHTML = `
      <div class="grid grid-5 stagger" style="margin-bottom:var(--space-6);">
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/></svg>', 'green', avgScore + '%', 'Avg Audit Score', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>', 'blue', audited, 'Lectures Audited', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>', 'purple', compliance + '%', 'Recording Compliance', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>', 'orange', Math.round(audits.reduce((a, au) => a + au.topicCoverage, 0) / audits.length) + '%', 'Topic Coverage', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>', 'red', needSupport, 'Need Support', '', 'neutral')}
      </div>

      <div class="grid grid-2" style="margin-bottom:var(--space-6);">
        <div class="card">
          <div class="card-header"><span class="card-title">Teachers Needing Intervention</span></div>
          ${audits.filter(a => a.needsSupport).map(a => `<div class="risk-item"><div><div class="font-medium text-sm">${a.teacherName}</div><div class="text-xs text-secondary">${a.remarks}</div></div><span class="risk-score risk-high">${a.auditScore}%</span></div>`).join('') || '<p class="text-sm text-secondary" style="padding:12px 0;">All teachers performing well!</p>'}
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Top Performers</span></div>
          ${audits.filter(a => a.auditScore >= 85).slice(0, 6).map(a => `<div class="risk-item"><div><div class="font-medium text-sm">${a.teacherName}</div><div class="text-xs text-secondary">${a.remarks}</div></div><span class="risk-score" style="background:var(--color-success-50);color:var(--color-success-dark);">${a.auditScore}%</span></div>`).join('')}
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead><tr><th>Teacher</th><th>Audit Score</th><th>Audited</th><th>Recording</th><th class="hide-mobile">Coverage</th><th>Performance</th><th>Remarks</th></tr></thead>
          <tbody>${audits.map(a => `<tr>
            <td class="font-medium">${a.teacherName}</td>
            <td><span class="font-semibold" style="color:${a.auditScore >= 80 ? 'var(--color-success)' : a.auditScore >= 65 ? 'var(--color-warning)' : 'var(--color-danger)'}">${a.auditScore}%</span></td>
            <td>${a.lecturesAudited}/${a.totalLectures}</td>
            <td>${progressHTML(a.recordingCompliance, 'fill-purple')}</td>
            <td class="hide-mobile">${progressHTML(a.topicCoverage)}</td>
            <td>${progressHTML(a.studentPerformance)}</td>
            <td>${badgeHTML(a.remarks, a.remarks === 'Excellent performance' ? 'success' : a.remarks === 'Satisfactory' ? 'info' : 'warning')}</td>
          </tr>`).join('')}</tbody>
        </table>
      </div>
    `;
  }

  // ============================
  // AI INSIGHTS PAGE
  // ============================
  function renderAIInsights() {
    const ai = QlassData.aiInsights;
    pageContent.innerHTML = `
      <div class="grid grid-4 stagger" style="margin-bottom:var(--space-6);">
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>', 'green', ai.studentsImproving, 'Students Improving', '', 'up')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>', 'red', ai.highRiskStudents, 'High Risk Students', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>', 'purple', ai.questionsAnalysed.toLocaleString(), 'Questions Analysed', '', 'neutral')}
        ${kpiCardHTML('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>', 'blue', ai.reportsGenerated, 'Reports Generated', '', 'neutral')}
      </div>

      <!-- AI Summary -->
      <div class="card" style="margin-bottom:var(--space-6);border-left:4px solid var(--color-accent);">
        <div class="card-header"><span class="card-title">🤖 AI Summary</span></div>
        <p style="font-size:var(--text-sm);line-height:1.7;color:var(--color-text-secondary);">${ai.summary}</p>
      </div>

      <div class="grid grid-2" style="margin-bottom:var(--space-6);">
        <!-- Risk Scores -->
        <div class="insight-card">
          <div class="insight-card-header"><span style="font-size:20px;">⚠️</span><span class="insight-card-title">Predictive Risk Scores</span></div>
          ${ai.predictiveRiskScores.map(r => `<div class="risk-item"><div><div class="font-medium text-sm">${r.name}</div><div class="text-xs text-secondary">Class ${r.class} · ${r.factors[0]}</div></div><span class="risk-score ${r.risk >= 80 ? 'risk-high' : 'risk-medium'}">${r.risk}%</span></div>`).join('')}
        </div>
        <!-- Improving Students -->
        <div class="insight-card">
          <div class="insight-card-header"><span style="font-size:20px;">📈</span><span class="insight-card-title">Students Improving</span></div>
          ${ai.improvingStudents.map(s => `<div class="risk-item"><div><div class="font-medium text-sm">${s.name}</div><div class="text-xs text-secondary">Class ${s.class} · ${s.area}</div></div><span class="risk-score" style="background:var(--color-success-50);color:var(--color-success-dark);">${s.improvement}</span></div>`).join('')}
        </div>
      </div>

      <!-- Recommendations -->
      <div class="card">
        <div class="card-header"><span class="card-title">💡 AI Recommendations</span><button class="btn btn-secondary btn-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download Report</button></div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${ai.recommendations.map((r, i) => `<div style="display:flex;gap:12px;align-items:flex-start;padding:12px 16px;background:var(--color-bg-secondary);border-radius:var(--radius-lg);font-size:var(--text-sm);"><span style="width:24px;height:24px;border-radius:50%;background:var(--color-secondary-50);color:var(--color-secondary);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">${i + 1}</span><span>${r}</span></div>`).join('')}
        </div>
      </div>
    `;
  }

  // ============================
  // NOTIFICATIONS PAGE
  // ============================
  function renderNotifications() {
    const notifs = QlassData.notifications;
    const typeIcons = { announcement: '📢', test: '📝', dpp: '📄', system: '⚙️', teacher: '👨‍🏫', student: '👨‍🎓' };
    const typeBg = { announcement: 'var(--color-secondary-50)', test: 'var(--color-accent-50)', dpp: 'var(--color-success-50)', system: 'var(--color-bg-secondary)', teacher: 'var(--color-warning-50)', student: 'var(--color-info-50)' };

    pageContent.innerHTML = `
      <div class="page-header"><div class="page-header-left"><h2 class="page-header-title">Notifications</h2><p class="page-header-desc">${notifs.filter(n => !n.read).length} unread notifications</p></div>
        <div class="page-header-right"><button class="btn btn-ghost btn-sm">Mark all as read</button></div>
      </div>
      <div class="card" style="padding:0;overflow:hidden;">
        ${notifs.map(n => `<div class="notif-item ${n.read ? '' : 'unread'}">
          <div class="notif-icon" style="background:${typeBg[n.type]}">${typeIcons[n.type]}</div>
          <div style="flex:1;"><div class="notif-title">${n.title}</div><div class="notif-message">${n.message}</div><div class="notif-time">${n.time}</div></div>
          ${n.read ? '' : '<div style="width:8px;height:8px;border-radius:50%;background:var(--color-secondary);flex-shrink:0;margin-top:6px;"></div>'}
        </div>`).join('')}
      </div>
    `;
  }

  // ============================
  // PROFILE / SETTINGS PAGE
  // ============================
  function renderProfile() {
    pageContent.innerHTML = `
      <div class="profile-section">
        <div class="profile-header">
          <div class="profile-avatar-lg">AK</div>
          <div class="profile-info"><h2>Ankit Kumar</h2><p>Super Admin · Delhi Public School, Dwarka</p><p style="margin-top:4px;">ankit.kumar@qlass.edu · +91 98765 43210</p></div>
        </div>
        <div style="display:flex;gap:12px;">
          <button class="btn btn-secondary">Edit Profile</button>
          <button class="btn btn-ghost">Change Password</button>
        </div>
      </div>

      <div class="grid grid-2">
        <div class="profile-section">
          <h3 style="font-size:var(--text-base);font-weight:var(--font-semibold);margin-bottom:var(--space-5);">Preferences</h3>
          <div class="settings-row"><div><div class="settings-label">Dark Mode</div><div class="settings-desc">Switch between light and dark theme</div></div><label class="switch"><input type="checkbox" id="darkModeSwitch" ${darkMode ? 'checked' : ''}><span class="switch-track"></span></label></div>
          <div class="settings-row"><div><div class="settings-label">Notifications</div><div class="settings-desc">Receive email and push notifications</div></div><label class="switch"><input type="checkbox" checked><span class="switch-track"></span></label></div>
          <div class="settings-row"><div><div class="settings-label">Language</div><div class="settings-desc">Application language</div></div><select class="form-select" style="width:120px;padding:6px 32px 6px 12px;font-size:12px;"><option>English</option><option>Hindi</option></select></div>
        </div>

        <div class="profile-section">
          <h3 style="font-size:var(--text-base);font-weight:var(--font-semibold);margin-bottom:var(--space-5);">Security</h3>
          <div class="settings-row"><div><div class="settings-label">Two-Factor Auth</div><div class="settings-desc">Add extra security to your account</div></div><label class="switch"><input type="checkbox"><span class="switch-track"></span></label></div>
          <div class="settings-row"><div><div class="settings-label">Active Sessions</div><div class="settings-desc">2 devices currently active</div></div><button class="btn btn-ghost btn-xs">Manage</button></div>
          <div class="settings-row" style="border-bottom:none;"><div><div class="settings-label" style="color:var(--color-danger);">Logout</div><div class="settings-desc">Sign out from your account</div></div><button class="btn btn-danger btn-xs" onclick="window.location.href='index.html'">Logout</button></div>
        </div>
      </div>

      <div class="profile-section">
        <h3 style="font-size:var(--text-base);font-weight:var(--font-semibold);margin-bottom:var(--space-5);">Activity Log</h3>
        <div class="activity-item"><div class="activity-dot" style="background:var(--color-success)"></div><div><div class="activity-text">Logged in from Chrome on Windows</div><div class="activity-time">Today, 4:15 AM</div></div></div>
        <div class="activity-item"><div class="activity-dot" style="background:var(--color-secondary)"></div><div><div class="activity-text">Updated student records for Class 10A</div><div class="activity-time">Yesterday, 6:30 PM</div></div></div>
        <div class="activity-item"><div class="activity-dot" style="background:var(--color-accent)"></div><div><div class="activity-text">Generated monthly audit report</div><div class="activity-time">Yesterday, 2:00 PM</div></div></div>
        <div class="activity-item"><div class="activity-dot" style="background:var(--color-warning)"></div><div><div class="activity-text">Assigned DPP to Class 9A and 9B</div><div class="activity-time">2 days ago</div></div></div>
      </div>
    `;

    // Bind dark mode toggle
    document.getElementById('darkModeSwitch')?.addEventListener('change', function() {
      toggleDarkMode();
    });
  }

  // ============================
  // DRAWER
  // ============================
  function openDrawer() {
    drawer.classList.add('open');
    drawerOverlay.classList.add('open');
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
  }

  // ============================
  // DARK MODE
  // ============================
  function toggleDarkMode() {
    darkMode = !darkMode;
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('qlass-theme', darkMode ? 'dark' : 'light');
  }

  // ============================
  // INIT
  // ============================
  function init() {
    // Load saved theme
    const savedTheme = localStorage.getItem('qlass-theme');
    if (savedTheme === 'dark') {
      darkMode = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Sidebar navigation
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      item.addEventListener('click', () => navigateTo(item.dataset.page));
    });

    // Mobile navigation
    document.querySelectorAll('.mobile-nav-item[data-page]').forEach(item => {
      item.addEventListener('click', () => navigateTo(item.dataset.page));
    });

    // Sidebar toggle (desktop)
    document.getElementById('sidebarToggle')?.addEventListener('click', () => {
      sidebarCollapsed = !sidebarCollapsed;
      sidebar.classList.toggle('collapsed', sidebarCollapsed);
    });

    // Hamburger (mobile)
    document.getElementById('hamburgerBtn')?.addEventListener('click', () => {
      sidebar.classList.add('mobile-open');
      sidebarOverlay.classList.add('active');
    });
    sidebarOverlay?.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      sidebarOverlay.classList.remove('active');
    });

    // Drawer close
    document.getElementById('drawerClose')?.addEventListener('click', closeDrawer);
    drawerOverlay?.addEventListener('click', closeDrawer);

    // Theme toggle
    document.getElementById('themeToggle')?.addEventListener('click', toggleDarkMode);

    // Notification bell -> navigate
    document.getElementById('notifBtn')?.addEventListener('click', () => navigateTo('notifications'));

    // Global search
    document.getElementById('globalSearch')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = e.target.value.trim();
        if (q) { studentSearch = q; navigateTo('students'); }
      }
    });

    // Keyboard shortcut ⌘K
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('globalSearch')?.focus();
      }
    });

    // Render initial page
    renderDashboard();
  }

  // Start
  document.addEventListener('DOMContentLoaded', init);

  // Public API
  return {
    navigateTo,
    openClassDrawer,
    openStudentDrawer,
    openTeacherDrawer,
    goStudentPage,
    goTeacherPage,
    goLecturePage,
    goDppPage
  };
})();
