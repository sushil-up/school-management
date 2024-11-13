"use client";
import { Container, Table } from "@mui/joy";
import {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UserContext from "@/context/UserContext";
import EditAttendence from "./EditAttendence";
import { successMsg } from "../Toastmsg/toaster";
import DeleteModal from "../Modal/DeleteModal";
const ViewTable = ({ student }) => {
  const { studentAttendence, setStudentAttendence } = useContext(UserContext);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteIndex,setDeleteIndex]=useState(null)
  const [edit,setEdit]=useState(null)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDelete = (item) => {
    setDeleteOpenModal(true);
    setDeleteIndex(item.id);
  };
  const onDelete = () => {
    const updatedData = studentAttendence?.filter((item, i) => item.id !== deleteIndex);
    setStudentAttendence(updatedData);
    successMsg("Success! The attendance record was deleted.");
    setDeleteOpenModal(false);
  };
  const handleEdit = (item) => {
    setEditIndex(item.id);
    setEdit(item)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
  };
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false);
  };
  return (
    <>
      <Container className="attendance-form bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-white">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Roll No</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Attendence Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student?.length > 0 ? (
              <>
                {" "}
                {student?.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.rollno}</TableCell>
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.section}</TableCell>
                    <TableCell>{item.attendanceStatus}</TableCell>
                    <TableCell>
                      {" "}
                      <DeleteIcon
                        className="text-red-500"
                        onClick={() => handleDelete(item)}
                      />
                      <EditIcon
                        className="text-green-500"
                        onClick={() => handleEdit(item)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    {`   Sorry, we couldn’t locate an attendance record. You may want
                    to try a different option or contact support for assistance`}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={student?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
      <EditAttendence
        open={open}
        handleClose={handleClose}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
        edit={edit}
        setEdit={setEdit}
      />
      <DeleteModal
        onDelete={onDelete}
        deleteMessage="Are you certain you want to proceed with this deletion?"
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={deleteHandleModalClose}
      />
    </>
  );
};

export default ViewTable;
