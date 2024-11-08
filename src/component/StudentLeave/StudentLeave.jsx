"use client";
import UserContext from "@/context/UserContext";
import { Box, Button, Container, FormLabel, Grid, Typography } from "@mui/joy";
import React, { useContext } from "react";
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
import RadioButton from "../shared/form/RadioButton";
import { selectclass } from "../SelectClass";
const StudentLeave = ({ handleChange, value, control, editIndex,errors }) => {
  const { studentData } = useContext(UserContext);
  return (
    <>
      <Container className="bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-white">
      <Container className="mt-5 text-center text-black bg-color rounded-lg border-inherit">
        <Typography className="text-black text-3xl">
          {editIndex !== null
            ? "Update   Student Leave Request"
            : "  Student Leave Request"}
        </Typography>
      </Container>
      <Box className="mt-5">
        <Grid>
          <Typography>
            {editIndex !== null
              ? "Update Your Leave Request"
              : "Add Your Leave Request"}
          </Typography>
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
          <br />
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
              errors={errors}
            />
          </FormControl>
          <FormControl>
            <FormSelect
              control={control}
              className="mt-4 w-56 ml-2"
              name="rollno"
              label="Select Rollno"
              options={studentData}
              errors={errors}
            />
          </FormControl>
          {value === "singleday" ? (
            <>
              <DateSelect
                control={control}
                className="mt-4"
                name="leavedate"
                label="Leave Date"
                errors={errors}
              />
            </>
          ) : (
            <>
              <DateRangeSelect
                control={control}
                name="leavedate"
                className="mt-4"
                label="Leave Date"
                errors={errors}
              />
            </>
          )}
          <br />
          <FormInput
            control={control}
            name="reason"
            className="mt-4"
            label="Enter Reason"
            placeholder="Enter Reason"
            inputType="text"
            errors={errors}
          />
          <FormControl>
            <RadioButton
              control={control}
              label="Status"
              name="status"
              options={[
                { label: "Approved", value: "approved" },
                { label: "Unapproved", value: "unapproved" },
              ]}
              errors={errors}
            />
          </FormControl>
          <br />
          <Button
            className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            type="submit"
          >
            {editIndex !== null
              ? " Update Student Leave"
              : "Add Student Leave"}
          </Button>
        </Grid>
      </Box>
      </Container>
    </>
  );
};

export default StudentLeave;
