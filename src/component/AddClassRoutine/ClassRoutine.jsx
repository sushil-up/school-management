"use client";
import { Box, Button, Container, FormControl, Typography } from "@mui/joy";
import React from "react";
import FormInputSelect from "../shared/form/FormInputSelect";
import { selectclass, selectDays } from "../SelectClass";
import FormInput from "../shared/form/TextField";
import FormTimePicker from "../shared/form/TimePicker";

const TimeTable = ({ control }) => {
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
            />
            <FormInputSelect
              control={control}
              className="mt-4 ml-2"
              name="section"
              label="Select Section"
              options={["A", "B", "C"]}
            />
            <FormInput
              control={control}
              className="mt-4 ml-2"
              name="subject"
              label="Subject"
              placeholder="Subject"
              inputType="text"
            />
          </div>
          <br />
          <Typography>Select Time Range</Typography>
          <div className="attendance">
            <FormTimePicker control={control} lable="Start Time" name="start-time" />
            <FormTimePicker
              control={control}
              name="end-time"
              lable="End Time"
              className="ml-2"
            />
              <FormInputSelect
              control={control}
              className="mt-4 "
              name="day"
              label="Select day"
              options={selectDays}
              // multiple={true}
            />
          </div>
          <Button type="submit">Submit</Button>
        </Box>
      </Container>
    </>
  );
};

export default TimeTable;
