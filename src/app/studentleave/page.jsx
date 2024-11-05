"use client";
import StudentLeave from "@/component/StudentLeave/StudentLeave";
import LeaveTable from "@/component/StudentLeave/StudentLeaveTable";
import { Button, Container } from "@mui/joy";
import React, { useState } from "react";

const page = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(open === false);
  };
  return (
    <>
      <Container>
        <div className="grid justify-items-end">
          <Button
            onClick={handleToggle}
            className="btn mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            {open ? "View Leave Request" : "Add Leave Request"}
          </Button>
        </div>
        {open ? <StudentLeave /> : <LeaveTable />}
      </Container>
    </>
  );
};

export default page;
