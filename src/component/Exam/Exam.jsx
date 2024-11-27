"use client";
import React from "react";
import { selectclass } from "../SelectClass";
import DateSelect from "../shared/form/DatePicker";
import { Box, Button, Container, Typography } from "@mui/joy";
import FormInput from "../shared/form/TextField";
import FormInputSelect from "../shared/form/FormInputSelect";
import FormTimePicker from "../shared/form/TimePicker";

const Exam = ({ control, errors }) => {
  return (
    <Container className="attendance-form bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-white">
      <Typography>Add New Exam</Typography>
      <Box>
      <FormInputSelect
          control={control}
          className="mt-4"
          name="exam_type"
          label="Select Exam Type"
          options={["Class Test", "Mid term", "Board Exam","Anual Exam"]}
          errors={errors}
        />
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
          className="mt-4"
          name="section"
          label="Select Section"
          options={["A", "B", "C"]}
          errors={errors}
        />
        <FormInput
          control={control}
          className="mt-4 "
          name="subject"
          label="Subject Name"
          placeholder="Subject Name"
          inputType="text"
          errors={errors}
        />
        <DateSelect
          className="mt-4 "
          control={control}
          name="examdate"
          label="Exam Date"
        />
        <FormTimePicker
          control={control}
          lable="Exam Time"
          name="exam_time"
          className="mt-2"
          errors={errors}
        />
        <br />

        <Button className="mt-4 ml-2 bg-red-500 hover:bg-red-600" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Exam;
