"use client";
import UserContext from "@/context/UserContext";
import { Container, Table, Typography } from "@mui/joy";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import dayjs from "dayjs";
import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const LeaveTable = ({ handleDelete, handleEdit }) => {
  const { studentleave } = useContext(UserContext);
  return (
    <>
      <Container>
        <Container className="mt-5 text-center text-black bg-color rounded-lg border-inherit">
          <Typography className="text-black text-3xl">
            Recent Student Leave
          </Typography>
        </Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reason</TableCell>
              <TableCell>Leave Date</TableCell>
              <TableCell>Leave Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentleave?.map((item, index) => (
              <>
                <TableRow key={index}>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell>
                    {Array.isArray(item.leavedate)
                      ? `${dayjs(item.leavedate[0]).format("YYYY-MM-DD")} to ${dayjs(item.leavedate[1]).format("YYYY-MM-DD")}`
                      : dayjs(item.leavedate).format("YYYY-MM-DD")}
                  </TableCell>
                      <TableCell>{item.status}</TableCell>
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
              </>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default LeaveTable;
