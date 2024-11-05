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

const StudentTable = ({ studentData, handleDelete, handleEdit, isLoading }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tabledata, setTableData] = useState();
  useEffect(() => {
    setTableData(studentData);
  }, [studentData]);
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
            <TableCell >Name</TableCell>
            <TableCell >Father Name</TableCell>
            <TableCell >Mother Name</TableCell>
            <TableCell >
              Class & Section
            </TableCell>
            <TableCell >Roll No</TableCell>
            <TableCell >DOB</TableCell>
            <TableCell >Gender</TableCell>
            <TableCell >Address</TableCell>
            <TableCell >Actions</TableCell>
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
                  <TableCell>{dayjs(item.dob).format("YYYY-MM-DD")}</TableCell>
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
                <TableCell colSpan={9}>
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
