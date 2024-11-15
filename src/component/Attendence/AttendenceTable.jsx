import {  Button, Container, Table, Typography } from "@mui/joy";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import FormInputSelect from "../shared/form/FormInputSelect";
import dayjs from "dayjs";
import UserContext from "@/context/UserContext";

const AttendenceTable = ({ student, formdata, open, setOpen }) => {
  const date = dayjs(formdata?.date).format("YYYY-MM-DD");
  const { studentAttendence, setStudentAttendence } = useContext(UserContext);
  const { handleSubmit, control, reset } = useForm();
  const onSubmit = (data) => {
    const attendence = student.map((item) => ({
      name: item.name,
      class: item.class,
      section: item.section,
      rollno: item.rollno,
      date: date,
      attendanceStatus: data[`attendance_status_${item.name}`],
    }));
    const storedData = [...studentAttendence, ...attendence];
    setStudentAttendence(storedData);
    setOpen(false);
    reset();
  };
  return (
    <>
      {student?.length !== 0 && open ? (
        <>
          {" "}
          <Container className="attendance-form bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-white">
            <Typography variant="h4" className="mb-4"></Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Class</TableCell>
                    <TableCell>Roll No</TableCell>
                    <TableCell>Section</TableCell>
                    <TableCell
                      colSpan="2"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Select Date:
                      {date}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {student?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.class}</TableCell>
                      <TableCell>{item.rollno}</TableCell>
                      <TableCell>{item.section}</TableCell>
                      <TableCell>
                        <FormInputSelect
                          control={control}
                          name={`attendance_status_${item.name}`}
                          label="Mark Attendance"
                          options={["Present", "Absent", "Leave"]}
                          className="mt-4 w-44"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                type="submit"
                variant="contained"
                className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                color="primary"
              >
                Upload Attendence
              </Button>
            </form>
          </Container>
        </>
      ) : (
        <>
          {open ? (
            <>
              <Container className="bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-white text-center">
                <Typography className="text-center" >
                 {`Sorry, student data is not available right now. Please check back or contact support for assistance.`}
                </Typography>
              </Container>
            </>
          ) : (
            <>
              <Container className="bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-white text-center">
                <Typography className="text-center">
                Kindly choose your class and section before proceeding.
                </Typography>
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AttendenceTable;
