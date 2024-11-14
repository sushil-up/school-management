"use client";
import { useEffect, useState } from "react";
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
