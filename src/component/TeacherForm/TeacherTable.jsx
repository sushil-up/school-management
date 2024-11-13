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
import { Container } from "@mui/joy";

const TeacherTable = ({
  teacherData,
  handleDelete,
  handleEdit,
  isLoading,
  
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tabledata, setTableData] = useState();
  useEffect(() => {
    setTableData(teacherData);
  }, [teacherData]);
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Class Allotted</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Joining Date</TableCell>
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
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.section}</TableCell>
                    <TableCell>{item.designation}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      {dayjs(item.joining).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>{item.gender}</TableCell>
                    <TableCell>{item.address}</TableCell>
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
                ))
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                  {`  Sorry, teacher data is not available right now. Please check
                    back or contact support for assistance.`}
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

export default TeacherTable;
