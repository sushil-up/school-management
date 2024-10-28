"use client";
import UserContext from "@/context/UserContext";
import { Box, Button, Container, Table, Typography } from "@mui/joy";
import React, { useContext, useState } from "react";
import FormInputSelect from "../shared/form/FormInputSelect";
import { useForm } from "react-hook-form";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import DateSelect from "../shared/form/DatePicker";
import AttendenceTable from "./AttendenceTable";

const Attendence = () => {
  const { handleSubmit, control } = useForm();
  const [data, setData] = useState();
  const [open,setOpen]= useState(false)
  const onSubmit = (data) => {
    setData(data);
    setOpen(true)
  };
  const { studentData } = useContext(UserContext);
  const studenAtt = studentData.filter(
    (item) => item?.class === data?.class && item.section === data?.section
  );
  console.log("studenAttendence", studenAtt);
  const selectclass = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  return (
    <>
      <Container className="bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-white">
        <Box>
          <Typography className="text-2xl">Take Student Attendence</Typography>
          <Typography className="text-sm">By select your class and section  </Typography>
          <br/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="attendance">
              <FormInputSelect
                control={control}
                className="mt-4 w-56"
                name="class"
                label="Select Class"
                options={selectclass}
              />
              <FormInputSelect
                control={control}
                className="mt-4 w-56"
                name="section"
                label="Select Section"
                options={["A", "B", "C"]}
              />

              <Button className="mt-4 w-56 bg-red-500 hover:bg-red-600" type="submit">
                Take Attendence
              </Button>
            </div>
            <br/>
          </form>
        </Box>
      </Container>
      <AttendenceTable studenAtt={studenAtt} open={open} setOpen={setOpen}/>
    </>
  );
};

export default Attendence;
