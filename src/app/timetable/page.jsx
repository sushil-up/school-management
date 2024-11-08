"use client"
import TimeTable from '@/component/AddClassRoutine/ClassRoutine'
import { Container } from '@mui/joy'
import React from 'react'
import { useForm } from 'react-hook-form'

const Routine = () => {
const {handleSubmit,control}=useForm()
const onSubmit=(data)=>{
  console.log("timetable",data)
}
  return (
   <>
   <Container>
   <form onSubmit={handleSubmit(onSubmit)}>
   <TimeTable control={control}/>
   </form>
   </Container>
   </>
  )
}

export default Routine