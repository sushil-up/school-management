"use client";
import UserContext from "@/context/UserContext";
import { Box, Button, Container, FormLabel, Grid, Typography } from "@mui/joy";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import FormInputSelect from "../shared/form/FormInputSelect";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import DateSelect from "../shared/form/DatePicker";
import DateRangeSelect from "../shared/form/DateRangePicker";
import FormInput from "../shared/form/TextField";
import FormSelect from "../shared/form/FormSelect";
const StudentLeave = () => {
  const { handleSubmit, control } = useForm();
  const { studentleave, setStudentLeave, studentData } =
    useContext(UserContext);

  const [value, setValue] = useState("singleday");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const onSubmit = (data) => {
    console.log("data", data);
    const storedData = [...studentleave, data];
    setStudentLeave(storedData);

    const studenAtt = studentData.filter(
      (item) => item?.class === data?.class && item.section === data?.section
    );
  };
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
      <Container className="bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-white"></Container>
      <Container className="mt-5 text-center text-black bg-color rounded-lg border-inherit">
        <Typography className="text-black text-3xl">Leave Request</Typography>
      </Container>
      <Box className="mt-5">
        <Grid>
          <Typography>Add Your Leave Request</Typography>

          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Number of Days:
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="singleday"
                control={<Radio />}
                label="Single Day"
              />
              <FormControlLabel
                value="multipledays"
                control={<Radio />}
                label="Muiltiple Days"
              />
            </RadioGroup>
          </FormControl>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormInputSelect
                control={control}
                className="mt-4 w-56"
                name="class"
                label="Select Class"
                options={selectclass}
              />
            </FormControl>{" "}
            <FormControl>
              <FormInputSelect
                control={control}
                className="mt-4 w-56"
                name="section"
                label="Select Section"
                options={["A", "B", "C"]}
              />
            </FormControl>
            <FormControl>
              <FormSelect
                control={control}
                className="mt-4 w-56 ml-2"
                name="rollno"
                label="Select Rollno"
                options={studentData}
              />
            </FormControl>
            {value === "singleday" ? (
              <>
                {" "}
                <DateSelect
                  control={control}
                  className="mt-4"
                  name="leavedate"
                  label="Leave Date"
                />
              </>
            ) : (
              <>
                {" "}
                <DateRangeSelect
                  control={control}
                  name="leavedate"
                  className="mt-4"
                  label="Leave Date"
                />
              </>
            )}
            <FormInput
              control={control}
              name="reason"
              className="mt-4"
              label="Enter Reason"
              placeholder="Enter Reason"
              inputType="text"
              id="reason"
            />
            <Button
              className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              type="submit"
            >
              Submit Leave Request
            </Button>
          </form>
        </Grid>
      </Box>
    </>
  );
};

export default StudentLeave;
