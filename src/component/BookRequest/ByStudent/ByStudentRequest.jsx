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
import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const ByStudentRequest = () => {
  const { bystudent } = useContext(UserContext);
  console.log("bystudent", bystudent);
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
            {bystudent?.map((item) => (
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
    </>
  );
};

export default ByStudentRequest;
