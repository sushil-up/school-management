"use client";
import { Container } from "@mui/joy";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UserContext from "@/context/UserContext";
import EditAttendence from "./EditAttendence";
import { successMsg } from "../Toastmsg/toaster";
import DeleteModal from "../Modal/DeleteModal";
import { useSession } from "next-auth/react";
const ViewTable = ({ student }) => {
  const { studentAttendence, setStudentAttendence } = useContext(UserContext);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [edit, setEdit] = useState(null);
  const { data: session } = useSession();
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
    const updatedData = studentAttendence?.filter(
      (item, i) => item.id !== deleteIndex
    );
    setStudentAttendence(updatedData);
    successMsg("Success! The attendance record was deleted.");
    setDeleteOpenModal(false);
  };
  const handleEdit = (item) => {
    setEditIndex(item.id);
    setEdit(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
  };
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false);
  };
  useEffect(() => {
    const requiredLength = page * 10;
    if (student?.length === requiredLength) {
      setPage(0);
    }
  }, [page, student?.length]);
  const displayedData = student || [];
  return (
    <>
      <Container className="attendance-form bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-white">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-base">Name</TableCell>
              <TableCell className="font-bold text-base">Roll No</TableCell>
              <TableCell className="font-bold text-base">Class</TableCell>
              <TableCell className="font-bold text-base">Section</TableCell>
              <TableCell className="font-bold text-base">
                Attendance Status
              </TableCell>
              <TableCell className="font-bold text-base">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData?.length > 0 ? (
              <>
                {displayedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item?.rollno}</TableCell>
                      <TableCell>{item?.class}</TableCell>
                      <TableCell>{item?.section}</TableCell>
                      <TableCell>{item?.attendanceStatus}</TableCell>
                      <TableCell>
                        {session?.user?.role === "admin" ? (
                          <>
                            <Tooltip
                              arrow
                              placement="top-start"
                              title="You are not authorized to delete"
                            >
                              <DeleteIcon className="text-red-500" />
                            </Tooltip>
                            <Tooltip
                              arrow
                              placement="top-start"
                              title="You are not authorized to edit"
                            >
                              <EditIcon className="text-green-500" />
                            </Tooltip>
                          </>
                        ) : (
                          <>
                            <DeleteIcon
                              className="text-red-500"
                              onClick={() => handleDelete(item)}
                            />
                            <EditIcon
                              className="text-green-500"
                              onClick={() => handleEdit(item)}
                            />
                          </>
                        )}
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
          count={displayedData?.length}
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
