import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { FormControl } from "@mui/joy";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export default function FormTimePicker({ name, control, label, className }) {
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <DemoContainer components={["TimePicker"]}>
              <TimePicker
                {...field}
                className={className}
                label={label}
                value={field?.value ? dayjs(field?.value) : null}  
                onChange={(newValue) => field?.onChange(newValue ? newValue?.toDate() : null)}
              />
             </DemoContainer>
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
