"use client"
import Attendence from '@/component/Attendence/Attendence'
import React from 'react'

const StudentAttendence = () => {

  return (
    <div>

      <Attendence/>
    </div>
  )
}

export default StudentAttendence






// "use client";
// import DateSelect from "@/component/shared/form/DatePicker";
// import FormInputSelect from "@/component/shared/form/FormInputSelect";
// import UserContext from "@/context/UserContext";
// import { Button, Container, Table, Typography } from "@mui/joy";
// import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
// import React, { useContext } from "react";
// import { useForm } from "react-hook-form";

// const AttendancePage = () => {
//   const { handleSubmit, control } = useForm();
//   const { studentData, attendence, setAttendence } = useContext(UserContext);

//   const onSubmit = (data) => {
//     setAttendence(data);
//     console.log("Attendance:", data);
//   };

//   return (
//     <Container className="attendance-form">
//       <Typography variant="h4" className="mb-4">
//         Take Attendance
//       </Typography>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Student Name</TableCell>
//               <TableCell>
//                 Select Date
//                 <div>
//                   <DateSelect
//                     className="mt-2 w-44"
//                     control={control}
//                     name={`attendance`}
//                     label="Select Date"
//                   />
//                 </div>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {studentData.map((item) => (
//               <TableRow key={item.id}>
//                 <TableCell>{item.name}</TableCell>
//                 <TableCell>
//                   <FormInputSelect
//                     control={control}
//                     name={`attendance_status_${item.name}`}
//                     label="Mark Attendance"
//                     options={["Present", "Absent", "Late"]}
//                     className="mt-2 w-44"
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <Button type="submit" variant="contained" color="primary">
//           Add Attendance
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default AttendancePage;
