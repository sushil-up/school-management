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
import FormInput from "../shared/form/TextField";
import DateRangeSelect from "../shared/form/DateRangePicker";
import DateSelect from "../shared/form/DatePicker";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import UserContext from "@/context/UserContext";
import FormSelect from "../shared/form/FormSelect";
import RadioButton from "../shared/form/RadioButton";
export const LeaveRequest = ({ handleChange, value, control, errors }) => {
  const { teacherData } = useContext(UserContext);
  const { data: session } = useSession();
  const techData = teacherData.filter(
    (item) => item?.email === session?.user?.email
  );
  return (
    <>
      <Container className="bg-slate-50 mt-5 border-4 shadow-md rounded-lg border-white">
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
                  label="Multiple Days"
                />
              </RadioGroup>
              <FormControl>
                <FormSelect
                  control={control}
                  className="mt-4 w-56 ml-2"
                  name="name"
                  label="Select Name"
                  options={techData?.map((item) => item.name)}
                />
              </FormControl>
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
              errors={errors}
            />
            <br />
            {session?.user?.role !== "admin" ? (
              <></>
            ) : (
              <>
              <br/>
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
              </>
            )}
            <Button
              className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              type="submit"
            >
              Submit Leave Request
            </Button>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
