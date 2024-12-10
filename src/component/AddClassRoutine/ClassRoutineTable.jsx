"use client";
import UserContext from "@/context/UserContext";
import { Box, Button, Container, Typography } from "@mui/joy";
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
import FormInputSelect from "../shared/form/FormInputSelect";
import { selectclass } from "../SelectClass";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClassRoutineEdit from "./ClassRoutineEdit";
import DeleteModal from "../Modal/DeleteModal";
import { successMsg } from "../Toastmsg/toaster";
import { useSession } from "next-auth/react";
const ClassRoutineTable = () => {
  const { timeTable, setTimeTable } = useContext(UserContext);
  const [search, setSearch] = useState();
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [formData, setFormdata] = useState({
    class: "All",
    section: "All",
  });
  const [editindex, setEditIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [edit, setEdit] = useState();
  const [open, setOpen] = useState(false);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      class: "All",
      section: "All",
    },
  });
  const onSubmit = (data) => {
    setFormdata(data);
  };
  const { data: session } = useSession();
  useEffect(() => {
    setSearch(formData);
    if (formData) {
      const classTime = timeTable?.filter(
        (item) =>
          (formData?.class === "All" || item?.class === formData?.class) &&
          (formData?.section === "All" || item.section === formData?.section)
      );
      setSearch(classTime);
    }
  }, [formData, timeTable]);
  const onDelete = () => {
    const updatedData = timeTable.filter((item, i) => item.id !== deleteIndex);
    setTimeTable(updatedData);
    setDeleteOpenModal(false);
    successMsg("Class schedule was deleted successfully.");
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
  };
  return (
    <>
      <Container>
        <Box>
          <Typography>Class Timing</Typography>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="attendance">
                <FormInputSelect
                  control={control}
                  className="mt-4 "
                  name="class"
                  label="Select Class"
                  options={[...selectclass, "All"]}
                />
                <FormInputSelect
                  control={control}
                  className="mt-4 ml-2"
                  name="section"
                  label="Select Section"
                  options={["All", "A", "B", "C"]}
                />
                <Button
                  className="ml-2 h-fit mt-5 border-4 bg-teal-400 rounded border-black "
                  type="submit"
                >
                  Search
                </Button>
              </div>
            </form>
          </Box>
          <br />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-bold text-base">Class</TableCell>
                <TableCell className="font-bold text-base">Section</TableCell>
                <TableCell className="font-bold text-base">Subject</TableCell>
                <TableCell className="font-bold text-base">
                  Start Time
                </TableCell>
                <TableCell className="font-bold text-base">End Time</TableCell>
                <TableCell className="font-bold text-base">Days</TableCell>
                <TableCell className="font-bold text-base">Teacher</TableCell>
                <TableCell className="font-bold text-base">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {search?.length > 0 ? (
                <>
                  {search?.map((item, index) => (
                    <TableRow key={item.name}>
                      <TableCell>{item.class}</TableCell>
                      <TableCell>{item.section}</TableCell>
                      <TableCell>{item.subject}</TableCell>
                      <TableCell>
                        {new Date(item.start_time).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        {new Date(item.end_time).toLocaleTimeString()}
                      </TableCell>
                      <TableCell className="text-clip overflow-hidden">
                        <Tooltip
                          arrow
                          placement="top-start"
                          title={<span>{item.day}</span>}
                        >
                          <span>{`${item.day.slice(0, 100)}`}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{item.teacher}</TableCell>
                      <TableCell>
                        {session?.user?.role === "student" ? (
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
                      {`We couldn’t find the timetable for this class. Please verify
                    your selection or reach out if you need help!`}
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={search?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Container>
      <ClassRoutineEdit
        open={open}
        edit={edit}
        handleClose={handleClose}
        editindex={editindex}
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

export default ClassRoutineTable;
