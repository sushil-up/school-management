"use client";
import { Box, Button, Container, Typography } from "@mui/joy";
import React, { useContext } from "react";
import FormInputSelect from "../shared/form/FormInputSelect";
import { selectclass, selectDays } from "../SelectClass";
import FormInput from "../shared/form/TextField";
import FormTimePicker from "../shared/form/TimePicker";
import UserContext from "@/context/UserContext";
import FormSelect from "../shared/form/FormSelect";
const TimeTable = ({ control ,errors}) => {
  const { teacherData } = useContext(UserContext);
  return (
    <>
      <Container className="attendance-form bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-white">
        <Typography>Add New Routine</Typography>
        <Box>
          <div className="attendance">
            <FormInputSelect
              control={control}
              className="mt-4 "
              name="class"
              label="Select Class"
              options={selectclass}
              errors={errors}
            />
            <FormInputSelect
              control={control}
              className="mt-4 ml-2"
              name="section"
              label="Select Section"
              options={["A", "B", "C"]}
              errors={errors}
            />
            <FormInput
              control={control}
              className="mt-4 ml-2"
              name="subject"
              label="Subject"
              placeholder="Subject"
              inputType="text"
              errors={errors}
            />
          </div>
          <br />
          <Typography>Select Time Range</Typography>
          <div className="attendance">
            <FormTimePicker
              control={control}
              lable="Start Time"
              name="start_time"
              className="mt-2"
              errors={errors}
            />
            <FormTimePicker
              control={control}
              name="end_time"
              lable="End Time"
              className="ml-2 mt-2"
              errors={errors}
            />
            <FormInputSelect
              control={control}
              className="ml-2 mt-4 w-64"
              name="day"
              label="Select day"
              options={selectDays}
              multiple={true}
              errors={errors}
            />
          </div>
          <div className="attendance">
          <FormInput
              control={control}
              className="mt-4 "
              name="classno"
              label="Room No"
              placeholder="Enter Room No"
              inputType="text"
              errors={errors}
            />
            <FormSelect
              control={control}
              className="mt-4 w-56 ml-2"
              name="teacher"
              label="Select Teacher"
              options={teacherData}
              errors={errors}
            />
          </div>
          <Button
            className="mt-4 ml-2 bg-red-500 hover:bg-red-600"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default TimeTable;
