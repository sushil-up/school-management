"use client"
import ByStudent from '@/component/BookRequest/ByStudent/ByStudent'
import UserContext from '@/context/UserContext'
import { Container } from '@mui/joy'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from "uuid";
const BookStudent = () => {
  const { handleSubmit, control } = useForm();
  const {bystudent, setByStudent}=useContext(UserContext)
  const id = uuidv4()
  const onSubmit = (data) => {
    const setId = { ...data, id }
    const storedData= [...bystudent,setId]
    setByStudent(storedData)
  };
  return (<>
    <Container>
     <form onSubmit={handleSubmit(onSubmit)}>
      <ByStudent control={control}/>
      </form>
    </Container>
  </>
  )
}

export default BookStudent