import DateRangeSelect from "@/component/shared/form/DateRangePicker";
import FormInputSelect from "@/component/shared/form/FormInputSelect";
import { Box, Button, Container, Typography } from "@mui/joy";
import React from "react";

const BookIssuseteacher = ({control}) => {
  return (
    <>
      <Container>
        <Box>
          <Typography>Book Issue By the Teacher</Typography>
          <div className="attendance">
            <FormInputSelect
              control={control}
              name="teachername"
              label="Teacher Name"
            />
            <FormInputSelect
              control={control}
              className="ml-2"
              name="bookname"
              label="Book Name"
            />
          </div>
          <div className="attendance">
            <FormInputSelect control={control} name="writer" label="writer" className="mt-4"/>
            <DateRangeSelect
              control={control}
              name="leavedate"
              className="mt-4"
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

export default BookIssuseteacher;
