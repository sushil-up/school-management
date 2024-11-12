import React from "react";
import { Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const RadioButton = ({
  control,
  label,
  name,
  options,
  errors,
  className,
  defaultValue,
}) => {
  return (
    <FormControl component="fieldset" className={className}>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <RadioGroup
            aria-label={name}
            {...field}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            error={!!errors?.[name]}
            helperText={errors?.[name]?.message}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};

export default RadioButton;
