"use client";
import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import useLocalStorage from "use-local-storage";

const UserContextProvider = ({ children }) => {
  const [studentData, setStudentData] = useLocalStorage("student", []);
  const [attendence,setAttendence]= useLocalStorage("attendence",[])
  const [tehdata, settehdata] = useState();
useEffect(()=>{
  const data= localStorage.getItem("teacher")
  settehdata(data)
  console.log("data",data)
},[])
  return (
    <UserContext.Provider value={{ tehdata, settehdata, studentData, setStudentData,attendence,setAttendence }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
