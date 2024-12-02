"use client";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "@/context/UserContext";
import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/joy";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import FormSelect from "../shared/form/FormSelect";
import { useSession } from "next-auth/react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteModal from "../Modal/DeleteModal";
import dayjs from "dayjs";
import { successMsg } from "../Toastmsg/toaster";

const AllBook = ({ handleClose,handleEdit }) => {
  const { libraryrecord,setLibraryRecord } = useContext(UserContext);
  const { handleSubmit, control } = useForm();
  const [deleteOpenModal,setDeleteOpenModal]= useState(false)
  const [deleteid,setDeleteId]=useState()
  const [formData, setFormData] = useState();
  const [tableData, setTableData] = useState();
  const {data:session}= useSession()
  const onSubmit = (data) => {
    setFormData(data);
  };
  useEffect(() => {
    if (formData) {
      const findBook = libraryrecord.filter(
        (item) =>
          item.bookname === formData.bookname &&
          item.subject === formData.subject
      );
    
      setTableData(findBook);
    }
    else{
      setTableData(libraryrecord);
    }
  }, [formData, libraryrecord]);
  const handleDelete=(item)=>{
    setDeleteId(item.id)
    setDeleteOpenModal(true)
  }
  const onDelete=()=>{
    const updatedData= libraryrecord.filter((item)=>item.id!==deleteid)
    setLibraryRecord(updatedData)
    setDeleteOpenModal(false)
    successMsg("Book record deleted successfully")
  }
  const deleteHandleModalClose=()=>{
    setDeleteOpenModal(false)
  }
  return (
    <>
      <div>AllBook</div>
      <Button onClick={handleClose}>Add Book</Button>
      <br />
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="attendance">
            <FormSelect
              control={control}
              className="mt-4 "
              name="bookname"
              label="Book Name"
              options={libraryrecord?.map((item)=>item?.bookname)}
            />
            <FormSelect
              control={control}
              className="mt-4 ml-2"
              name="subject"
              label="Subject"
              options={libraryrecord?.map((item)=>item?.subject)}
            />

            <Button
              type="submit"
              className="ml-2 h-fit mt-5 border-4 bg-teal-400 rounded border-black "
            >
              Search
            </Button>
          </div>
        </form>
      </Box>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell className="font-bold text-base">Book No</TableCell>
              <TableCell className="font-bold text-base">Book Name</TableCell>
              <TableCell className="font-bold text-base">Writer </TableCell>
              <TableCell className="font-bold text-base">Title </TableCell>
              <TableCell className="font-bold text-base">Publish Date</TableCell>
              <TableCell className="font-bold text-base">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((item) => ( 
              <TableRow key={item?.id}>
                <TableCell>{item?.bookno}</TableCell>
                <TableCell >{item?.bookname}</TableCell>
                <TableCell >{item?.writer}</TableCell>
                <TableCell >{item?.title}</TableCell>
                <TableCell >  {dayjs(item?.publishdate).format("YYYY-MM-DD")}</TableCell>

                {session?.user?.role === "student" ? (
                      <TableCell>
                        <Tooltip
                          arrow
                          placement="top-start"
                          title="You are not authorized to delete"
                        >
                          <DeleteIcon className="text-red-500" />
                        </Tooltip>
                        <Tooltip
                          arrow
                          placement="top-start"
                          title="You are not authorized to edit"
                        >
                          <EditIcon className="text-green-500" />
                        </Tooltip>
                      </TableCell>
                    ) : (
                      <TableCell>
                        <DeleteIcon
                          className="text-red-500"
                          onClick={() => handleDelete(item)}
                        />
                        <EditIcon
                          className="text-green-500"
                          onClick={() => handleEdit(item)}
                        />
                      </TableCell>
                    )}
              </TableRow>
           ) )}
          </TableBody>
        </Table>
      </Box>
      <DeleteModal
        onDelete={onDelete}
        deleteOpenModal={deleteOpenModal}
        deleteMessage="Are you sure with this deletion"
        deleteHandleModalClose={deleteHandleModalClose}
      />
    </>
  );
};

export default AllBook;
