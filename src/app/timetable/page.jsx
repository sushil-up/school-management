"use client"
import TimeTable from '@/component/AddClassRoutine/ClassRoutine'
import UserContext from '@/context/UserContext'
import { Container } from '@mui/joy'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

const Routine = () => {
const {handleSubmit,control,reset}=useForm()
const {timeTable, setTimeTable}= useContext(UserContext)

const onSubmit=(data)=>{
  const storedData= [data,...timeTable]
  setTimeTable(storedData)
  reset()
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