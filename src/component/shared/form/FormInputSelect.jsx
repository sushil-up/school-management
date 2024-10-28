import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

const FormInputSelect = ({
  name,
  control,
  label,
  options,
  errors,
  defaultValue,
  className,
}) => {
  return (
    <>
      <FormControl fullWidth error={!!errors?.[name]}>
        <InputLabel className="mt-4">{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message}
          defaultValue={defaultValue || ""}
          render={({ field }) => (
            <Select label={label} id={name} className={className} {...field}>
              {options?.map((option, index) => (
                <MenuItem key={index} value={option} className="capitalize">
                  {option}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors?.[name] && (
          <p className="text-red-600 ">{errors[name]?.message}</p>
        )}
      </FormControl>
    </>
  );
};

export default FormInputSelect;
