import { Box, Button, Container, Table, Typography } from "@mui/joy";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import DateSelect from "../shared/form/DatePicker";
import { useForm } from "react-hook-form";
import FormInputSelect from "../shared/form/FormInputSelect";

const AttendenceTable = ({ studenAtt, open, setOpen }) => {
  const { handleSubmit, control,reset } = useForm();
  const onSubmit = (data) => {
    console.log("attendencetable",data)
    setOpen(false);
    reset()
  };
  return (
    <>
      {studenAtt.length !== 0 && open ? (
        <>
          {" "}
          <Container className="attendance-form bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-whit">
            <Typography variant="h4" className="mb-4">
              Take Attendance
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell
                      colSpan="2"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Select Date
                      <DateSelect
                        className="mt-2 w-44 ml-2"
                        control={control}
                        name="attendance"
                        label="Select Date"
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studenAtt.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <FormInputSelect
                          control={control}
                          name={`attendance_status_${item.name}`}
                          label="Mark Attendance"
                          options={["Present", "Absent", "Leave"]}
                          className="mt-4 w-44"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                type="submit"
                variant="contained"
                className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                color="primary"
              >
                Upload Attendence
              </Button>
            </form>
          </Container>
        </>
      ) : (
        <>
          {open ? (
            <>
              <Container className="bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-white text-center">
                <Typography className="text-2xl">
                  Student data is not Avaliable
                </Typography>
              </Container>
            </>
          ) : (
            <>
              <Container className="bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-white text-center">
                <Typography className="text-2xl">
                  Select Your Class And Section First
                </Typography>
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AttendenceTable;
