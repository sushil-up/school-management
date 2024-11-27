"use client"
import TimeTable from '@/component/AddClassRoutine/ClassRoutine'
import { successMsg } from '@/component/Toastmsg/toaster'
import { TimeTableValidation } from '@/component/Validation/TimeTableValidation'
import UserContext from '@/context/UserContext'
import { routesUrl } from '@/utils/pagesurl'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/joy'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';

const Routine = () => {
const {handleSubmit,control,reset ,formState:{errors}}=useForm({resolver:yupResolver(TimeTableValidation)})
const {timeTable, setTimeTable}= useContext(UserContext)
const router=useRouter()
const {data:session}=useSession()
if(session?.user?.role==="student"||session?.user?.role==="teacher"){
  router.replace(routesUrl.viewclassroutine)
}
const id =uuidv4()
const onSubmit=(data)=>{
  const setid={...data,id}
  const storedData= [setid,...timeTable]
  setTimeTable(storedData)
  reset()
router.replace(routesUrl.viewclassroutine)
  successMsg("Class timing added successfully")
}
  return (
   <>
   <Container>
   <form onSubmit={handleSubmit(onSubmit)}>
   <TimeTable control={control} errors={errors}/>
   </form>
   </Container>
   </>
  )
}

export default Routine