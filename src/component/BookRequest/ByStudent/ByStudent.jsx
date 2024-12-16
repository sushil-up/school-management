"use client";
import FormSelect from "@/component/shared/form/FormSelect";
import RadioButton from "@/component/shared/form/RadioButton";
import FormInput from "@/component/shared/form/TextField";
import UserContext from "@/context/UserContext";
import { Button, FormControl } from "@mui/joy";
import { CircularProgress, Container } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";

const ByStudent = ({ control, edit, errors ,loader}) => {
  const { studentData, libraryrecord } = useContext(UserContext);
  const { data: session } = useSession();
  const stuData = studentData.filter(
    (item) => item?.email === session?.user?.email
  );
  return (
    <>
      <Container>
        <div className="attendance">
          {session?.user?.email === "librarian" ? (
            <>
              <FormInput
                control={control}
                className="mt-4  "
                name="name"
                label="Select Name"
                defaultValue={edit?.name}
                errors={errors}
              />
            </>
          ) : (
            <>
              <FormSelect
                control={control}
                className="mt-4  "
                name="name"
                label="Select Name"
                options={stuData?.map((item) => item?.name)}
                errors={errors}
              />
            </>
          )}
          <FormSelect
            control={control}
            className="mt-4 ml-2 "
            name="book"
            label="Select Book"
            options={libraryrecord?.map((item) => item?.bookname)}
            errors={errors}
          />
          <FormSelect
            control={control}
            className="mt-4 ml-2 "
            name="writer"
            label="Writer Name"
            options={libraryrecord?.map((item) => item?.writer)}
            errors={errors}
          />
        </div>
        <FormSelect
          control={control}
          className="mt-4  "
          name="bookno"
          label="Book No"
          options={libraryrecord?.map((item) => item?.bookno)}
          errors={errors}
        />
        {session?.user?.role === "librarian" ? (
          <>
            <br />
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
        {loader === false ? (
          <>
            <Button
              type="submit"
              className="mt-4 bg-red-600 "
            >
              Send Request
            </Button>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <CircularProgress size={24} />
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default ByStudent;
