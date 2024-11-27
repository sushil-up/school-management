"use client";
import UserContext from "@/context/UserContext";
import { Box, Button, Container, Table, Typography } from "@mui/joy";
import React, { useContext, useEffect, useState } from "react";
import {  useForm } from "react-hook-form";
import DateSelect from "../shared/form/DatePicker";
import AttendenceTable from "./AttendenceTable";
import SelectBox from "../SelectBox";
const Attendence = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      class: "1",
      section: "A",
    },
  });
  const [formdata, setFormdata] = useState();
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState();
  const onSubmit = (data) => {
    setFormdata(data);
    setOpen(true);
  };
  const { studentData } = useContext(UserContext);
  useEffect(() => {
    if (formdata) {
      const studenAtt = studentData.filter(
        (item) =>
          item?.class === formdata?.class && item.section === formdata?.section
      );
      setStudent(studenAtt);
    }
  }, [formdata, studentData]);


  return (
    <>
      <Container className="bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-white">
        <Box>
          <Typography className="text-2xl"> Attendence</Typography>
          <Typography className="text-sm">
            By select your class and section
          </Typography>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="attendance">
          <SelectBox control={control}/>
              <DateSelect
                className="mt-4 ml-2"
                control={control}
                name="date"
                label="Select Date"
              />
              <Button
                className="mt-4 ml-2 bg-red-500 hover:bg-red-600"
                type="submit"
              >
                Attendence
              </Button>
            </div>
            <br />
          </form>
        </Box>
      </Container>
      <AttendenceTable
        student={student}
        open={open}
        setOpen={setOpen}
        formdata={formdata}
      />
    </>
  );
};

export default Attendence;
