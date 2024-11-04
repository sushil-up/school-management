"use client";
import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import useLocalStorage from "use-local-storage";

const UserContextProvider = ({ children }) => {
  const [studentData, setStudentData] = useLocalStorage("student", []);
  const [attendence, setAttendence] = useLocalStorage("attendence", []);
  const [leaveRequest, setLeaveRequest] = useLocalStorage("leaverequest", []);
  const [studentleave, setStudentLeave] = useLocalStorage("studentLeave", []);
  const [tehdata, settehdata] = useState();
  useEffect(() => {
    const data = localStorage.getItem("teacher");
    settehdata(data);
  }, []);
  return (
    <UserContext.Provider
      value={{
        tehdata,
        settehdata,
        studentData,
        setStudentData,
        attendence,
        setAttendence,
        leaveRequest,
        setLeaveRequest,
        studentleave, setStudentLeave,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
