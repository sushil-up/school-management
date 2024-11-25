"use client";
import UserContext from "@/context/UserContext";
import { Container, Tooltip, Typography } from "@mui/joy";
import {
  Table,
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
import { useSession } from "next-auth/react";
const LeaveTable = ({ handleDelete, handleEdit }) => {
  const { studentleave } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: session } = useSession();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event?.target?.value);
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
              <TableCell className="font-bold text-base">Name</TableCell>
              <TableCell className="font-bold text-base">Roll No</TableCell>
              <TableCell className="font-bold text-base">
                Class&Section
              </TableCell>
              <TableCell className="font-bold text-base">Leave Date</TableCell>
              <TableCell className="font-bold text-base">Reason</TableCell>
              <TableCell className="font-bold text-base">
                Leave Status
              </TableCell>
              <TableCell className="font-bold text-base">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentleave.length > 0 ? (
              <>
                {" "}
                {studentleave?.map((item, index) => (
                  <>
                    <TableRow key={index}>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item?.rollno}</TableCell>
                      <TableCell>
                        {item?.class}&{item?.section}
                      </TableCell>
                      <TableCell>
                        {item?.multileave
                          ? `${dayjs(item?.multileave[0]).format("YYYY-MM-DD")} to ${dayjs(item?.multileave[1]).format("YYYY-MM-DD")}`
                          : dayjs(item?.leavedate).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell>{item?.reason}</TableCell>
                      <TableCell>{item?.status}</TableCell>
                      <TableCell>
                        {session?.user?.role === "student" ? (
                          <>
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
                              <EditIcon className="text-green-500" />
                            </Tooltip>
                          </>
                        ) : (
                          <>
                            {" "}
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
