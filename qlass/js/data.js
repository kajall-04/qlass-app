/* ============================================
   QLASS DUMMY DATA
   Students (500), Teachers (40), Classes, Lectures, DPP, Audits
   ============================================ */

const QlassData = (function() {
  'use strict';

  // -- Helpers --
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = arr => arr[rand(0, arr.length - 1)];
  const pickN = (arr, n) => { const s = [...arr]; for(let i=s.length-1;i>0;i--){const j=rand(0,i);[s[i],s[j]]=[s[j],s[i]];} return s.slice(0,n); };

  const firstNames = ['Aarav','Vivaan','Aditya','Vihaan','Arjun','Sai','Reyansh','Ayaan','Krishna','Ishaan','Shaurya','Atharv','Advik','Pranav','Advaith','Aarush','Kabir','Rudra','Dhruv','Darsh','Ananya','Diya','Saanvi','Aanya','Aadhya','Isha','Pari','Anvi','Myra','Sara','Kiara','Riya','Priya','Meera','Nisha','Kavya','Tanya','Pooja','Shreya','Aisha','Aryan','Rohan','Karan','Nikhil','Rahul','Amit','Vikram','Suresh','Raj','Dev','Neha','Sakshi','Tanvi','Simran','Anjali','Sneha','Ritika','Palak','Divya','Mansi','Harsh','Gaurav','Varun','Mohit','Sahil','Akash','Yash','Kunal','Siddharth','Naman','Rhea','Anika','Zara','Trisha','Lavanya','Nandini','Radhika','Sanya','Kritika','Mahi'];
  const lastNames = ['Sharma','Patel','Singh','Kumar','Gupta','Verma','Joshi','Reddy','Nair','Menon','Iyer','Pillai','Chopra','Malhotra','Kapoor','Mehta','Shah','Rao','Das','Mukherjee','Banerjee','Chatterjee','Agarwal','Saxena','Tiwari','Pandey','Mishra','Dubey','Srivastava','Chauhan','Thakur','Rawat','Bhat','Hegde','Kulkarni','Deshmukh','Patil','Deshpande','Kamat','Shetty'];
  const subjects = ['Mathematics','Physics','Chemistry','Biology','English','Hindi','Computer Science','History','Geography','Economics','Political Science','Accountancy','Business Studies','Physical Education','Art & Design'];
  const weakTopics = ['Trigonometry','Calculus','Organic Chemistry','Thermodynamics','Electromagnetic Waves','Algebra','Probability','Genetics','Cell Biology','Grammar','Comprehension','Data Structures','Algorithms','Integration','Differentiation','Matrices','Vectors','Chemical Bonding','Coordination Compounds','Kinematics','Optics','Fluid Mechanics','Statistics','Mensuration','Circles'];
  const classNames = ['8A','8B','9A','9B','10A','10B'];
  const sections = ['A','B'];
  const statuses = ['Active','Inactive','Suspended'];
  const riskLevels = ['Low','Medium','High','Critical'];
  const teacherStatuses = ['Active','On Leave','Probation'];

  // -- Avatar color generator --
  const avatarColors = ['blue','green','purple','orange','red'];
  function getInitials(name) {
    const parts = name.split(' ');
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
  }

  // ========================
  // STUDENTS (500)
  // ========================
  function generateStudents(count) {
    const students = [];
    for (let i = 0; i < count; i++) {
      const firstName = pick(firstNames);
      const lastName = pick(lastNames);
      const name = firstName + ' ' + lastName;
      const cls = pick(classNames);
      const attendance = rand(45, 100);
      const avgScore = rand(25, 98);
      const pendingDPP = rand(0, 12);
      const numWeakTopics = rand(0, 4);
      let riskLevel = 'Low';
      if (attendance < 60 || avgScore < 40) riskLevel = 'Critical';
      else if (attendance < 70 || avgScore < 50) riskLevel = 'High';
      else if (attendance < 80 || avgScore < 65) riskLevel = 'Medium';

      students.push({
        id: 'STU-' + String(i + 1).padStart(4, '0'),
        rollNumber: cls.replace(/[AB]/, '') + String(rand(1, 60)).padStart(2, '0'),
        name,
        initials: getInitials(name),
        avatarColor: pick(avatarColors),
        class: cls,
        gender: i % 3 === 0 ? 'Female' : 'Male',
        email: firstName.toLowerCase() + '.' + lastName.toLowerCase() + '@student.qlass.edu',
        phone: '+91 ' + rand(70000, 99999) + ' ' + rand(10000, 99999),
        parentName: pick(firstNames) + ' ' + lastName,
        parentPhone: '+91 ' + rand(70000, 99999) + ' ' + rand(10000, 99999),
        attendance,
        avgScore,
        pendingDPP,
        weakTopics: pickN(weakTopics, numWeakTopics),
        riskLevel,
        status: attendance < 50 ? 'Inactive' : 'Active',
        joinDate: `2025-0${rand(4, 7)}-${String(rand(1, 28)).padStart(2, '0')}`,
        lastActive: `2026-06-${String(rand(1, 21)).padStart(2, '0')}`,
        marks: {
          math: rand(20, 100),
          physics: rand(20, 100),
          chemistry: rand(20, 100),
          english: rand(30, 100),
          hindi: rand(30, 100),
          cs: rand(25, 100)
        }
      });
    }
    return students;
  }

  // ========================
  // TEACHERS (40)
  // ========================
  function generateTeachers(count) {
    const teachers = [];
    const teacherFirstNames = ['Dr. Anita','Prof. Rajesh','Dr. Sunita','Prof. Manoj','Dr. Priya','Prof. Sunil','Dr. Kavita','Prof. Arun','Dr. Deepa','Prof. Vikram','Dr. Neelam','Prof. Sanjay','Dr. Meena','Prof. Ashok','Dr. Rekha','Prof. Ramesh','Dr. Pooja','Prof. Dinesh','Dr. Swati','Prof. Mohan','Dr. Archana','Prof. Nitin','Dr. Rashmi','Prof. Gaurav','Dr. Shobha','Prof. Prakash','Dr. Anjali','Prof. Hemant','Dr. Sapna','Prof. Ravi','Dr. Seema','Prof. Alok','Dr. Usha','Prof. Vinod','Dr. Garima','Prof. Sandeep','Dr. Nidhi','Prof. Tarun','Dr. Jyoti','Prof. Manish'];

    for (let i = 0; i < count; i++) {
      const name = teacherFirstNames[i] + ' ' + pick(lastNames);
      const assignedSubjects = pickN(subjects, rand(1, 3));
      const assignedClasses = pickN(classNames, rand(2, 4));
      const auditScore = rand(55, 100);
      const lectureCompletion = rand(60, 100);
      const dppRate = rand(50, 100);
      const studentPerformance = rand(55, 95);
      const satisfaction = rand(60, 100);

      teachers.push({
        id: 'TCH-' + String(i + 1).padStart(3, '0'),
        name,
        initials: getInitials(name.replace(/Dr\.\s|Prof\.\s/, '')),
        avatarColor: pick(avatarColors),
        email: name.replace(/Dr\.\s|Prof\.\s/, '').split(' ')[0].toLowerCase() + '.' + name.split(' ').pop().toLowerCase() + '@qlass.edu',
        phone: '+91 ' + rand(70000, 99999) + ' ' + rand(10000, 99999),
        subjects: assignedSubjects,
        classes: assignedClasses,
        auditScore,
        lectureCompletion,
        dppAssignmentRate: dppRate,
        studentPerformance,
        studentSatisfaction: satisfaction,
        recordingCompliance: rand(65, 100),
        topicCoverage: rand(60, 100),
        status: auditScore < 60 ? 'Probation' : pick(['Active', 'Active', 'Active', 'On Leave']),
        joinDate: `202${rand(0, 4)}-0${rand(1, 9)}-${String(rand(1, 28)).padStart(2, '0')}`,
        experience: rand(2, 25) + ' years',
        qualification: pick(['M.Sc.', 'Ph.D.', 'M.Ed.', 'M.A.', 'B.Tech + M.Ed.', 'M.Phil.'])
      });
    }
    return teachers;
  }

  // ========================
  // CLASSES
  // ========================
  const classes = [
    { id:'CLS-001', name:'Class 8', section:'A', fullName:'8A', subject:'General', teacher:'Prof. Rajesh Sharma', students: 48, attendance: 87, syllabusProgress: 72, performance: 78, status:'Active' },
    { id:'CLS-002', name:'Class 8', section:'B', fullName:'8B', subject:'General', teacher:'Dr. Anita Patel', students: 45, attendance: 91, syllabusProgress: 68, performance: 82, status:'Active' },
    { id:'CLS-003', name:'Class 9', section:'A', fullName:'9A', subject:'General', teacher:'Prof. Sunil Kumar', students: 52, attendance: 83, syllabusProgress: 75, performance: 71, status:'Active' },
    { id:'CLS-004', name:'Class 9', section:'B', fullName:'9B', subject:'General', teacher:'Dr. Kavita Singh', students: 50, attendance: 85, syllabusProgress: 80, performance: 76, status:'Active' },
    { id:'CLS-005', name:'Class 10', section:'A', fullName:'10A', subject:'General', teacher:'Prof. Vikram Gupta', students: 55, attendance: 89, syllabusProgress: 82, performance: 84, status:'Active' },
    { id:'CLS-006', name:'Class 10', section:'B', fullName:'10B', subject:'General', teacher:'Dr. Deepa Verma', students: 53, attendance: 86, syllabusProgress: 78, performance: 79, status:'Active' }
  ];

  // Enhance classes with more data
  classes.forEach(c => {
    c.timetable = [
      { day:'Monday', periods: ['Mathematics','English','Physics','Chemistry','Hindi','CS'] },
      { day:'Tuesday', periods: ['Physics','Chemistry','Mathematics','English','PE','Biology'] },
      { day:'Wednesday', periods: ['English','Hindi','CS','Mathematics','Chemistry','Physics'] },
      { day:'Thursday', periods: ['Biology','Mathematics','English','Physics','Art','Chemistry'] },
      { day:'Friday', periods: ['CS','Physics','Hindi','Mathematics','English','Chemistry'] },
      { day:'Saturday', periods: ['Mathematics','Physics','Chemistry','English','Test','Review'] }
    ];
    c.upcomingTests = [
      { subject: 'Mathematics', date: '2026-06-25', type: 'Unit Test' },
      { subject: 'Physics', date: '2026-06-28', type: 'Surprise Quiz' },
      { subject: 'English', date: '2026-07-02', type: 'Monthly Exam' }
    ];
    c.announcements = [
      { text: 'Parent-Teacher meeting scheduled for June 30', date: '2026-06-18', type: 'info' },
      { text: 'Annual sports day registration open', date: '2026-06-15', type: 'success' }
    ];
  });

  // ========================
  // LECTURES
  // ========================
  function generateLectures() {
    const lectures = [];
    const lectureTopics = {
      'Mathematics': ['Quadratic Equations','Linear Algebra','Trigonometric Functions','Probability & Statistics','Calculus Introduction','Coordinate Geometry','Matrices & Determinants','Sets & Relations'],
      'Physics': ['Newton\'s Laws','Electromagnetic Waves','Thermodynamics','Optics','Kinematics','Work Energy Power','Waves & Sound','Electric Current'],
      'Chemistry': ['Chemical Bonding','Organic Chemistry Basics','Periodic Table','Acids & Bases','Coordination Compounds','Electrochemistry','Solutions','Chemical Kinetics'],
      'English': ['Shakespeare Analysis','Essay Writing','Comprehension Skills','Grammar Advanced','Literature Review','Creative Writing','Debate Skills','Poetry Analysis'],
      'Computer Science': ['Data Structures','Algorithms','Python Programming','Database Management','Networking Basics','Web Development','OOP Concepts','Cyber Security']
    };

    let id = 1;
    const months = ['2026-01','2026-02','2026-03','2026-04','2026-05','2026-06'];

    months.forEach(month => {
      Object.entries(lectureTopics).forEach(([subject, topics]) => {
        topics.forEach(topic => {
          classNames.forEach(cls => {
            const day = String(rand(1, 28)).padStart(2, '0');
            const completed = month < '2026-06' || (month === '2026-06' && parseInt(day) < 20);
            const duration = rand(35, 55);
            const hasRecording = completed ? Math.random() > 0.15 : false;
            const topicCoverage = completed ? rand(70, 100) : 0;
            const studentAttendance = completed ? rand(65, 100) : 0;

            lectures.push({
              id: 'LEC-' + String(id++).padStart(4, '0'),
              title: topic,
              subject,
              teacher: pick(generateTeachers(1)).name || 'Prof. ' + pick(lastNames),
              class: cls,
              date: month + '-' + day,
              duration: duration + ' min',
              status: completed ? 'Completed' : (month === '2026-06' && parseInt(day) >= 20 ? 'Upcoming' : 'Scheduled'),
              hasRecording,
              recordingStatus: hasRecording ? 'Available' : (completed ? 'Missing' : 'N/A'),
              topicCoverage,
              studentAttendance
            });
          });
        });
      });
    });

    return lectures.slice(0, 600); // Limit to 600
  }

  // ========================
  // DPP (Daily Practice Problems)
  // ========================
  function generateDPP() {
    const dppList = [];
    const dppNames = ['DPP-Quadratic Equations','DPP-Trigonometry','DPP-Organic Chemistry','DPP-Newton Laws','DPP-Probability','DPP-Coordinate Geometry','DPP-Chemical Bonding','DPP-Electromagnetic Induction','DPP-Grammar Advanced','DPP-Calculus','DPP-Thermodynamics','DPP-Data Structures','DPP-Kinematics','DPP-Acids & Bases','DPP-Statistics','DPP-Matrices','DPP-Optics','DPP-Essay Writing','DPP-Algorithms','DPP-Electric Current'];

    let id = 1;
    dppNames.forEach(name => {
      classNames.forEach(cls => {
        const subjectMatch = name.includes('Equation') || name.includes('Trigonometry') || name.includes('Calculus') || name.includes('Probability') || name.includes('Coordinate') || name.includes('Statistics') || name.includes('Matrices') ? 'Mathematics' :
          name.includes('Chemistry') || name.includes('Bonding') || name.includes('Acids') ? 'Chemistry' :
          name.includes('Newton') || name.includes('Electromagnetic') || name.includes('Thermodynamics') || name.includes('Kinematics') || name.includes('Optics') || name.includes('Electric') ? 'Physics' :
          name.includes('Grammar') || name.includes('Essay') ? 'English' : 'Computer Science';

        dppList.push({
          id: 'DPP-' + String(id++).padStart(3, '0'),
          name: name,
          class: cls,
          subject: subjectMatch,
          assignedDate: `2026-06-${String(rand(1, 20)).padStart(2, '0')}`,
          dueDate: `2026-06-${String(rand(20, 30)).padStart(2, '0')}`,
          submissionRate: rand(30, 100),
          avgScore: rand(35, 95),
          totalStudents: rand(40, 55),
          submitted: rand(20, 55),
          weakStudents: rand(2, 15),
          status: Math.random() > 0.3 ? 'Active' : 'Pending'
        });
      });
    });
    return dppList;
  }

  // ========================
  // AUDIT DATA
  // ========================
  function generateAudits(teachers) {
    return teachers.map(t => ({
      teacherId: t.id,
      teacherName: t.name,
      auditScore: t.auditScore,
      lecturesAudited: rand(10, 30),
      totalLectures: rand(30, 50),
      recordingCompliance: t.recordingCompliance,
      topicCoverage: t.topicCoverage,
      studentPerformance: t.studentPerformance,
      needsSupport: t.auditScore < 70,
      lastAuditDate: `2026-06-${String(rand(1, 20)).padStart(2, '0')}`,
      remarks: t.auditScore >= 85 ? 'Excellent performance' : t.auditScore >= 70 ? 'Satisfactory' : 'Needs improvement'
    }));
  }

  // ========================
  // AI INSIGHTS
  // ========================
  const aiInsights = {
    summary: 'Based on analysis of 500 students across 6 classes, overall academic performance is trending upward with a 3.2% improvement in average scores this month. However, 28 students have been flagged as high-risk requiring immediate intervention.',
    predictiveRiskScores: [
      { name: 'Aarav Sharma', class: '10A', risk: 92, factors: ['Attendance 48%', 'Declining scores', 'Missing 8 DPPs'] },
      { name: 'Priya Singh', class: '9B', risk: 87, factors: ['Attendance 52%', 'Failed last 2 tests', 'No parent meeting'] },
      { name: 'Rohan Kumar', class: '10B', risk: 85, factors: ['Score dropped 30%', 'Weak in 5 topics', 'Irregular attendance'] },
      { name: 'Ananya Gupta', class: '8A', risk: 78, factors: ['Missing assignments', 'Low class participation', 'Score declining'] },
      { name: 'Vivaan Patel', class: '9A', risk: 75, factors: ['Attendance 62%', 'Weak in Mathematics', 'Pending DPPs'] }
    ],
    improvingStudents: [
      { name: 'Diya Reddy', class: '8B', improvement: '+18%', area: 'Mathematics' },
      { name: 'Ishaan Nair', class: '10A', improvement: '+15%', area: 'Physics' },
      { name: 'Kavya Menon', class: '9A', improvement: '+12%', area: 'Chemistry' }
    ],
    recommendations: [
      'Schedule remedial classes for 28 high-risk students in Mathematics and Physics',
      'Increase DPP frequency for Class 9B — lowest submission rate at 62%',
      'Teacher audit required for 4 teachers with recording compliance below 70%',
      'Parent counseling sessions recommended for 12 students with attendance below 65%',
      'Consider peer tutoring program — top 15% students can mentor at-risk students'
    ],
    questionsAnalysed: 12500,
    reportsGenerated: 89,
    studentsImproving: 156,
    highRiskStudents: 28
  };

  // ========================
  // NOTIFICATIONS
  // ========================
  const notifications = [
    { id: 1, type: 'announcement', title: 'Annual Day preparations begin', message: 'All class teachers please submit student participation lists by June 25.', time: '2 hours ago', read: false },
    { id: 2, type: 'test', title: 'Class 10A Mathematics Unit Test', message: 'Scheduled for June 25, 2026. Syllabus: Chapters 1-5.', time: '3 hours ago', read: false },
    { id: 3, type: 'dpp', title: 'DPP submission deadline approaching', message: '15 students in Class 9B have not submitted DPP-Trigonometry.', time: '5 hours ago', read: true },
    { id: 4, type: 'system', title: 'System maintenance scheduled', message: 'Qlass will be under maintenance on June 22 from 2:00 AM to 4:00 AM IST.', time: '1 day ago', read: true },
    { id: 5, type: 'teacher', title: 'Dr. Kavita Singh on leave', message: 'Leave approved from June 23-25. Substitute teacher assigned.', time: '1 day ago', read: true },
    { id: 6, type: 'student', title: 'Attendance alert: 8 students below 65%', message: 'Immediate parent notification recommended for at-risk students.', time: '2 days ago', read: true },
    { id: 7, type: 'announcement', title: 'Mid-term exam schedule released', message: 'Exams start July 15. Detailed schedule available in the calendar.', time: '3 days ago', read: true },
    { id: 8, type: 'dpp', title: 'New DPP assigned: Organic Chemistry', message: 'Assigned to Class 10A and 10B. Due date: June 28.', time: '3 days ago', read: true }
  ];

  // ========================
  // DASHBOARD KPIs
  // ========================
  const dashboardKPIs = {
    totalStudents: { value: 303, change: '+12', trend: 'up', label: 'Total Students' },
    activeClasses: { value: 6, change: '0', trend: 'neutral', label: 'Active Classes' },
    avgAttendance: { value: '86.8%', change: '+2.3%', trend: 'up', label: 'Avg Attendance' },
    upcomingTests: { value: 8, change: '+3', trend: 'up', label: 'Upcoming Tests' },
    totalTeachers: { value: 40, change: '+2', trend: 'up', label: 'Total Teachers' },
    avgAuditScore: { value: '82.4', change: '+1.8', trend: 'up', label: 'Avg Audit Score' },
    pendingDPP: { value: 45, change: '-8', trend: 'down', label: 'Pending DPPs' },
    atRiskStudents: { value: 28, change: '-3', trend: 'down', label: 'At-Risk Students' }
  };

  // ========================
  // CHART DATA
  // ========================
  const chartData = {
    attendanceTrend: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun'],
      datasets: [
        { label: 'Overall', data: [82, 84, 81, 86, 88, 87], color: '#2563EB' },
        { label: 'Class 10', data: [85, 87, 83, 88, 90, 89], color: '#8B5CF6' },
        { label: 'Class 9', data: [80, 82, 79, 84, 86, 85], color: '#22C55E' }
      ]
    },
    classPerformance: {
      labels: ['8A','8B','9A','9B','10A','10B'],
      data: [78, 82, 71, 76, 84, 79],
      colors: ['#2563EB','#8B5CF6','#22C55E','#F59E0B','#EF4444','#06B6D4']
    },
    subjectScores: {
      labels: ['Math','Physics','Chemistry','English','Hindi','CS'],
      data: [72, 68, 74, 81, 78, 76],
      colors: ['#2563EB','#EF4444','#22C55E','#F59E0B','#8B5CF6','#06B6D4']
    },
    dppSubmission: {
      labels: ['Week 1','Week 2','Week 3','Week 4'],
      data: [78, 82, 75, 88],
      color: '#8B5CF6'
    }
  };

  // Generate all data
  const students = generateStudents(500);
  const teachers = generateTeachers(40);
  const lectures = generateLectures();
  const dpp = generateDPP();
  const audits = generateAudits(teachers);

  // Public API
  return {
    students,
    teachers,
    classes,
    lectures,
    dpp,
    audits,
    aiInsights,
    notifications,
    dashboardKPIs,
    chartData,
    getStudentsByClass: (cls) => students.filter(s => s.class === cls),
    getTeachersBySubject: (sub) => teachers.filter(t => t.subjects.includes(sub)),
    getAtRiskStudents: () => students.filter(s => s.riskLevel === 'High' || s.riskLevel === 'Critical'),
    getStudentById: (id) => students.find(s => s.id === id),
    getTeacherById: (id) => teachers.find(t => t.id === id),
    searchStudents: (query) => {
      const q = query.toLowerCase();
      return students.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.class.toLowerCase().includes(q));
    },
    searchTeachers: (query) => {
      const q = query.toLowerCase();
      return teachers.filter(t => t.name.toLowerCase().includes(q) || t.subjects.some(s => s.toLowerCase().includes(q)));
    }
  };
})();
