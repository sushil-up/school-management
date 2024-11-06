"use client";
import { Container, Table } from "@mui/joy";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
const ViewTable = ({ student }) => {
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
            {student?.map((item) => ( 
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.rollno}</TableCell>
                <TableCell>{item.class}</TableCell>
                <TableCell>{item.section}</TableCell>
                <TableCell>{item.attendanceStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default ViewTable;
