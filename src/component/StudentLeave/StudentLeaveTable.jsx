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
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSession } from "next-auth/react";
const LeaveTable = ({ handleDelete, handleEdit }) => {
  const { studentleave } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: session } = useSession();
  const [tableData, setTableData] = useState();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event?.target?.value);
    setPage(0);
  };
  useEffect(() => {
    const requiredLength = page * 10; 
    if (tableData?.length === requiredLength) {
      setPage(0); 
    }
  }, [page, tableData?.length]);
  const displayedData=tableData||[]
  useEffect(() => {
    if (session?.user?.role === "student") {
      if (session) {
        const emailstu = session?.user?.email;
        const studentEmail = studentleave?.filter(
          (item) => item.email === emailstu
        );
        setTableData(studentEmail);
      }
    } else {
      setTableData(studentleave);
    }
  }, [session, studentleave]);
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
            {displayedData?.length > 0 ? (
              <>
                {displayedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <>
                      <TableRow key={item?.id}>
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
                        {item?.status ? (
                          <TableCell>{item?.status}</TableCell>
                        ) : (
                          <TableCell>Pending</TableCell>
                        )}
                        <TableCell>
                          {session?.user?.role === "student" ? (
                            <>
                              <Tooltip
                                arrow
                                placement="top-start"
                                title="You are not authorized to delete"
                              >
                                <DeleteIcon className="text-red-500" />
                              </Tooltip>
                              <Tooltip
                                arrow
                                placement="top-start"
                                title="You are not authorized to edit"
                              >
                                <EditIcon className="text-green-500" />
                              </Tooltip>
                            </>
                          ) : (
                            <>
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
          count={displayedData?.length}
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
