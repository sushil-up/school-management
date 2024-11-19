"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/joy";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import FormInput from "../shared/form/TextField";
import FormInputSelect from "../shared/form/FormInputSelect";
import DateSelect from "../shared/form/DatePicker";

const steps = ["Personal Details", "Joining Detail", "Class Teacher","Set Password"];

export default function Form({ control, update, handleClose,errors }) {
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
    <>
      <Container>
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
              All steps completed
              <div className="grid justify-items-end ">
                <Button
                  type="submit"
                  className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  {update === false ? <>Add Teacher</> : <>Update Teacher</>}
                </Button>
              </div>
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={handleReset}
                className="btn mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Reset
              </Button>
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
                      className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
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
                            errors={errors}
                          />
                          <FormInputSelect
                            control={control}
                            name="gender"
                            className="mt-4"
                            label="Select Gender"
                            options={["Male", "Female", "Other"]}
                            errors={errors}
                          />
                          <DateSelect
                            control={control}
                            name="dob"
                            className="mt-4"
                            label=" DOB"
                            errors={errors}
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
                            errors={errors}
                          />
                          <FormInput
                            control={control}
                            name="phone"
                            className="mt-4"
                            label="Phone"
                            placeholder="Phone No"
                            inputType="tel"
                            id="phone"
                            errors={errors}
                          />
                          <FormInput
                            control={control}
                            name="email"
                            className="mt-4"
                            label="Email"
                            placeholder="Enter Email"
                            inputType="email"
                            id="email"
                            errors={errors}
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
                                errors={errors}
                              />

                              <FormInput
                                control={control}
                                name="salary"
                                className="mt-4"
                                label="Salary"
                                placeholder="Salary"
                                inputType="number"
                                id="salary"
                                min="10000"
                                errors={errors}
                              />
                              <FormInput
                                control={control}
                                name="designation"
                                className="mt-4"
                                label="Designation"
                                placeholder="Designation"
                                inputType="text"
                                id="designation"
                                errors={errors}
                              />
                              <FormInput
                                control={control}
                                name="qualification"
                                className="mt-4"
                                label="Qualification"
                                placeholder="Qualification"
                                inputType="text"
                                id="qualification"
                                errors={errors}
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
                                inputType="number"
                                id="class"
                                min="0"
                                max="12"
                                errors={errors}
                              />
                              <FormInputSelect
                                control={control}
                                name="section"
                                className="mt-4"
                                label="Select Section"
                                options={["A", "B", "C"]}
                                errors={errors}
                              />
                            </Item>
                          </Grid>
                        </Grid>
                      </Box>
                    </>
                  )}
                </Typography>
                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                  {activeStep === 3 && (
                    <>
                      <Box className="detail">Set Password</Box>
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
                                name="password"
                                className="mt-4"
                                label="Set Password"
                                placeholder="Set Password"
                                inputType="password"
                                id="class"
                                min="0"
                                max="12"
                                errors={errors}
                              />
                              <FormInputSelect
                                control={control}
                                name="role"
                                className="mt-4"
                                label="Select Role"
                                options={["admin", "teacher"]}
                                errors={errors}
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
                    className="btn  bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    onClick={handleNext}
                    sx={{ mr: 1 }}
                    className="btn  bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
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
                      <Button
                        onClick={handleComplete}
                        className="btn  bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      >
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
      </Container>
    </>
  );
}
