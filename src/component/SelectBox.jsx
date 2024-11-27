import { useContext } from "react";
import FormInputSelect from "./shared/form/FormInputSelect";
import UserContext from "@/context/UserContext";

const SelectBox = ({ control }) => {
  const { studentData } = useContext(UserContext);
  const classList = studentData?.map((item) => item.class);
  const List = Array?.from(new Set(classList));
  const sectionList = studentData?.map((item) => item.section);
  const section = Array?.from(new Set(sectionList));
  return (
    <>
      <FormInputSelect
        control={control}
        className="mt-4 "
        name="class"
        label="Select Class"
        options={List}
      />
      <FormInputSelect
        control={control}
        className="mt-4 ml-2"
        name="section"
        label="Select Section"
        options={section}
      />
    </>
  );
};
export default SelectBox;
