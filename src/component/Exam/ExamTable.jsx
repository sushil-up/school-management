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
import dayjs from "dayjs";
import EditExam from "./EditExam";
import DeleteModal from "../Modal/DeleteModal";
import { successMsg } from "../Toastmsg/toaster";

const ExamTable = ({ tableData }) => {
  const { examination, setExamination } = useContext(UserContext);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [edit, setEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const onDelete = () => {
    const updatedData = examination.filter((item) => item.id !== deleteIndex);
    setExamination(updatedData);
    setDeleteOpenModal(false);
    successMsg("The exam schedule was successfully deleted");
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
    setEditIndex(null);
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Exam Type</TableCell>
              <TableCell>Exam Date</TableCell>
              <TableCell>Exam Time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.length > 0 ? (
              <>
                {tableData?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.section}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{item.exam_type}</TableCell>
                    <TableCell>
                      {dayjs(item.examdate).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>
                      {new Date(item.exam_time).toLocaleTimeString()}
                    </TableCell>
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
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    {`No exam schedule was found for this class. 
                    Please check your selection or contact us if you need help!`}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tableData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
      <DeleteModal
        onDelete={onDelete}
        deleteOpenModal={deleteOpenModal}
        deleteMessage="Are you sure with this deletion"
        deleteHandleModalClose={deleteHandleModalClose}
      />
      <EditExam
        open={open}
        edit={edit}
        handleClose={handleClose}
        editIndex={editIndex}
      />
    </>
  );
};

export default ExamTable;