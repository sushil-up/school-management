"use client";
import ExamTable from "@/component/Exam/ExamTable";
import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FormInputSelect from "@/component/shared/form/FormInputSelect";
import { selectclass } from "@/component/SelectClass";
import { Box, Button } from "@mui/joy";
import { useForm } from "react-hook-form";
import UserContext from "@/context/UserContext";

const ExamSchedule = () => {
  const { examination } = useContext(UserContext);
  const { handleSubmit, control,reset } = useForm({defaultValues:{
    class:"1",
    section:"A",
    select_type:"Class Test"
  }});
  const [tableData, setTableData] = useState();
  const [filterData, setFilterData] = useState();
  const onSubmit = (data) => {
    setFilterData(data);
    reset()
  };
  useEffect(() => {
    if (filterData) {
      const examData = examination.filter(
        (item) =>
          item.class === filterData.class &&
          item.section === filterData.section &&
          item.exam_type === filterData.select_type
      );
      setTableData(examData);
    }
  },[filterData,examination]);
  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="attendance">
            <FormInputSelect
              control={control}
              className="mt-4 "
              name="class"
              label="Select Class"
              options={[...selectclass]}
            />
            <FormInputSelect
              control={control}
              className="mt-4 ml-2"
              name="section"
              label="Select Section"
              options={["A", "B", "C"]}
            />
            <FormInputSelect
              control={control}
              className="mt-4 ml-2"
              name="select_type"
              label="Select Exam Type"
              options={["Class Test", "Mid term", "Board Exam", "Anual Exam"]}
            />
            <Button
              type="submit"
              className="ml-2 h-fit mt-5 bg-white border-4 rounded border-black "
            >
              <SearchIcon className="text-black" />
            </Button>
          </div>
        </form>
      </Box>
      <br/>
      <ExamTable tableData={tableData}/>
    </>
  );
};

export default ExamSchedule;
