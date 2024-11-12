"use client"
import TimeTable from '@/component/AddClassRoutine/ClassRoutine'
import { successMsg } from '@/component/Toastmsg/toaster'
import UserContext from '@/context/UserContext'
import { routesUrl } from '@/utils/pagesurl'
import { Container } from '@mui/joy'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

const Routine = () => {
const {handleSubmit,control,reset}=useForm()
const {timeTable, setTimeTable}= useContext(UserContext)
const router=useRouter()
const onSubmit=(data)=>{
  const storedData= [data,...timeTable]
  setTimeTable(storedData)
  reset()
router.replace(routesUrl.viewtimetable)
  successMsg("Class timing added successfully")
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