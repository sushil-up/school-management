"use client";
import UserContext from "@/context/UserContext";
import { Container, Table, Typography } from "@mui/joy";
import {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const LeaveTable = ({ handleDelete, handleEdit }) => {
  const { studentleave } = useContext(UserContext);
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
            {studentleave.length > 0 ? (
              <>
                {" "}
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
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Sorry, student leave information is not available right now.
                    Please check back or contact support for assistance.
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={studentleave?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </>
  );
};

export default LeaveTable;
