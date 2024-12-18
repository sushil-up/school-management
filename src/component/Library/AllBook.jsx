"use client";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "@/context/UserContext";
import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/joy";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import FormSelect from "../shared/form/FormSelect";
import { useSession } from "next-auth/react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteModal from "../Modal/DeleteModal";
import dayjs from "dayjs";
import { successMsg } from "../Toastmsg/toaster";

const AllBook = ({ handleClose, handleEdit }) => {
  const { libraryrecord, setLibraryRecord } = useContext(UserContext);
  const { handleSubmit, control } = useForm();
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteid, setDeleteId] = useState();
  const [formData, setFormData] = useState();
  const [tableData, setTableData] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: session } = useSession();
  const onSubmit = (data) => {
    setFormData(data);
  };
  useEffect(() => {
    if (formData) {
      const findBook = libraryrecord.filter(
        (item) =>
          item.bookname === formData.bookname &&
          item.subject === formData.subject
      );

      setTableData(findBook);
    } else {
      setTableData(libraryrecord);
    }
  }, [formData, libraryrecord]);
  const handleDelete = (item) => {
    setDeleteId(item.id);
    setDeleteOpenModal(true);
  };
  const onDelete = () => {
    const updatedData = libraryrecord.filter((item) => item.id !== deleteid);
    setLibraryRecord(updatedData);
    setDeleteOpenModal(false);
    successMsg("Book record deleted successfully");
  };
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false);
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
    if (tableData?.length === requiredLength) {
      setPage(0);
    }
  }, [page, tableData?.length]);
  const displayedData = tableData || [];
  return (
    <>
      <div>AllBook</div>
      <Button onClick={handleClose}>Add Book</Button>
      <br />
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="attendance">
            <FormSelect
              control={control}
              className="mt-4 "
              name="bookname"
              label="Book Name"
              options={libraryrecord?.map((item) => item?.bookname)}
            />
            <FormSelect
              control={control}
              className="mt-4 ml-2"
              name="subject"
              label="Subject"
              options={libraryrecord?.map((item) => item?.subject)}
            />

            <Button
              type="submit"
              className="ml-2 h-fit mt-5 border-4 bg-teal-400 rounded border-black "
            >
              Search
            </Button>
          </div>
        </form>
      </Box>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-base">Book No</TableCell>
              <TableCell className="font-bold text-base">Book Name</TableCell>
              <TableCell className="font-bold text-base">Writer </TableCell>
              <TableCell className="font-bold text-base">Title </TableCell>
              <TableCell className="font-bold text-base">
                Publish Date
              </TableCell>
              <TableCell className="font-bold text-base">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData?.length > 0 ? (
              <>
                {displayedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item?.id}>
                      <TableCell>{item?.bookno}</TableCell>
                      <TableCell>{item?.bookname}</TableCell>
                      <TableCell>{item?.writer}</TableCell>
                      <TableCell>{item?.title}</TableCell>
                      <TableCell>
                        {dayjs(item?.publishdate).format("YYYY-MM-DD")}
                      </TableCell>

                      {session?.user?.role === "student" ? (
                        <TableCell>
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
                        </TableCell>
                      ) : (
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
                      )}
                    </TableRow>
                  ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    {`We couldn't find any Book Record`}
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
      </Box>
      <DeleteModal
        onDelete={onDelete}
        deleteOpenModal={deleteOpenModal}
        deleteMessage="Are you certain you want to proceed with this deletion?"
        deleteHandleModalClose={deleteHandleModalClose}
      />
    </>
  );
};

export default AllBook;
