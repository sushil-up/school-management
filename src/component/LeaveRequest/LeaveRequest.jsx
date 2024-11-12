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
export const LeaveRequest = ({handleChange, value,control,editIndex}) => {
 
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
                label="Muiltiple Days"
              />
            </RadioGroup>
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
            />
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
