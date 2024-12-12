"use client";
import UserContext from "@/context/UserContext";
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
import DeleteModal from "@/component/Modal/DeleteModal";
import { successMsg } from "@/component/Toastmsg/toaster";
import EditRequest from "./EditRequest";
import { useSession } from "next-auth/react";
const ByStudentRequest = () => {
  const { bystudent, setByStudent } = useContext(UserContext);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [edit, setEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState();
  const { data: session } = useSession();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const onDelete = () => {
    const updatedData = bystudent.filter((item) => item.id !== deleteIndex);
    setByStudent(updatedData);
    setDeleteOpenModal(false);
    successMsg("Book Request have been deleted successfully");
  };
  const handleDelete = (item) => {
    setDeleteIndex(item.id);
    setDeleteOpenModal(true);
  };
  const deleteHandleModalClose = () => {
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
  useEffect(() => {
    if (session?.user?.role === "student") {
      if (session) {
        const emailStudent = session?.user?.email;
        const StudentRequest = bystudent?.filter(
          (item) => item.email === emailStudent
        );
        setTableData(StudentRequest);
      }
    } else {
      setTableData(bystudent);
    }
  }, [session, bystudent]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    const requiredLength = page * 10;
    if (tableData?.length === requiredLength) {
      setPage(0);
    }
  }, [page, tableData?.length]);
  const displayedData = tableData || [];
  return (
    <>
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Requestor Name</TableCell>
              <TableCell>Requested Book</TableCell>
              <TableCell>Book No</TableCell>
              <TableCell>Writer Name</TableCell>
              <TableCell>Request</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData?.length > 0 ? (
              <>
                {displayedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.book}</TableCell>
                      <TableCell>{item.bookno}</TableCell>
                      <TableCell>{item.writer}</TableCell>
                      <TableCell>{item.status || "Pending"}</TableCell>
                      <TableCell>
                        {session?.user?.role !== "librarian" ? (
                          <>
                            <Tooltip
                              arrow
                              placement="top-start"
                              title="You are not authorized to edit"
                            >
                              <EditIcon className="text-green-500" />
                            </Tooltip>
                            <Tooltip
                              arrow
                              placement="top-start"
                              title="You are not authorized to delete"
                            >
                              <DeleteIcon className="text-red-500" />
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
                    {`We couldn't find any request for book by the student`}
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
      <DeleteModal
        onDelete={onDelete}
        deleteMessage="Are you certain you want to proceed with this deletion?"
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={deleteHandleModalClose}
      />
      <EditRequest
        handleClose={handleClose}
        open={open}
        editIndex={editIndex}
        edit={edit}
        setEditIndex={setEditIndex}
        setOpen={setOpen}
      />
    </>
  );
};

export default ByStudentRequest;
