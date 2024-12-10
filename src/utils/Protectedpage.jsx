import { routesUrl } from "./pagesurl";

export const ProtectedPage = [
    routesUrl.student,
    routesUrl.teacher,
    routesUrl.attendence,
    routesUrl.teacherleave,
    routesUrl.studentleave,
    routesUrl.viewAttendence,
    routesUrl.viewclassroutine,
    routesUrl.classroutine,
    routesUrl.exam,
    routesUrl.examTable,
    routesUrl.library,
    routesUrl.bookissue,
]

export const UnprotectedRoutes = [routesUrl.signIn, routesUrl.home,];
export const ProtectedRoutes = {
  student: [
    routesUrl.student,
    routesUrl.viewAttendence,
    routesUrl.examTable,
    routesUrl.viewclassroutine,
    routesUrl.studentleave,
    routesUrl.bystudent,
  ],
  teacher: [
    routesUrl.student,
    routesUrl.attendence,
    routesUrl.teacherleave,
    routesUrl.studentleave,
    routesUrl.viewAttendence,
    routesUrl.viewclassroutine,
    routesUrl.classroutine,
    routesUrl.exam,
    routesUrl.examTable,
    routesUrl.byteacher,
  ],
  librarian: [routesUrl.library, routesUrl.bookissue,routesUrl.record,routesUrl.requestbooks ],
  admin: [
    routesUrl.student,
    routesUrl.teacher,
    routesUrl.attendence,
    routesUrl.teacherleave,
    routesUrl.studentleave,
    routesUrl.viewAttendence,
    routesUrl.viewclassroutine,
    routesUrl.classroutine,
    routesUrl.exam,
    routesUrl.examTable,
    routesUrl.library,
    routesUrl.bookissue,
  ],
};
