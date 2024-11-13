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
import FormInput from "../shared/form/TextField";
import FormInputSelect from "../shared/form/FormInputSelect";
import DateSelect from "../shared/form/DatePicker";
import { useState } from "react";

const steps = ["Personal Details", "Admission Detail", "Parents Detail"];

export default function Form({ control, update, handleClose, errors }) {
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
    <Container>
      <Box sx={{ width: "85%" }}>
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
                    {update === false ? <>Add Student</> : <>Update Student</>}
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
                  <Typography variant="h6">New Admission</Typography>
                  <Button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={handleClose}
                  >
                    View Student
                  </Button>
                </Grid>
              </Typography>
              {activeStep === 0 && (
                <Box sx={{ flexGrow: 1 }} className="">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Item>
                        <FormInput
                          control={control}
                          className="mt-4 "
                          name="name"
                          label="Name"
                          placeholder="Name"
                          inputType="text"
                          errors={errors}
                        />
                        <FormInputSelect
                          control={control}
                          className="mt-4 "
                          name="gender"
                          label="Select Gender"
                          options={["Male", "Female", "Other"]}
                          errors={errors}
                        />
                        <DateSelect
                          control={control}
                          className="mt-4"
                          name="dob"
                          label="DOB"
                          errors={errors}
                        />
                        <FormInput
                          control={control}
                          className="mt-4"
                          name="religion"
                          label="Religion"
                          placeholder="Religion"
                          inputType="text"
                          errors={errors}
                        />
                        <FormInput
                          control={control}
                          className="mt-4"
                          name="caste"
                          label="Caste"
                          placeholder="Enter Caste"
                          inputType="text"
                          errors={errors}
                        />
                        <FormInput
                          control={control}
                          className="mt-4"
                          name="bloodgroup"
                          label="Blood Group"
                          placeholder="Blood Group"
                          inputType="text"
                          errors={errors}
                        />
                        <FormInput
                          control={control}
                          className="mt-4"
                          name="address"
                          label="Address"
                          placeholder="Address"
                          inputType="text"
                          multiline
                          rows={4}
                          errors={errors}
                        />
                        <FormInput
                          control={control}
                          className="mt-4"
                          name="phone"
                          label="Phone"
                          placeholder="Phone No"
                          inputType="tel"
                          errors={errors}
                        />
                        <FormInput
                          control={control}
                          className="mt-4"
                          name="email"
                          label="Email"
                          placeholder="Enter Email"
                          inputType="email"
                          errors={errors}
                        />
                        <FormInput
                          control={control}
                          className="mt-4"
                          name="city"
                          label="City"
                          placeholder="Enter City"
                          inputType="text"
                          errors={errors}
                        />
                        <FormInput
                          control={control}
                          className="mt-4"
                          name="state"
                          label="State"
                          placeholder="Enter State"
                          inputType="text"
                          errors={errors}
                        />
                        <FormInput
                          control={control}
                          className="mt-4"
                          name="country"
                          label="Country"
                          placeholder="Enter Country"
                          inputType="text"
                          errors={errors}
                        />
                        <FormInput
                          control={control}
                          className="mt-4"
                          name="id_proof"
                          label="Upload ID Proof"
                          placeholder="Upload ID Proof"
                          inputType="file"
                          errors={errors}
                        />
                        <FormInput
                          control={control}
                          className="mt-4"
                          name="birthplace"
                          label="Birth Place"
                          placeholder="Birth Place"
                          inputType="text"
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
                              name="admissiondate"
                              className="mt-4"
                              label=" Admission Date"
                              errors={errors}
                            />
                            <FormInputSelect
                              control={control}
                              name="studenttype"
                              className="mt-4"
                              label="Student Type"
                              options={["Private", "Regular", "Registered"]}
                              errors={errors}
                            />
                            <FormInput
                              control={control}
                              name="class"
                              className="mt-4"
                              label="Class"
                              placeholder="Class"
                              inputType="number"
                              min="0"
                              id="class"
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

                            <FormInput
                              control={control}
                              name="admissionno"
                              className="mt-4"
                              label="Admission No"
                              placeholder="Admission No"
                              inputType="number"
                              min="0"
                              id="admissionno"
                              errors={errors}
                            />
                            <FormInput
                              control={control}
                              name="rollno"
                              className="mt-4"
                              label="Roll No"
                              placeholder="Roll No"
                              inputType="number"
                              min="0"
                              id="rollno"
                              errors={errors}
                            />
                            <FormInput
                              control={control}
                              name="photo"
                              className="mt-4"
                              label="Upload Photo"
                              placeholder="Upload Photo"
                              inputType="file"
                              id="photo"
                            />
                            <FormInputSelect
                              control={control}
                              name="medium"
                              className="mt-4"
                              label="Select Medium"
                              options={["Hindi", "English", "Parent Language"]}
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
                              name="fathername"
                              className="mt-4"
                              label="Father Name"
                              placeholder="Father Name"
                              inputType="text"
                              id="fathername"
                              errors={errors}
                            />
                            <FormInput
                              control={control}
                              name="fatherphone"
                              className="mt-4"
                              label="Father Phone"
                              placeholder="Father Phone"
                              inputType="tel"
                              id="fatherphone"
                              errors={errors}
                            />
                            <FormInput
                              control={control}
                              name="fatheroccupation"
                              className="mt-4"
                              label="Father Occupation"
                              placeholder="Father Occupation"
                              inputType="text"
                              id="fatheroccupation"
                              errors={errors}
                            />
                            <FormInput
                              control={control}
                              name="mothername"
                              className="mt-4"
                              label="Mother Phone"
                              placeholder="Mother Phone"
                              inputType="text"
                              id="mothername"
                              errors={errors}
                            />
                            <FormInput
                              control={control}
                              name="motherphone"
                              className="mt-4"
                              label="Mother Phone"
                              placeholder="Mother Phone"
                              inputType="tel"
                              id="motherphone"
                              errors={errors}
                            />
                            <FormInput
                              control={control}
                              name="motheroccupation"
                              className="mt-4"
                              label="Mother Occupation"
                              placeholder="Mother Occupation"
                              inputType="text"
                              id="motheroccupation"
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
                  className="btn  bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
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
  );
}
