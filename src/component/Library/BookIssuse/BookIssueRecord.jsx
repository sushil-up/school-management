"use client";
import UserContext from "@/context/UserContext";
import { Box, Button, Container, Table } from "@mui/joy";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";

const BookIssueRecord = () => {
  const { bookIssue } = useContext(UserContext);
  const [techissue, setTechIssue] = useState();
  const {data:session}= useSession()
  const handleTeacher = () => {
    const data = bookIssue.filter((item) => item.teachername);
    setTechIssue(data);
  };
  const handleStudent = () => {
    const data = bookIssue.filter((item) => item.studentname);
    setTechIssue(data);
  };
  return (
    <>
      <Container>
        <Button onClick={handleTeacher}>Issue By Teacher</Button>
        <Button onClick={handleStudent}>Issue By Student</Button>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Book Name</TableCell>
                <TableCell>Book No</TableCell>
                <TableCell>Roll No</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {techissue?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item?.teachername} {item?.studentname}
                  </TableCell>
                  <TableCell>
                    {item?.bookname} 
                  </TableCell>
                  <TableCell>
                    {item?.bookno} 
                  </TableCell>
                  <TableCell>
                    {item?.rollno} 
                  </TableCell>
                  {session?.user?.role === "student" ? (
                      <TableCell>
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
                      </TableCell>
                    ) : (
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
                    )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Container>
    </>
  );
};

export default BookIssueRecord;
