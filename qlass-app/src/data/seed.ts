import { Student, MonthlyAttendance, TestScore, Achievement } from "@/types/student";
import { Teacher, ScheduleItem, MonthlyPerformance } from "@/types/teacher";
import { ClassInfo, DaySchedule, PeriodItem, ClassSubject } from "@/types/class";
import { Lecture, DPP, Test, Notification, Announcement, CalendarEvent, DashboardKPI, ChartDataPoint } from "@/types/index";
import { randomBetween, pickRandom, pickRandomN, getInitials } from "@/lib/utils";
import { CLASSES, SUBJECTS, AVATAR_COLORS } from "@/lib/constants";

// ═══════════════════════════════════════
// NAME POOLS (Indian names for coaching context)
// ═══════════════════════════════════════
const firstNames = ["Aarav","Vivaan","Aditya","Vihaan","Arjun","Sai","Reyansh","Ayaan","Krishna","Ishaan","Shaurya","Atharv","Advik","Pranav","Advaith","Aarush","Kabir","Rudra","Dhruv","Darsh","Ananya","Diya","Saanvi","Aanya","Aadhya","Isha","Pari","Anvi","Myra","Sara","Kiara","Riya","Priya","Meera","Nisha","Kavya","Tanya","Pooja","Shreya","Aisha","Aryan","Rohan","Karan","Nikhil","Rahul","Amit","Vikram","Suresh","Raj","Dev","Neha","Sakshi","Tanvi","Simran","Anjali","Sneha","Ritika","Palak","Divya","Mansi","Harsh","Gaurav","Varun","Mohit","Sahil","Akash","Yash","Kunal","Siddharth","Naman","Rhea","Anika","Zara","Trisha","Lavanya","Nandini","Radhika","Sanya","Kritika","Mahi","Kajal","Komal","Payal","Jyoti","Swati","Rekha","Sunita","Poonam","Deepika","Madhuri"];
const lastNames = ["Sharma","Patel","Singh","Kumar","Gupta","Verma","Joshi","Reddy","Nair","Menon","Iyer","Pillai","Chopra","Malhotra","Kapoor","Mehta","Shah","Rao","Das","Mukherjee","Banerjee","Chatterjee","Agarwal","Saxena","Tiwari","Pandey","Mishra","Dubey","Srivastava","Chauhan","Thakur","Rawat","Bhat","Hegde","Kulkarni","Deshmukh","Patil","Deshpande","Kamat","Shetty","Pareek","Rathore","Solanki","Rajput","Yadav","Choudhary","Khatri","Arora","Bhatia","Tandon"];

const weakTopics = ["Trigonometry","Calculus","Organic Chemistry","Thermodynamics","Electromagnetic Waves","Algebra","Probability","Genetics","Cell Biology","Grammar","Data Structures","Algorithms","Integration","Differentiation","Matrices","Vectors","Chemical Bonding","Coordination Compounds","Kinematics","Optics","Fluid Mechanics","Statistics","Mensuration","Circles","Polynomials"];

const teacherFirstNames = ["Dr. Anita","Prof. Rajesh","Dr. Sunita","Prof. Manoj","Dr. Priya","Prof. Sunil","Dr. Kavita","Prof. Arun","Dr. Deepa","Prof. Vikram","Dr. Neelam","Prof. Sanjay","Dr. Meena","Prof. Ashok","Dr. Rekha","Prof. Ramesh","Dr. Pooja","Prof. Dinesh","Dr. Swati","Prof. Mohan","Dr. Archana","Prof. Nitin","Dr. Rashmi","Prof. Gaurav","Dr. Shobha","Prof. Prakash","Dr. Anjali","Prof. Hemant","Dr. Sapna","Prof. Ravi","Dr. Seema","Prof. Alok","Dr. Usha","Prof. Vinod","Dr. Garima","Prof. Sandeep","Dr. Nidhi","Prof. Tarun","Dr. Jyoti","Prof. Manish"];

