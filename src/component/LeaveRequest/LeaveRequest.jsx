"use client";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Typography,
} from "@mui/joy";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
// import DateSelect from "../shared/form/DatePicker";
import { useForm } from "react-hook-form";
import FormInput from "../shared/form/TextField";
import DateRangeSelect from "../shared/form/DateRangePicker";

export const LeaveRequest = () => {
  const { control, handleSubmit } = useForm();
  const [value, setValue] = useState("singleday");
console.log("value",value)
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const onSubmit = (data) => {
    console.log("data", data);
  };
  return (
    <>
      <Container className="mt-5 text-center text-white bg-slate-500 rounded-lg border-inherit">
        <Typography className="text-white text-3xl">Leave Request</Typography>
      </Container>
      <Box>
        <Grid>
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
            <DateRangeSelect
              control={control}
              name="leavedate"
              className="mt-4"
              label="Leave Date"
            />
            <FormInput
              control={control}
              name="reason"
              className="mt-4"
              label="Enter Reason"
              placeholder="Enter Reason"
              inputType="text"
              id="reason"
            />
            <Button type="submit">Submit Leave Request</Button>
          </form>
        </Grid>
      </Box>
    </>
  );
};
