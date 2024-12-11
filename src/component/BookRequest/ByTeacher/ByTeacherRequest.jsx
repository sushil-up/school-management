"use client";
import UserContext from "@/context/UserContext";
import { Container } from "@mui/joy";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteModal from "@/component/Modal/DeleteModal";
import { successMsg } from "@/component/Toastmsg/toaster";
import EditRequestTeacher from "./EditRequestTeacher";
const ByTeacherRequest = () => {
  const { byteacher,setByTeacher } = useContext(UserContext);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const onDelete = () => {
    const updatedData = byteacher.filter((item) => item.id !== deleteIndex);
    setByTeacher(updatedData);
    setDeleteOpenModal(false);
    successMsg("Book Request have been deleted successfully")
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
            {byteacher?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.book}</TableCell>
                <TableCell>{item.bookno}</TableCell>
                <TableCell>{item.writer}</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>
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
          </TableBody>
        </Table>
      </Container>
      <DeleteModal
        onDelete={onDelete}
        deleteMessage="Are you certain you want to proceed with this deletion?"
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={deleteHandleModalClose}
      />
      <EditRequestTeacher handleClose={handleClose} open={open} />
    </>
  );
};

export default ByTeacherRequest;
