"use client";
import UserContext from "@/context/UserContext";
import { Box, Button, Container, Typography } from "@mui/joy";
import React, { useContext, useEffect, useState } from "react";
import FormInputSelect from "../shared/form/FormInputSelect";
import { useForm } from "react-hook-form";
import DateSelect from "../shared/form/DatePicker";
import dayjs from "dayjs";
import ViewTable from "./ViewTable";
import { selectclass } from "../SelectClass";
const ViewAttendence = () => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      class: "1",
      section: "A",
    },
  });
  const { studentAttendence } = useContext(UserContext);
  const [formdata, setFormdata] = useState();
  const [student, setStudent] = useState();
  const onSubmit = (data) => {
    setFormdata(data);
  };
  useEffect(() => {
    if (formdata) {
      const studenAtt = studentAttendence.filter(
        (item) =>
          item?.class === formdata?.class &&
          item.section === formdata?.section &&
          item?.date === dayjs(formdata?.date).format("YYYY-MM-DD")
      );
      setStudent(studenAtt);
    }
    reset();
  }, [formdata, studentAttendence]);

  return (
    <>
      <Container className="attendance-form bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-white">
        <Box>
          <Typography className="text-2xl">Check Student Attendence</Typography>
          <Typography className="text-sm"></Typography>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="attendance">
              <FormInputSelect
                control={control}
                className="mt-4 "
                name="class"
                label="Select Class"
                options={selectclass}
              />
              <FormInputSelect
                control={control}
                className="mt-4 ml-2"
                name="section"
                label="Select Section"
                options={["A", "B", "C"]}
              />
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
                Check Attendence
              </Button>
            </div>
            <br />
          </form>
        </Box>
      </Container>
      <ViewTable student={student} />
    </>
  );
};

export default ViewAttendence;
