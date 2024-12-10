"use client"
import FormSelect from '@/component/shared/form/FormSelect'
import UserContext from '@/context/UserContext'
import { Button } from '@mui/joy'
import { Container } from '@mui/material'
import { useSession } from 'next-auth/react'
import React, { useContext } from 'react'

const ByStudent = ({control}) => {
  const { studentData, libraryrecord } = useContext(UserContext);
  const {data:session}=useSession()
  const stuData = studentData.filter(
    (item) => item?.email === session?.user?.email
  );
  return (
    <>
    <Container>
      <div className="attendance">
        <FormSelect
          control={control}
          className="mt-4  "
          name="name"
          label="Select Name"
          options={stuData?.map((item) => item.name)}
        />
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
      />
      <Button type="submit" className="mt-4 bg-red-600 ">
        Send Request
      </Button>
    </Container>
  </>
  )
}

export default ByStudent