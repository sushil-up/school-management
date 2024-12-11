"use client"
import ByStudent from '@/component/BookRequest/ByStudent/ByStudent'
import { successMsg } from '@/component/Toastmsg/toaster'
import UserContext from '@/context/UserContext'
import { ResetTv } from '@mui/icons-material'
import { Container } from '@mui/joy'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from "uuid";
const BookStudent = () => {
  const { handleSubmit, control ,reset} = useForm();
  const {bystudent, setByStudent}=useContext(UserContext)
  const id = uuidv4()
  const onSubmit = (data) => {
    const setId = { ...data, id }
    const storedData= [...bystudent,setId]
    setByStudent(storedData)
    reset()
    successMsg("Book Request Send Successfully")
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