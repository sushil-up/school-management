"use client";
import { Box, Button, Typography } from "@mui/joy";
import React, { useContext } from "react";
import FormInputSelect from "../shared/form/FormInputSelect";
import { selectclass, selectDays } from "../SelectClass";
import FormInput from "../shared/form/TextField";
import FormTimePicker from "../shared/form/TimePicker";
import UserContext from "@/context/UserContext";
import FormSelect from "../shared/form/FormSelect";
const EditClassRoutine = ({ control }) => {
  const { teacherData } = useContext(UserContext);
  return (
    <>
        <Typography>Update Routine</Typography>
        <Box>
          <FormInputSelect
            control={control}
            className="mt-4 "
            name="class"
            label="Select Class"
            options={selectclass}
          />
          <FormInputSelect
            control={control}
            className="mt-4 "
            name="section"
            label="Select Section"
            options={["A", "B", "C"]}
          />
          <FormInput
            control={control}
            className="mt-4 "
            name="subject"
            label="Subject"
            placeholder="Subject"
            inputType="text"
          />
          <br />
          <br />
          <Typography>Select Time Range</Typography>
          <div className="attendance">
            <FormTimePicker
              control={control}
              lable="Start Time"
              name="start_time"
              className="mt-2"
            />
            <FormTimePicker
              control={control}
              name="end_time"
              lable="End Time"
              className="ml-2 mt-2"
            />
          </div>
          <br />
          <FormInputSelect
            control={control}
            className="mt-4 "
            name="day"
            label="Select day"
            options={selectDays}
            multiple={true}
          />
          <br />
          <FormInput
            control={control}
            className="mt-4 "
            name="classno"
            label="Room No"
            placeholder="Enter Room No"
            inputType="text"
          />
          <br />
          <FormSelect
            control={control}
            className="mt-4 "
            name="teacher"
            label="Select Teacher"
            options={teacherData.map((item)=>item?.name)}
          />
          <br />
          <Button
            className="mt-4 bg-red-500 hover:bg-red-600"
            type="submit"
          >
            Update
          </Button>
        </Box>
    </>
  );
};

export default EditClassRoutine;