const rooms = ["Room 101","Room 102","Room 103","Room 201","Room 202","Room 203","Room 301","Room 302","Lab A","Lab B","Lab C","Hall 1"];

const periodTimes = ["08:00 - 08:45","08:45 - 09:30","09:45 - 10:30","10:30 - 11:15","11:30 - 12:15","12:15 - 01:00","02:00 - 02:45","02:45 - 03:30"];

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const monthsFull = ["2025-07","2025-08","2025-09","2025-10","2025-11","2025-12","2026-01","2026-02","2026-03","2026-04","2026-05","2026-06"];

// ═══════════════════════════════════════
// STUDENTS (500)
// ═══════════════════════════════════════
function generateStudents(): Student[] {
  const students: Student[] = [];
  for (let i = 0; i < 500; i++) {
    const firstName = pickRandom(firstNames);
    const lastName = pickRandom(lastNames);
    const name = `${firstName} ${lastName}`;
    const cls = pickRandom([...CLASSES]);
    const section = cls.slice(-1);
    const attendance = randomBetween(45, 100);
    const avgScore = randomBetween(25, 98);
    const pendingDPP = randomBetween(0, 12);
    const numWeakTopics = randomBetween(0, 4);
    
    let riskLevel: Student["riskLevel"] = "Low";
    if (attendance < 60 || avgScore < 40) riskLevel = "Critical";
    else if (attendance < 70 || avgScore < 50) riskLevel = "High";
    else if (attendance < 80 || avgScore < 65) riskLevel = "Medium";

    const subjectMarks: Record<string, number> = {};
    SUBJECTS.forEach(s => { subjectMarks[s] = randomBetween(20, 100); });

    const monthlyAtt: MonthlyAttendance[] = monthsFull.map(m => {
      const total = randomBetween(22, 26);
      const present = randomBetween(Math.floor(total * 0.5), total);
      return { month: m, present, absent: total - present, total, percentage: Math.round((present / total) * 100) };
    });

    const testScores: TestScore[] = [];
    for (let t = 0; t < randomBetween(6, 12); t++) {
      const sub = pickRandom([...SUBJECTS]);
      const maxMarks = pickRandom([50, 100, 25, 30]);
      const obtained = randomBetween(Math.floor(maxMarks * 0.2), maxMarks);
      testScores.push({
        id: `TST-${i}-${t}`,
        name: `${pickRandom(["Unit Test", "Monthly Exam", "Surprise Quiz"])} ${t + 1}`,
        subject: sub,
        date: `2026-${String(randomBetween(1, 6)).padStart(2, "0")}-${String(randomBetween(1, 28)).padStart(2, "0")}`,
        maxMarks,
        obtainedMarks: obtained,
        percentage: Math.round((obtained / maxMarks) * 100),
        rank: randomBetween(1, 55),
        classAvg: randomBetween(40, 75),
      });
    }

    const achievementPool: Achievement[] = [
      { id: "a1", title: "Perfect Attendance", description: "100% attendance this month", icon: "🏆", date: "2026-05-01", type: "attendance" },
      { id: "a2", title: "Top Scorer", description: "Scored highest in class test", icon: "⭐", date: "2026-04-15", type: "academic" },
      { id: "a3", title: "DPP Streak", description: "Completed 30 DPPs in a row", icon: "🔥", date: "2026-03-20", type: "dpp" },
      { id: "a4", title: "Most Improved", description: "Improved 20% this quarter", icon: "📈", date: "2026-06-01", type: "academic" },
    ];

    students.push({
      id: `STU-${String(i + 1).padStart(4, "0")}`,
      rollNumber: `${cls.replace(/[AB]/, "")}${String(randomBetween(1, 60)).padStart(2, "0")}`,
      name,
      initials: getInitials(name),
      avatarColor: pickRandom([...AVATAR_COLORS]),
      class: cls,
      section,
      gender: i % 3 === 0 ? "Female" : "Male",
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@student.qlass.com`,
      phone: `+91 ${randomBetween(70000, 99999)} ${randomBetween(10000, 99999)}`,
      parentName: `${pickRandom(firstNames)} ${lastName}`,
      parentPhone: `+91 ${randomBetween(70000, 99999)} ${randomBetween(10000, 99999)}`,
      parentEmail: `${lastName.toLowerCase()}.parent@gmail.com`,
      attendance,
      avgScore,
      pendingDPP,
      pendingAssignments: randomBetween(0, 5),
      weakTopics: pickRandomN(weakTopics, numWeakTopics),
      riskLevel,
      status: attendance < 50 ? "Inactive" : "Active",
      joinDate: `2025-0${randomBetween(4, 7)}-${String(randomBetween(1, 28)).padStart(2, "0")}`,
      lastActive: `2026-06-${String(randomBetween(1, 21)).padStart(2, "0")}`,
      marks: subjectMarks,
      monthlyAttendance: monthlyAtt,
      testScores,
      achievements: pickRandomN(achievementPool, randomBetween(0, 3)),
      studyStreak: randomBetween(0, 45),
      rank: randomBetween(1, 500),
    });
  }
  // Assign proper ranks
  students.sort((a, b) => b.avgScore - a.avgScore);
  students.forEach((s, i) => { s.rank = i + 1; });
  return students;
}

// ═══════════════════════════════════════
// TEACHERS (40)
// ═══════════════════════════════════════
function generateTeachers(): Teacher[] {
  const teachers: Teacher[] = [];
  for (let i = 0; i < 40; i++) {
    const name = `${teacherFirstNames[i]} ${pickRandom(lastNames)}`;
    const assignedSubjects = pickRandomN([...SUBJECTS], randomBetween(1, 3));
    const assignedClasses = pickRandomN([...CLASSES], randomBetween(2, 4));
    const auditScore = randomBetween(55, 100);

    const schedule: ScheduleItem[] = [];
    for (let p = 0; p < randomBetween(3, 6); p++) {
      schedule.push({
        id: `SCH-${i}-${p}`,
        time: periodTimes[p],
        subject: pickRandom(assignedSubjects),
        class: pickRandom(assignedClasses),
        room: pickRandom(rooms),
        status: p < 2 ? "Completed" : p === 2 ? "Ongoing" : "Upcoming",
      });
    }

    const monthlyPerf: MonthlyPerformance[] = months.map(m => ({
      month: m,
      auditScore: randomBetween(55, 100),
      studentPerformance: randomBetween(55, 95),
      lectureCompletion: randomBetween(60, 100),
      dppRate: randomBetween(50, 100),
    }));

    teachers.push({
      id: `TCH-${String(i + 1).padStart(3, "0")}`,
      name,
      initials: getInitials(name),
      avatarColor: pickRandom([...AVATAR_COLORS]),
      email: `${name.replace(/Dr\.\s|Prof\.\s/, "").split(" ")[0].toLowerCase()}.${name.split(" ").pop()!.toLowerCase()}@qlass.com`,
      phone: `+91 ${randomBetween(70000, 99999)} ${randomBetween(10000, 99999)}`,
      subjects: assignedSubjects,
      classes: assignedClasses,
      auditScore,
      lectureCompletion: randomBetween(60, 100),
      dppAssignmentRate: randomBetween(50, 100),
      studentPerformance: randomBetween(55, 95),
      studentSatisfaction: randomBetween(60, 100),
      recordingCompliance: randomBetween(65, 100),
      topicCoverage: randomBetween(60, 100),
      status: auditScore < 60 ? "Probation" : (Math.random() > 0.85 ? "On Leave" : "Active"),
      joinDate: `202${randomBetween(0, 4)}-0${randomBetween(1, 9)}-${String(randomBetween(1, 28)).padStart(2, "0")}`,
      experience: `${randomBetween(2, 25)} years`,
      qualification: pickRandom(["M.Sc.", "Ph.D.", "M.Ed.", "M.A.", "B.Tech + M.Ed.", "M.Phil."]),
      totalStudents: randomBetween(80, 200),
      todayClasses: schedule,
      monthlyPerformance: monthlyPerf,
    });
  }
  return teachers;
}

// ═══════════════════════════════════════
// CLASSES (6)
// ═══════════════════════════════════════
function generateClasses(teachers: Teacher[]): ClassInfo[] {
  const classData: { name: string; section: string; fullName: string }[] = [
    { name: "Class 8", section: "A", fullName: "8A" },
    { name: "Class 8", section: "B", fullName: "8B" },
    { name: "Class 9", section: "A", fullName: "9A" },
    { name: "Class 9", section: "B", fullName: "9B" },
    { name: "Class 10", section: "A", fullName: "10A" },
    { name: "Class 10", section: "B", fullName: "10B" },
  ];

  return classData.map((c, i) => {
    const ct = teachers[i] || teachers[0];
    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const timetable: DaySchedule[] = days.map(day => ({
      day,
      periods: periodTimes.slice(0, 6).map((time, pi) => ({
        time,
        subject: SUBJECTS[pi % SUBJECTS.length],
        teacher: teachers[(i + pi) % teachers.length].name,
        room: rooms[i],
      })),
    }));

    const subjects: ClassSubject[] = SUBJECTS.slice(0, 6).map((s, si) => ({
      name: s,
      teacher: teachers[(i + si) % teachers.length].name,
      progress: randomBetween(55, 95),
      avgScore: randomBetween(50, 90),
    }));

    return {
      id: `CLS-${String(i + 1).padStart(3, "0")}`,
      name: c.name,
      section: c.section,
      fullName: c.fullName,
      classTeacher: ct.name,
      classTeacherId: ct.id,
      totalStudents: randomBetween(42, 58),
      attendance: randomBetween(80, 95),
      syllabusProgress: randomBetween(60, 90),
      performance: randomBetween(65, 90),
      status: "Active",
      room: rooms[i],
      timetable,
      upcomingTests: [
        { subject: "Mathematics", date: "2026-06-25", type: "Unit Test", maxMarks: 50 },
        { subject: "Physics", date: "2026-06-28", type: "Surprise Quiz", maxMarks: 25 },
        { subject: "English", date: "2026-07-02", type: "Monthly Exam", maxMarks: 100 },
      ],
      announcements: [
        { text: "Parent-Teacher meeting scheduled for June 30", date: "2026-06-18", type: "info" },
        { text: "Annual sports day registration open", date: "2026-06-15", type: "success" },
      ],
      subjects,
    };
  });
}

// ═══════════════════════════════════════
// LECTURES
// ═══════════════════════════════════════
function generateLectures(teachers: Teacher[]): Lecture[] {
  const lectures: Lecture[] = [];
  const topics: Record<string, string[]> = {
    Mathematics: ["Quadratic Equations","Linear Algebra","Trigonometric Functions","Probability & Statistics","Calculus Introduction","Coordinate Geometry"],
    Physics: ["Newton's Laws","Electromagnetic Waves","Thermodynamics","Optics","Kinematics","Work Energy Power"],
    Chemistry: ["Chemical Bonding","Organic Chemistry","Periodic Table","Acids & Bases","Electrochemistry","Solutions"],
    English: ["Shakespeare Analysis","Essay Writing","Comprehension Skills","Grammar Advanced","Literature Review","Creative Writing"],
    "Computer Science": ["Data Structures","Algorithms","Python Programming","Database Management","Web Development","OOP Concepts"],
  };

  let id = 1;
  Object.entries(topics).forEach(([subject, topicList]) => {
    topicList.forEach(topic => {
      CLASSES.forEach(cls => {
        const teacher = teachers.find(t => t.subjects.includes(subject)) || teachers[0];
        const month = randomBetween(1, 6);
        const day = randomBetween(1, 28);
        const completed = month < 6 || (month === 6 && day < 20);
        lectures.push({
          id: `LEC-${String(id++).padStart(4, "0")}`,
          title: topic,
          subject,
          teacher: teacher.name,
          teacherId: teacher.id,
          class: cls,
          date: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
          time: pickRandom(periodTimes),
          duration: `${randomBetween(35, 55)} min`,
          room: pickRandom(rooms),
          status: completed ? "Completed" : "Upcoming",
          hasRecording: completed ? Math.random() > 0.15 : false,
          recordingStatus: completed ? (Math.random() > 0.15 ? "Available" : "Missing") : "N/A",
          topicCoverage: completed ? randomBetween(70, 100) : 0,
          studentAttendance: completed ? randomBetween(65, 100) : 0,
          notes: completed ? "Lecture completed. Key concepts covered." : "",
        });
      });
    });
  });
  return lectures.slice(0, 600);
}

// ═══════════════════════════════════════
// DPP
// ═══════════════════════════════════════
function generateDPP(teachers: Teacher[]): DPP[] {
  const dppNames = ["Quadratic Equations","Trigonometry","Organic Chemistry","Newton Laws","Probability","Coordinate Geometry","Chemical Bonding","Electromagnetic Induction","Grammar Advanced","Calculus","Thermodynamics","Data Structures","Kinematics","Acids & Bases","Statistics","Matrices","Optics","Essay Writing","Algorithms","Electric Current"];
  const dppList: DPP[] = [];
  let id = 1;
  
  dppNames.forEach(name => {
    CLASSES.forEach(cls => {
      const subject = name.includes("Equation") || name.includes("Trigonometry") || name.includes("Calculus") || name.includes("Probability") || name.includes("Coordinate") || name.includes("Statistics") || name.includes("Matrices") ? "Mathematics" :
        name.includes("Chemistry") || name.includes("Bonding") || name.includes("Acids") ? "Chemistry" :
        name.includes("Newton") || name.includes("Electromagnetic") || name.includes("Thermodynamics") || name.includes("Kinematics") || name.includes("Optics") || name.includes("Electric") ? "Physics" :
        name.includes("Grammar") || name.includes("Essay") ? "English" : "Computer Science";
      
      const teacher = teachers.find(t => t.subjects.includes(subject)) || teachers[0];
      const assignDay = randomBetween(1, 20);
      const dueDay = randomBetween(assignDay + 2, 30);
      
      dppList.push({
        id: `DPP-${String(id++).padStart(3, "0")}`,
        name: `DPP - ${name}`,
        class: cls,
        subject,
        teacher: teacher.name,
        teacherId: teacher.id,
        assignedDate: `2026-06-${String(assignDay).padStart(2, "0")}`,
        dueDate: `2026-06-${String(Math.min(dueDay, 30)).padStart(2, "0")}`,
        totalQuestions: randomBetween(10, 30),
        submissionRate: randomBetween(30, 100),
        avgScore: randomBetween(35, 95),
        totalStudents: randomBetween(40, 55),
        submitted: randomBetween(20, 55),
        weakStudents: randomBetween(2, 15),
        status: Math.random() > 0.3 ? "Active" : "Pending",
        difficulty: pickRandom(["Easy", "Medium", "Hard"]),
      });
    });
  });
  return dppList;
}

// ═══════════════════════════════════════
// TESTS
// ═══════════════════════════════════════
function generateTests(teachers: Teacher[]): Test[] {
  const tests: Test[] = [];
  let id = 1;
  const testTypes: Test["type"][] = ["Unit Test", "Monthly Exam", "Surprise Quiz", "Mid-Term"];
  
  SUBJECTS.slice(0, 6).forEach(subject => {
    CLASSES.forEach(cls => {
      for (let t = 0; t < 3; t++) {
        const teacher = teachers.find(te => te.subjects.includes(subject)) || teachers[0];
        const maxMarks = pickRandom([25, 50, 100]);
        const avg = randomBetween(Math.floor(maxMarks * 0.35), Math.floor(maxMarks * 0.85));
        const month = randomBetween(1, 6);
        const day = randomBetween(1, 28);
        const completed = month < 6 || (month === 6 && day < 20);
        
        tests.push({
          id: `TEST-${String(id++).padStart(4, "0")}`,
          name: `${pickRandom(testTypes)} - ${subject}`,
          class: cls,
          subject,
          teacher: teacher.name,
          teacherId: teacher.id,
          date: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
          type: pickRandom(testTypes),
          maxMarks,
          avgScore: avg,
          highestScore: randomBetween(avg, maxMarks),
          lowestScore: randomBetween(Math.floor(maxMarks * 0.1), avg),
          passPercentage: randomBetween(60, 98),
          totalStudents: randomBetween(40, 55),
          appeared: randomBetween(35, 55),
          status: completed ? "Completed" : "Upcoming",
        });
      }
    });
  });
  return tests;
}

// ═══════════════════════════════════════
// NOTIFICATIONS
// ═══════════════════════════════════════
function generateNotifications(): Notification[] {
  return [
    { id: "n1", type: "announcement", title: "Annual Day preparations begin", message: "All class teachers please submit student participation lists by June 25.", time: "2 hours ago", date: "2026-06-21", read: false, priority: "high" },
    { id: "n2", type: "test", title: "Class 10A Mathematics Unit Test", message: "Scheduled for June 25, 2026. Syllabus: Chapters 1-5.", time: "3 hours ago", date: "2026-06-21", read: false, priority: "medium" },
    { id: "n3", type: "dpp", title: "DPP submission deadline approaching", message: "15 students in Class 9B have not submitted DPP-Trigonometry.", time: "5 hours ago", date: "2026-06-21", read: true, priority: "medium" },
    { id: "n4", type: "system", title: "System maintenance scheduled", message: "QLASS will be under maintenance on June 22 from 2:00 AM to 4:00 AM IST.", time: "1 day ago", date: "2026-06-20", read: true, priority: "low" },
    { id: "n5", type: "teacher", title: "Dr. Kavita Singh on leave", message: "Leave approved from June 23-25. Substitute teacher assigned.", time: "1 day ago", date: "2026-06-20", read: true, priority: "medium" },
    { id: "n6", type: "attendance", title: "Attendance alert: 8 students below 65%", message: "Immediate parent notification recommended for at-risk students.", time: "2 days ago", date: "2026-06-19", read: true, priority: "high" },
    { id: "n7", type: "announcement", title: "Mid-term exam schedule released", message: "Exams start July 15. Detailed schedule available in the calendar.", time: "3 days ago", date: "2026-06-18", read: true, priority: "medium" },
    { id: "n8", type: "dpp", title: "New DPP assigned: Organic Chemistry", message: "Assigned to Class 10A and 10B. Due date: June 28.", time: "3 days ago", date: "2026-06-18", read: true, priority: "low" },
    { id: "n9", type: "student", title: "New student enrolled", message: "Kajal Pareek enrolled in Class 10A. Welcome!", time: "4 days ago", date: "2026-06-17", read: true, priority: "low" },
    { id: "n10", type: "test", title: "Physics Quiz results published", message: "Class 9A average: 72%. Top scorer: Aarav Sharma (96%).", time: "5 days ago", date: "2026-06-16", read: true, priority: "low" },
  ];
}

// ═══════════════════════════════════════
// ANNOUNCEMENTS
// ═══════════════════════════════════════
function generateAnnouncements(): Announcement[] {
  return [
    { id: "ann1", title: "Annual Day Celebrations 2026", content: "Annual Day will be held on July 15, 2026. All students must participate in at least one event. Registration forms available from class teachers.", author: "Admin", authorRole: "Administrator", date: "2026-06-20", targetClasses: ["8A","8B","9A","9B","10A","10B"], type: "event", pinned: true },
    { id: "ann2", title: "Mid-Term Examination Schedule", content: "Mid-term examinations will commence from July 1, 2026. Detailed subject-wise schedule has been shared with class teachers. Students are advised to begin revision.", author: "Prof. Rajesh Sharma", authorRole: "Academic Head", date: "2026-06-18", targetClasses: ["9A","9B","10A","10B"], type: "exam", pinned: true },
    { id: "ann3", title: "Parent-Teacher Meeting", content: "PTM scheduled for June 30, 2026 (Saturday) from 10 AM to 2 PM. All parents are requested to attend.", author: "Admin", authorRole: "Administrator", date: "2026-06-15", targetClasses: ["8A","8B","9A","9B","10A","10B"], type: "general", pinned: false },
    { id: "ann4", title: "Summer Coaching Batch Starting", content: "Special summer coaching for Class 10 board preparation starts July 20. Limited seats available. Register at the office.", author: "Dr. Priya Sharma", authorRole: "Teacher", date: "2026-06-14", targetClasses: ["10A","10B"], type: "general", pinned: false },
    { id: "ann5", title: "Sports Day Registration Open", content: "Annual Sports Day on August 5. Events: Cricket, Football, Badminton, Athletics. Register with your PT teacher by July 10.", author: "Prof. Sunil Kumar", authorRole: "Sports In-charge", date: "2026-06-12", targetClasses: ["8A","8B","9A","9B","10A","10B"], type: "event", pinned: false },
    { id: "ann6", title: "Library Books Return Notice", content: "All library books must be returned by June 25. Late fee of ₹5/day will be applicable after the due date.", author: "Admin", authorRole: "Administrator", date: "2026-06-10", targetClasses: ["8A","8B","9A","9B","10A","10B"], type: "general", pinned: false },
  ];
}

// ═══════════════════════════════════════
// DASHBOARD KPIs
// ═══════════════════════════════════════
function generateDashboardKPIs(): Record<string, DashboardKPI> {
  return {
    totalStudents: { value: 303, change: "+12", trend: "up", label: "Total Students" },
    activeClasses: { value: 6, change: "0", trend: "neutral", label: "Active Classes" },
    avgAttendance: { value: "86.8%", change: "+2.3%", trend: "up", label: "Avg Attendance" },
    upcomingTests: { value: 8, change: "+3", trend: "up", label: "Upcoming Tests" },
    totalTeachers: { value: 40, change: "+2", trend: "up", label: "Total Teachers" },
    avgAuditScore: { value: "82.4", change: "+1.8", trend: "up", label: "Avg Audit Score" },
    pendingDPP: { value: 45, change: "-8", trend: "down", label: "Pending DPPs" },
    atRiskStudents: { value: 28, change: "-3", trend: "down", label: "At-Risk Students" },
  };
}

// ═══════════════════════════════════════
// CHART DATA
// ═══════════════════════════════════════
function generateChartData() {
  return {
    attendanceTrend: months.slice(0, 6).map(m => ({
      name: m,
      "Overall": randomBetween(80, 92),
      "Class 10": randomBetween(83, 95),
      "Class 9": randomBetween(78, 90),
      "Class 8": randomBetween(82, 93),
    })),
    classPerformance: CLASSES.map(c => ({
      name: c,
      score: randomBetween(65, 92),
    })),
    subjectScores: SUBJECTS.slice(0, 6).map(s => ({
      name: s.length > 10 ? s.slice(0, 10) + "." : s,
      score: randomBetween(55, 90),
    })),
    dppSubmission: ["Week 1","Week 2","Week 3","Week 4"].map(w => ({
      name: w,
      rate: randomBetween(65, 95),
    })),
    monthlyPerformance: months.map(m => ({
      name: m,
      avg: randomBetween(60, 85),
      highest: randomBetween(85, 100),
      lowest: randomBetween(20, 50),
    })),
  };
}

// ═══════════════════════════════════════
// AI INSIGHTS
// ═══════════════════════════════════════
function generateAIInsights() {
  return {
    summary: "Based on analysis of 500 students across 6 classes, overall academic performance is trending upward with a 3.2% improvement in average scores this month. However, 28 students have been flagged as high-risk requiring immediate intervention.",
    predictiveRiskScores: [
      { name: "Aarav Sharma", class: "10A", risk: 92, factors: ["Attendance 48%", "Declining scores", "Missing 8 DPPs"] },
      { name: "Priya Singh", class: "9B", risk: 87, factors: ["Attendance 52%", "Failed last 2 tests", "No parent meeting"] },
      { name: "Rohan Kumar", class: "10B", risk: 85, factors: ["Score dropped 30%", "Weak in 5 topics", "Irregular attendance"] },
      { name: "Ananya Gupta", class: "8A", risk: 78, factors: ["Missing assignments", "Low class participation", "Score declining"] },
      { name: "Vivaan Patel", class: "9A", risk: 75, factors: ["Attendance 62%", "Weak in Mathematics", "Pending DPPs"] },
    ],
    improvingStudents: [
      { name: "Diya Reddy", class: "8B", improvement: "+18%", area: "Mathematics" },
      { name: "Ishaan Nair", class: "10A", improvement: "+15%", area: "Physics" },
      { name: "Kavya Menon", class: "9A", improvement: "+12%", area: "Chemistry" },
    ],
    recommendations: [
      "Schedule remedial classes for 28 high-risk students in Mathematics and Physics",
      "Increase DPP frequency for Class 9B — lowest submission rate at 62%",
      "Teacher audit required for 4 teachers with recording compliance below 70%",
      "Parent counseling sessions recommended for 12 students with attendance below 65%",
      "Consider peer tutoring program — top 15% students can mentor at-risk students",
    ],
    questionsAnalysed: 12500,
    reportsGenerated: 89,
    studentsImproving: 156,
    highRiskStudents: 28,
  };
}

// ═══════════════════════════════════════
// MASTER SEED (singleton)
// ═══════════════════════════════════════
let _seed: ReturnType<typeof createSeed> | null = null;

function createSeed() {
  const students = generateStudents();
  const teachers = generateTeachers();
  const classes = generateClasses(teachers);
  const lectures = generateLectures(teachers);
  const dpp = generateDPP(teachers);
  const tests = generateTests(teachers);
  const notifications = generateNotifications();
  const announcements = generateAnnouncements();
  const dashboardKPIs = generateDashboardKPIs();
  const chartData = generateChartData();
  const aiInsights = generateAIInsights();

  return {
    students,
    teachers,
    classes,
    lectures,
    dpp,
    tests,
    notifications,
    announcements,
    dashboardKPIs,
    chartData,
    aiInsights,
    // Helper methods
    getStudentsByClass: (cls: string) => students.filter(s => s.class === cls),
    getTeachersBySubject: (sub: string) => teachers.filter(t => t.subjects.includes(sub)),
    getTeachersByClass: (cls: string) => teachers.filter(t => t.classes.includes(cls)),
    getAtRiskStudents: () => students.filter(s => s.riskLevel === "High" || s.riskLevel === "Critical"),
    getStudentById: (id: string) => students.find(s => s.id === id),
    getTeacherById: (id: string) => teachers.find(t => t.id === id),
    getClassByName: (name: string) => classes.find(c => c.fullName === name),
    getLecturesByClass: (cls: string) => lectures.filter(l => l.class === cls),
    getLecturesByTeacher: (tid: string) => lectures.filter(l => l.teacherId === tid),
    getDPPByClass: (cls: string) => dpp.filter(d => d.class === cls),
    getDPPByTeacher: (tid: string) => dpp.filter(d => d.teacherId === tid),
    getTestsByClass: (cls: string) => tests.filter(t => t.class === cls),
    getTestsByTeacher: (tid: string) => tests.filter(t => t.teacherId === tid),
    searchStudents: (query: string) => {
      const q = query.toLowerCase();
      return students.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.class.toLowerCase().includes(q));
    },
    searchTeachers: (query: string) => {
      const q = query.toLowerCase();
      return teachers.filter(t => t.name.toLowerCase().includes(q) || t.subjects.some(s => s.toLowerCase().includes(q)));
    },
  };
}

export function getSeedData() {
  if (!_seed) _seed = createSeed();
  return _seed;
}

export type SeedData = ReturnType<typeof createSeed>;
