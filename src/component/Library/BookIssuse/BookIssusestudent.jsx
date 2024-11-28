import DateRangeSelect from "@/component/shared/form/DateRangePicker";
import FormInputSelect from "@/component/shared/form/FormInputSelect";
import UserContext from "@/context/UserContext";
import { Button, Container, Typography } from "@mui/joy";
import { Box } from "@mui/material";
import React, { useContext } from "react";

const BookIssusestudent = ({ control }) => {
    const {studentData,libraryrecord}=useContext(UserContext)
  return (
    <>
      <Container>
        <Box>
          <Typography>Book Issue By the Student</Typography>
          <div className="attendance">
            <FormInputSelect
              control={control}
              name="studentname"
              label="Student Name"
              options={studentData?.map((item)=>item?.name)}
            />
           <FormInputSelect
              control={control}
              className="ml-2"
              name="rollno"
              label="Student rollno"
              options={studentData?.map((item)=>item?.rollno)}
            />
          </div>
          <div className="attendance">
          <FormInputSelect
              className="mt-4"
              control={control}
              name="bookname"
              label="Book Name"
              options={libraryrecord?.map((item)=>item?.bookname)}
            />
            <FormInputSelect
              control={control}
              name="writer"
              label="writer"
              className="mt-4 ml-2"
              options={libraryrecord?.map((item)=>item?.writer)}
            />
            <DateRangeSelect
              control={control}
              name="leavedate"
              className="mt-4 ml-2"
              label="Leave Date"
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            color="primary"
          >
            Add Record
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default BookIssusestudent;
