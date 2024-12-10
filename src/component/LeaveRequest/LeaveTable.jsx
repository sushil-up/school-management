"use client";
import UserContext from "@/context/UserContext";
import { Container } from "@mui/joy";
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
  const { leaveRequest } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [tableData, setTableData] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {data:session}= useSession()
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    if(session?.user?.role==="teacher"){
      if (session) {
        const emailTeacher = session?.user?.email
        const TeacherEmail = leaveRequest?.filter(
          (item) => item.email === emailTeacher
        );
        setTableData(TeacherEmail)
      }
    }
   else{
    setTableData(leaveRequest)
   }
    },[session,leaveRequest]);
  return (
    <>
      <Container>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell className="font-bold text-base">Name</TableCell>
              <TableCell className="font-bold text-base">Reason</TableCell>
              <TableCell className="font-bold text-base">Leave Date</TableCell>
              <TableCell className="font-bold text-base">Status</TableCell>
              <TableCell className="font-bold text-base">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.length > 0 ? (
              <>
                {tableData?.map((item, index) => (
                  <>
                    <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                      <TableCell>{item.reason}</TableCell>
                      <TableCell>
                        {Array.isArray(item.leavedate)
                          ? `${dayjs(item.leavedate[0]).format("YYYY-MM-DD")} to ${dayjs(item.leavedate[1]).format("YYYY-MM-DD")}`
                          : dayjs(item.leavedate).format("YYYY-MM-DD")}
                      </TableCell>
                      {item?.status ? (
                          <TableCell>{item?.status}</TableCell>
                      ) : (
                          <TableCell>Pending</TableCell>
                      )}
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
                  </>
                ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                 {`   Sorry, there are no leave requests available right now.
                    Please check back or contact support for assistance.`}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tableData?.length}
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
