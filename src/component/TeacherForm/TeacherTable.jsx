"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { Container } from "@mui/joy";

const TeacherTable = ({ teacherData, handleDelete, handleEdit, isLoading }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tabledata, setTableData] = useState();
  useEffect(() => {
    setTableData(teacherData);
  }, [teacherData]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    const requiredLength = page * 10; 
    if (tabledata?.length === requiredLength) {
      setPage(0); 
    }
  }, [page, tabledata?.length]);
  const displayedData=tabledata||[]
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-base">Name</TableCell>
              <TableCell className="font-bold text-base">Class Allotted</TableCell>
              <TableCell className="font-bold text-base">Section</TableCell>
              <TableCell className="font-bold text-base">Designation</TableCell>
              <TableCell className="font-bold text-base">Email</TableCell>
              <TableCell className="font-bold text-base">Phone</TableCell>
              <TableCell className="font-bold text-base">Joining Date</TableCell>
              <TableCell className="font-bold text-base">Address</TableCell>
              <TableCell className="font-bold text-base">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData?.length > 0 ? (
              displayedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.section}</TableCell>
                    <TableCell>{item.designation}</TableCell>
                    <TableCell>
                      <Tooltip
                        arrow
                        placement="top-start"
                        title={<span>{item.email}</span>}
                      >
                        <span>{`${item.email.slice(0, 30)}`}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      {dayjs(item.joining).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>{item.address}</TableCell>
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
                ))
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    {`  Sorry, teacher data is not available right now. Please check
                    back or contact support for assistance.`}
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

export default TeacherTable;
