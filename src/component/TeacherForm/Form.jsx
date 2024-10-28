"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/joy";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import FormInput from "../shared/form/TextField";
import FormInputSelect from "../shared/form/FormInputSelect";
import DateSelect from "../shared/form/DatePicker";

const steps = ["Personal Details", "Joining Detail", "Class Teacher"];

export default function Form({ control, update, handleClose }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleStep = (step) => () => setActiveStep(step);

  const handleComplete = () => {
    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
              <Button
                className=" btn mt-4 bg-red-500 text-black py-2 px-4 rounded hover:bg-red-600"
                type="submit"
              >
                {update === false ? <>Add Teacher</> : <>Update Teacher</>}
              </Button>
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                className="addstudent"
              >
                <Typography variant="h6"> Add New Admin</Typography>
                <Button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={handleClose}
                >
                  View All
                </Button>
              </Grid>
            </Typography>
            {activeStep === 0 && (
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Item>
                      <FormInput
                        control={control}
                        name="name"
                        className="mt-4"
                        label="Name"
                        placeholder="Name"
                        inputType="text"
                        id="name"
                      />
                      <FormInputSelect
                        control={control}
                        name="gender"
                        className="mt-4"
                        label="Select Gender"
                        options={["Male", "Female", "Other"]}
                      />
                      <DateSelect
                        control={control}
                        name="dob"
                        className="mt-4"
                        label=" DOB"
                      />
                      <FormInput
                        control={control}
                        name="address"
                        className="mt-4"
                        label="Address"
                        placeholder="Address"
                        inputType="text"
                        id="address"
                        multiline
                        rows={4}
                      />
                      <FormInput
                        control={control}
                        name="phone"
                        className="mt-4"
                        label="Phone"
                        placeholder="Phone No"
                        inputType="tel"
                        id="phone"
                      />
                      <FormInput
                        control={control}
                        name="email"
                        className="mt-4"
                        label="Email"
                        placeholder="Enter Email"
                        inputType="email"
                        id="email"
                      />
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            )}
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {activeStep === 1 && (
                <>
                  {" "}
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={4} sm={8} md={12}>
                        <Item>
                          <DateSelect
                            control={control}
                            name="joiningdate"
                            className="mt-4"
                            label=" Joining Date"
                          />

                          <FormInput
                            control={control}
                            name="salary"
                            className="mt-4"
                            label="Salary"
                            placeholder="Salary"
                            inputType="text"
                            id="salary"
                          />
                          <FormInput
                            control={control}
                            name="designation"
                            className="mt-4"
                            label="Designation"
                            placeholder="Designation"
                            inputType="text"
                            id="designation"
                          />
                          <FormInput
                            control={control}
                            name="qualification"
                            className="mt-4"
                            label="Qualification"
                            placeholder="Qualification"
                            inputType="text"
                            id="qualification"
                          />
                        </Item>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              )}
            </Typography>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {activeStep === 2 && (
                <>
                  <Box className="detail">Parents Detail</Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={4} sm={8} md={12}>
                        <Item>
                          <FormInput
                            control={control}
                            name="class"
                            className="mt-4"
                            label="Class"
                            placeholder="Class"
                            inputType="text"
                            id="class"
                          />
                          <FormInputSelect
                            control={control}
                            name="section"
                            className="mt-4"
                            label="Select Section"
                            options={["A", "B", "C"]}
                          />
                        </Item>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              )}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
