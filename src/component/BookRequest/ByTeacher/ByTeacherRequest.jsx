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
import EditRequestTeacher from "./EditRequestTeacher";
import { useSession } from "next-auth/react";
const ByTeacherRequest = () => {
  const { byteacher, setByTeacher } = useContext(UserContext);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const { data: session } = useSession();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const onDelete = () => {
    const updatedData = byteacher.filter((item) => item.id !== deleteIndex);
    setByTeacher(updatedData);
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    const requiredLength = page * 10;
    if (byteacher?.length === requiredLength) {
      setPage(0);
    }
  }, [page, byteacher?.length]);
  const displayedData = byteacher || [];
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
            {byteacher?.length > 0 ? (
              <>
                {byteacher
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
                    {`We couldn't find any request for book by the teacher`}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={byteacher?.length}
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
      <EditRequestTeacher
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

export default ByTeacherRequest;
