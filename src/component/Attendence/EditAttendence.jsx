"use Client";
import UserContext from "@/context/UserContext";
import { Box, Button, Modal, Table } from "@mui/joy";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormInputSelect from "../shared/form/FormInputSelect";
import { successMsg } from "../Toastmsg/toaster";

const EditAttendence = ({ handleClose, open, editIndex ,setEditIndex,edit,setEdit}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "snow",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh",
    overflowY: "auto",
  };
  const { studentAttendence, setStudentAttendence } = useContext(UserContext);
  const [data, setData] = useState();
  const { handleSubmit, control, reset } = useForm();
  useEffect(() => {
    if (editIndex !== null) {
      const resetData = edit;
      setData(resetData);
    }
  }, [editIndex,edit]);
  const onSubmit = (attData) => {
    const attendence = {
      name: data?.name,
      class: data?.class,
      section: data?.section,
      rollno: data?.rollno,
      date: data?.date,
      attendanceStatus: attData?.attendance_status,

    };
    const updateData = studentAttendence.map((item) =>
      item.id == editIndex ? attendence : item
    );
    setData(null)
    setStudentAttendence(updateData)
    setEditIndex(null)
    handleClose();
    successMsg("The attendance record was edited successfully!")
    reset()
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} classname="model-pop">
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
                    {data?.date}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{data?.name}</TableCell>
                  <TableCell>{data?.class}</TableCell>
                  <TableCell>{data?.rollno}</TableCell>
                  <TableCell>{data?.section}</TableCell>
                  <TableCell>
                    <FormInputSelect
                      control={control}
                      name={`attendance_status`}
                      label="Mark Attendance"
                      options={["Present", "Absent", "Leave"]}
                      className="mt-4 w-44"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button
              type="submit"
              variant="contained"
              className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              color="primary"
            >
              Update Attendence
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default EditAttendence;
