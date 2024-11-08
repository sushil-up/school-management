import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { FormControl } from "@mui/joy";
import { Controller } from "react-hook-form";

export default function FormTimePicker({ name,control,lable,className }) {
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <DemoContainer components={["TimePicker"]}>
              <TimePicker {...field}   className={className} name={name}label={lable} 
              />
            </DemoContainer>
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
