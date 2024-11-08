"use client";
import { Container, Table } from "@mui/joy";
import {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
const ViewTable = ({ student }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Container className="attendance-form bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-white">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Roll No</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Attendence Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student?.length > 0 ? (
              <>
                {" "}
                {student?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.rollno}</TableCell>
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.section}</TableCell>
                    <TableCell>{item.attendanceStatus}</TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                 {`   Sorry, we couldn’t locate an attendance record. You may want
                    to try a different option or contact support for assistance`}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={student?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </>
  );
};

export default ViewTable;
