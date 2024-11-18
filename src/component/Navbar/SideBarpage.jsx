import { routesUrl } from "@/utils/pagesurl";
export  const SideBarpage  = [
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
          title: "Student Attendence",
          icon: <i className="uil uil-file-upload header-icon"></i>,
          subItems: [
            {
              title: "Add Attendence",
              icon: <i class="uil uil-plus-circle menu-icon"></i>,
              route: routesUrl.attendence,
            },
            {
              title: "View Attendence",
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
              icon: <i class="uil uil-plus-circle menu-icon"></i>,
              route: routesUrl.timetable,
            },
            {
              title: "View Class Routine",
              icon: <i className="uil uil-eye menu-icon"></i>,
              route: routesUrl.viewtimetable,
            },
          ],
        },
        {
          title: "Teacher",
          icon: <i class="uil uil-user header-icon"></i>,
          subItems: [
            {
              title: "Add Teacher",
              icon: <i class="uil uil-plus-circle menu-icon"></i>,
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
              icon: <i class="uil uil-plus-circle menu-icon"></i>,
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
      

