"use client";
import UserContext from "./UserContext";
import useLocalStorage from "use-local-storage";

const UserContextProvider = ({ children }) => {
  const [studentData, setStudentData] = useLocalStorage("student", []);
  const [attendence, setAttendence] = useLocalStorage("attendence", []);
  const [leaveRequest, setLeaveRequest] = useLocalStorage("leaverequest", []);
  const [studentleave, setStudentLeave] = useLocalStorage("studentLeave", []);
  const [studentAttendence, setStudentAttendence] = useLocalStorage("studentAttendence", []);
  const [teacherData, setTeacherData] = useLocalStorage("teacherData", []);
  const [timeTable, setTimeTable] = useLocalStorage("timeTable", []);
  const [examination, setExamination] = useLocalStorage("Exam", []);
  const [libraryrecord, setLibraryRecord] = useLocalStorage("library", []);
  const [byteacher, setByTeacher] = useLocalStorage("byteacher", []);
  const [bystudent, setByStudent] = useLocalStorage("bystudent", []);
  return (
    <UserContext.Provider
      value={{
        teacherData, setTeacherData,
        studentData,
        setStudentData,
        attendence,
        setAttendence,
        leaveRequest,
        setLeaveRequest,
        studentleave, setStudentLeave,
        studentAttendence, setStudentAttendence,
        timeTable, setTimeTable,
        examination, setExamination,
        libraryrecord, setLibraryRecord,
        byteacher, setByTeacher,
        bystudent, setByStudent,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
