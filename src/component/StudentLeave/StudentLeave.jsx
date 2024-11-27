"use client";
import UserContext from "@/context/UserContext";
import { Box, Button, Container, FormLabel, Grid, Typography } from "@mui/joy";
import React, { useContext, useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";
const StudentLeave = ({ handleChange, value, control, editIndex, errors }) => {
  const { studentData } = useContext(UserContext);
  const [storeClass, setStoreClass] = useState(null);
  const [storeSection, setStoreSection] = useState(null);
  const [rollno, setRollNo] = useState([]);
  const {data:session}=useSession()
  useEffect(() => {
    if (storeClass && storeSection !== null) {
      const list = studentData?.filter(
        (item) => item?.class === storeClass && item?.section === storeSection
      );
      setRollNo(list);
    }
  }, [storeClass, storeSection, studentData]);
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
                  name="singleday"
                  control={<Radio />}
                  label="Single Day"
                />
                <FormControlLabel
                  value="multipledays"
                  name="multipledays"
                  control={<Radio />}
                  label="Multiple Days"
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
                onChange={(e) => setStoreClass(e?.target?.value)}
                options={selectclass || []}
                errors={errors}
              />
            </FormControl>
            <FormControl>
              <FormInputSelect
                control={control}
                className="mt-4 w-56 ml-2"
                name="section"
                label="Select Section"
                options={["A", "B", "C"]}
                onChange={(e) => setStoreSection(e?.target?.value)}
                errors={errors}
              />
            </FormControl>
            <FormControl>
              <FormSelect
                control={control}
                className="mt-4 w-56 ml-2"
                name="name"
                label="Select Name"
                options={rollno?.map((item) => item?.name)}
                errors={errors}
              />
            </FormControl>
            <FormControl>
              <FormSelect
                control={control}
                className="mt-4 w-56 ml-2"
                name="rollno"
                label="Select Rollno"
                options={rollno?.map((item) => item?.rollno)}
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
                />
              </>
            ) : (
              <>
                <DateRangeSelect
                  control={control}
                  name="multileave"
                  className="mt-4"
                  label="Leave Date"
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
            {session?.user?.role === "student" ? (
              <></>
            ) : (
              <FormControl>
                <RadioButton
                  control={control}
                  label="Status"
                  name="status"
                  options={[
                    { label: "Approved", value: "approved" },
                    { label: "Unapproved", value: "unapproved" },
                  ]}
                />
              </FormControl>
            )}
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
