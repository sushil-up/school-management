"use client";
import FormSelect from "@/component/shared/form/FormSelect";
import RadioButton from "@/component/shared/form/RadioButton";
import FormInput from "@/component/shared/form/TextField";
import UserContext from "@/context/UserContext";
import { Button, FormControl } from "@mui/joy";
import { Container } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";

const ByTeacher = ({ control, edit }) => {
  const { teacherData, libraryrecord } = useContext(UserContext);
  const { data: session } = useSession();
  const techData = teacherData.filter(
    (item) => item?.email === session?.user?.email
  );
  return (
    <>
      <Container>
        <div className="attendance">
          {session?.user?.role === "librarian" ? (
            <>
              <FormInput
                control={control}
                className="mt-4  "
                name="name"
                label="Select Name"
                defaultValue={edit?.name}
              />
            </>
          ) : (
            <>
              <FormSelect
                control={control}
                className="mt-4  "
                name="name"
                label="Select Name"
                options={techData?.map((item) => item.name)}
              />
            </>
          )}
          <FormSelect
            control={control}
            className="mt-4 ml-2 "
            name="book"
            label="Select Book"
            options={libraryrecord?.map((item) => item.bookname)}
          />
          <FormSelect
            control={control}
            className="mt-4 ml-2 "
            name="writer"
            label="Writer Name"
            options={libraryrecord?.map((item) => item.writer)}
          />
        </div>
        <FormSelect
          control={control}
          className="mt-4  "
          name="bookno"
          label="Book No"
          options={libraryrecord?.map((item) => item.bookno)}
        /><br/>
        {session?.user?.role === "librarian" ? (
          <>
          <br/>
            <FormControl>
              <RadioButton
                control={control}
                label="Status"
                name="status"
                options={[
                  { label: "Approved", value: "Approved" },
                  { label: "Unapproved", value: "Unapproved" },
                ]}
              />
            </FormControl>
          </>
        ) : (
          <></>
        )}
        <Button type="submit" className="mt-4 bg-red-600 ">
          Send Request
        </Button>
      </Container>
    </>
  );
};

export default ByTeacher;
