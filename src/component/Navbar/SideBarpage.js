import { routesUrl } from "@/utils/pagesurl";
export const SideBarAdmin = [
  {
    title: "Student",
    icon: <i className="uil uil-book-reader header-icon"></i>,
    subItems: [
      {
        title: "Add Student",
        icon: <i className="uil uil-plus-circle menu-icon"></i>,
        route: routesUrl.student,
      },
      {
        title: "Student Leave",
        icon: <i className="uil uil-file-info-alt menu-icon"></i>,
        route: routesUrl.studentleave,
      },
    ],
  },
  {
    title: " Attendance",
    icon: <i className="uil uil-file-upload header-icon"></i>,
    subItems: [
      // {
      //   title: "Add Attendance",
      //   icon: <i className="uil uil-plus-circle menu-icon"></i>,
      //   route: routesUrl.attendence,
      // },
      {
        title: "View Attendance",
        icon: <i className="uil uil-eye menu-icon"></i>,
        route: routesUrl.viewAttendence,
      },
    ],
  },
  {
    title: "Class Routine",
    icon: <i className="uil uil-schedule header-icon"></i>,
    subItems: [
      {
        title: "Add Class Routine",
        icon: <i className="uil uil-plus-circle menu-icon"></i>,
        route: routesUrl.classroutine,
      },
      {
        title: "View Class Routine",
        icon: <i className="uil uil-eye menu-icon"></i>,
        route: routesUrl.viewclassroutine,
      },
    ],
  },
  {
    title: "Teacher",
    icon: <i className="uil uil-user header-icon"></i>,
    subItems: [
      {
        title: "Add Teacher",
        icon: <i className="uil uil-plus-circle menu-icon"></i>,
        route: routesUrl.teacher,
      },
      {
        title: "Leave Request",
        icon: <i className="uil uil-file-info-alt menu-icon"></i>,
        route: routesUrl.teacherleave,
      },
    ],
  },
  {
    title: "Exam Schedule",
    icon: <i className="uil uil-schedule header-icon"></i>,
    subItems: [
      {
        title: "Add Exam Schedule",
        icon: <i className="uil uil-plus-circle menu-icon"></i>,
        route: routesUrl.exam,
      },
      {
        title: "View Exam Schedule",
        icon: <i className="uil uil-file-info-alt menu-icon"></i>,
        route: routesUrl.examTable,
      },
    ],
  },
];

export const SideBarTeacher = [
  {
    title: "Student",
    icon: <i className="uil uil-book-reader header-icon"></i>,
    subItems: [
      {
        title: "View Student",
        icon: <i className="uil uil-eye menu-icon"></i>,
        route: routesUrl.student,
      },
      {
        title: "Student Leave",
        icon: <i className="uil uil-file-info-alt menu-icon"></i>,
        route: routesUrl.studentleave,
      },
    ],
  },
  {
    title: " Attendance",
    icon: <i className="uil uil-file-upload header-icon"></i>,
    subItems: [
      {
        title: "Add Attendance",
        icon: <i className="uil uil-plus-circle menu-icon"></i>,
        route: routesUrl.attendence,
      },
      {
        title: "View Attendance",
        icon: <i className="uil uil-eye menu-icon"></i>,
        route: routesUrl.viewAttendence,
      },
    ],
  },
  {
    title: "Class Routine",
    icon: <i className="uil uil-schedule header-icon"></i>,
    subItems: [
      {
        title: "View Class Routine",
        icon: <i className="uil uil-eye menu-icon"></i>,
        route: routesUrl.viewclassroutine,
      },
    ],
  },
  {
    title: "Teacher",
    icon: <i className="uil uil-user header-icon"></i>,
    subItems: [
      {
        title: "Leave Request",
        icon: <i className="uil uil-file-info-alt menu-icon"></i>,
        route: routesUrl.teacherleave,
      },
    ],
  },
  {
    title: "Exam Schedule",
    icon: <i className="uil uil-schedule header-icon"></i>,
    subItems: [
      {
        title: "View Exam Schedule",
        icon: <i className="uil uil-file-info-alt menu-icon"></i>,
        route: routesUrl.examTable,
      },
    ],
  },
  {
    title: " Book Request",
    icon: <i className="uil uil-file-upload header-icon"></i>,
    subItems: [
      {
        title: "Send Request",
        icon: <i className="uil uil-plus-circle menu-icon"></i>,
        route: routesUrl.byteacher,
      },
    ],
  },
];

export const SideBarStudent = [
  {
    title: "Student",
    icon: <i className="uil uil-book-reader header-icon"></i>,
    subItems: [
      {
        title: "Student Leave",
        icon: <i className="uil uil-file-info-alt menu-icon"></i>,
        route: routesUrl.studentleave,
      },
    ],
  },
  {
    title: " Attendance",
    icon: <i className="uil uil-file-upload header-icon"></i>,
    subItems: [
      {
        title: "View Attendance",
        icon: <i className="uil uil-eye menu-icon"></i>,
        route: routesUrl.viewAttendence,
      },
    ],
  },
  {
    title: "Class Routine",
    icon: <i className="uil uil-schedule header-icon"></i>,
    subItems: [
      {
        title: "View Class Routine",
        icon: <i className="uil uil-eye menu-icon"></i>,
        route: routesUrl.viewclassroutine,
      },
    ],
  },
  {
    title: "Exam Schedule",
    icon: <i className="uil uil-schedule header-icon"></i>,
    subItems: [
      {
        title: "View Exam Schedule",
        icon: <i className="uil uil-file-info-alt menu-icon"></i>,
        route: routesUrl.examTable,
      },
    ],
  },
  {
    title: " Book Request",
    icon: <i className="uil uil-file-upload header-icon"></i>,
    subItems: [
      {
        title: "Send Request",
        icon: <i className="uil uil-plus-circle menu-icon"></i>,
        route: routesUrl.bystudent,
      },
    ],
  },
];
export const SideBarLibrarian = [
  {
    title: "Library",
    icon: <i className="uil uil-schedule header-icon"></i>,
    subItems: [
      {
        title: "Add Books",
        icon: <i className="uil uil-plus-circle menu-icon"></i>,
        route: routesUrl.library,
      },
      {
        title: " Books Request",
        icon: <i className="uil uil-plus-circle menu-icon"></i>,
        route: routesUrl.requestbooks,
      },
    ],
  },
];
