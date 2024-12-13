"use client";
import React from "react";
import { Box, Button, Container, Typography } from "@mui/joy";
import FormInput from "../shared/form/TextField";
import FormInputSelect from "../shared/form/FormInputSelect";
import { selectclass } from "../SelectClass";
import DateSelect from "../shared/form/DatePicker";

const AddBooks = ({ control, errors }) => {
  return (
    <>
      <Container>
        <Box>
          <Typography>Add New Book Record</Typography>

          <div className="attendance mt-4">
            <FormInput control={control} name="bookname" label="Book Name"   errors={errors}/>
            <FormInput
              control={control}
              name="subject"
              label="Subject"
              className="ml-2"
              errors={errors}
            />
            <FormInput
              control={control}
              name="title"
              label="Title"
              className="ml-2"
              errors={errors}
            />
          </div>
          <div className="attendance mt-4">
            <FormInput
              control={control}
              name="writer"
              label="Writer Name"
              errors={errors}
            />
            <FormInput
              control={control}
              name="bookno"
              label="Book No"
              className="ml-2"
              inputType="number"
              min="0"
              errors={errors}
            />
            <FormInputSelect
              control={control}
              className="ml-2 "
              name="class"
              label="Select Class"
              options={selectclass}
              errors={errors}
            />
          </div>
          <div className="attendance mt-4">
            <DateSelect
              className="mt-4 "
              control={control}
              name="publishdate"
              label="Publish Date"
            />
            <DateSelect
              className="mt-4 ml-2"
              control={control}
              name="uploaddate"
              label="Upload Date"
            />
          </div>
        </Box>
        <Button
          type="submit"
          variant="contained"
          className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          color="primary"
        >
          Add Book
        </Button>
      </Container>
    </>
  );
};

export default AddBooks;
