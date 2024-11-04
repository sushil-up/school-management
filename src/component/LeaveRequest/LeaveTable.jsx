import UserContext from "@/context/UserContext";
import { Container, Table } from "@mui/joy";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import dayjs from "dayjs";
import React, { useContext } from "react";

const LeaveTable = () => {
  const { leaveRequest } = useContext(UserContext);
  return (
    <>
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reason</TableCell>
              <TableCell>Leave Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveRequest?.map((item, index) => (
              <>
                <TableRow key={index}>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell>
                    {Array.isArray(item.leavedate)
                      ? `${dayjs(item.leavedate[0]).format("YYYY-MM-DD")} to ${dayjs(item.leavedate[1]).format("YYYY-MM-DD")}`
                      : dayjs(item.leavedate).format("YYYY-MM-DD")}
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
