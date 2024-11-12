"use client"
// import ClassRoutineEdit from '@/component/AddClassRoutine/ClassRoutineEdit'
import ClassRoutineTable from '@/component/AddClassRoutine/ClassRoutineTable'
import { Container } from '@mui/joy'
import React from 'react'

const CheckTimeTable = () => {
  return (
  <Container>
     <ClassRoutineTable/>
     {/* <ClassRoutineEdit/> */}
  </Container>
  )
}

export default CheckTimeTable