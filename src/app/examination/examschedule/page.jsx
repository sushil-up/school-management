"use client";
import ExamTable from "@/component/Exam/ExamTable";
import React, { useContext, useEffect, useState } from "react";
import FormInputSelect from "@/component/shared/form/FormInputSelect";
import { Box, Button } from "@mui/joy";
import { useForm } from "react-hook-form";
import UserContext from "@/context/UserContext";
import { selectclass } from "@/component/SelectClass";

const ExamSchedule = () => {
  const { examination } = useContext(UserContext);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      class: "All",
      section: "All",
      select_type: "All",
    },
  });
  const [tableData, setTableData] = useState();
  const [filterData, setFilterData] = useState({
    class: "All",
    section: "All",
    select_type: "All",
  });
  const onSubmit = (data) => {
    setFilterData(data);
    reset();
  };
  useEffect(() => {
    if (filterData) {
      const examData = examination.filter(
        (item) =>
          (item.class === filterData.class &&
            item.section === filterData.section &&
            item.exam_type === filterData.select_type) ||
          (filterData.class === "All" &&
            filterData.section === "All" &&
            filterData.select_type === "All")
      );
      setTableData(examData);
    }
  }, [filterData, examination]);
  return (
    <>
    <Box>View Examination Schedule</Box>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="attendance">
            <FormInputSelect
              control={control}
              className="mt-4 "
              name="class"
              label="Select Class"
              options={[...selectclass, "All"]}
            />
            <FormInputSelect
              control={control}
              className="mt-4 ml-2"
              name="section"
              label="Select Section"
              options={["All", "A", "B", "C"]}
            />
            <FormInputSelect
              control={control}
              className="mt-4 ml-2"
              name="select_type"
              label="Select Exam Type"
              options={[
                "All",
                "Class Test",
                "Mid term",
                "Board Exam",
                "Anual Exam",
              ]}
            />
            <Button
              type="submit"
              className="ml-2 h-fit mt-5 border-4 bg-teal-400 rounded border-black "
            >
              Search
            </Button>
          </div>
        </form>
      </Box>
      <br />
      <ExamTable tableData={tableData} />
    </>
  );
};

export default ExamSchedule;
