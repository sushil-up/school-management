"use client";
import React, { useEffect, useState } from "react";
import {
  
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { Box, Button, Container, Table } from "@mui/joy";
import FormInputSelect from "../shared/form/FormInputSelect";
import { selectclass } from "../SelectClass";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";

const StudentTable = ({ studentData, handleDelete, handleEdit, isLoading }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tabledata, setTableData] = useState();
  const [formData, setFormdata] = useState({ class: "All", section: "All" });
  const { handleSubmit, control,reset } = useForm({
    defaultValues: {
      class: "All",
      section: "All",
    },
  });
  const onSubmit = (data) => {
    setFormdata(data);
    reset()
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
  }, [formData]);

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
                options={["All",...selectclass]}
              />
              <FormInputSelect
                control={control}
                className="mt-4 ml-2"
                name="section"
                label="Select Section"
                options={["All","A", "B", "C"]}
              />

              <Button
                type="submit"
                className="ml-2 h-fit mt-5 bg-white border-4 rounded border-black "
              >
                <SearchIcon className="text-black" />
              </Button>
            </div>
          </form>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Father Name</TableCell>
              <TableCell>Mother Name</TableCell>
              <TableCell>Class & Section</TableCell>
              <TableCell>Roll No</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
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
                    <TableCell>
                      <DeleteIcon
                        className="text-red-500"
                        onClick={() => handleDelete(index)}
                      />

                      <EditIcon
                        className="text-green-500"
                        onClick={() => handleEdit(index)}
                      />
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={9} className="text-center" >
                    <p>No user data is available</p>
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
