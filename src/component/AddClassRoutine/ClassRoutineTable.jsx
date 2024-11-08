"use client";
import UserContext from "@/context/UserContext";
import { Box, Button, Container, Table, Typography } from "@mui/joy";
import {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import FormInputSelect from "../shared/form/FormInputSelect";
import { selectclass } from "../SelectClass";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const ClassRoutineTable = () => {
  const { timeTable,setTimeTable } = useContext(UserContext);
  const [search, setSearch] = useState();
  const [formData, setFormdata] = useState({
    class: "All",
    section: "All",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      class: "All",
      section: "All",
    },
  });
  const onSubmit = (data) => {
    setFormdata(data);
  };
  
  useEffect(() => {
    setSearch(formData);
    if (formData) {
      const classTime = timeTable.filter(
        (item) =>
          (formData?.class === "All" || item?.class === formData?.class) &&
          (formData?.section === "All" || item.section === formData?.section)
      );
      setSearch(classTime);
    }
  }, [formData, timeTable]);
  const handleDelete = (index) => {
    const updatedData = timeTable.filter((_, i) => i !== index);
    setTimeTable(updatedData);
  };
  const handleEdit=(index)=>{
    
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Container>
      <Box>
        <Typography>Class Timing</Typography>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="attendance">
              <FormInputSelect
                control={control}
                className="mt-4 "
                name="class"
                label="Select Class"
                options={["All", ...selectclass]}
              />
              <FormInputSelect
                control={control}
                className="mt-4 ml-2"
                name="section"
                label="Select Section"
                options={["All", "A", "B", "C"]}
              />

              <Button
                type="submit"
                className="ml-2 h-fit mt-5 bg-white border-4 rounded border-black "
              >
                <SearchIcon className="text-black" />
              </Button>
            </div>
          </form>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Days</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {search?.length > 0 ? (
              <>
                {search?.map((item, index) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.section}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>
                      {new Date(item.start_time).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      {new Date(item.end_time).toLocaleTimeString()}
                    </TableCell>
                    <TableCell className="text-clip overflow-hidden">
                      <Tooltip
                        arrow
                        placement="top-start"
                        title={<span>{item.day}</span>}
                      >
                        <span>{`${item.day.slice(0, 100)}`}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{item.teacher}</TableCell>
                    <TableCell>     <DeleteIcon
                          className="text-red-500"
                          onClick={() => handleDelete(index)}
                        />
                         <EditIcon
                          className="text-green-500"
                          onClick={() => handleEdit(index)}
                        />
                        </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    {`We couldn’t find the timetable for this class. Please verify
                    your selection or reach out if you need help!`}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={search?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  );
};

export default ClassRoutineTable;
