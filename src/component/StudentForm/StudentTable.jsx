"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { Box, Button, Container, Tooltip } from "@mui/joy";
import FormInputSelect from "../shared/form/FormInputSelect";
import { selectclass } from "../SelectClass";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

const StudentTable = ({ studentData, handleDelete, handleEdit, isLoading }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tabledata, setTableData] = useState();
  const [formData, setFormdata] = useState({ class: "All", section: "All" });
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      class: "All",
      section: "All",
    },
  });
  const { data: session } = useSession();
  const onSubmit = (data) => {
    setFormdata(data);
    reset();
  };
  useEffect(() => {
    if (formData) {
      const classTime = studentData.filter(
        (item) =>
          (item?.class === formData?.class &&
            item.section === formData?.section) ||
          (formData?.class === "All" && formData?.section === "All")
      );
      setTableData(classTime);
    } else {
      setTableData(studentData);
    }
  }, [formData, studentData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="attendance">
              <FormInputSelect
                control={control}
                className="mt-4 "
                name="class"
                label="Select Class"
                options={["All", ...selectclass]}
              />
              <FormInputSelect
                control={control}
                className="mt-4 ml-2"
                name="section"
                label="Select Section"
                options={["All", "A", "B", "C"]}
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-base">Name</TableCell>
              <TableCell className="font-bold text-base">Father Name</TableCell>
              <TableCell className="font-bold text-base">Mother Name</TableCell>
              <TableCell className="font-bold text-base">
                Class & Section
              </TableCell>
              <TableCell className="font-bold text-base">Roll No</TableCell>
              <TableCell className="font-bold text-base">DOB</TableCell>
              <TableCell className="font-bold text-base">Gender</TableCell>
              <TableCell className="font-bold text-base">Address</TableCell>
              <TableCell className="font-bold text-base">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabledata?.length > 0 ? (
              tabledata
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.fathername}</TableCell>
                    <TableCell>{item.mothername}</TableCell>
                    <TableCell>{`${item.class} & ${item.section}`}</TableCell>
                    <TableCell>{item.rollno}</TableCell>
                    <TableCell>
                      {dayjs(item.dob).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>{item.gender}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    {session?.user?.role === "student" ? (
                      <>
                        <TableCell  >
                          <Tooltip
                          arrow
                          placement="top-start"
                          title="You are not authorized to delete">
                            <DeleteIcon className="text-red-500" />
                          </Tooltip>
                          <Tooltip
                          arrow
                          placement="top-start"
                          title="You are not authorized to edit">
                            <EditIcon
                              className="text-green-500"
                            />
                          </Tooltip>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        {" "}
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
                      </>
                    )}
                  </TableRow>
                ))
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    {`  No user data is available`}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tabledata?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </>
  );
};

export default StudentTable;
