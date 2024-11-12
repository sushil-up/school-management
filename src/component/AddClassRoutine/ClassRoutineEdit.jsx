// "use client"
// import { Box, Modal } from "@mui/joy";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";

// const ClassRoutineEdit = () => {
//     const style = {
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         width: 400,
//         bgcolor: "background.paper",
//         border: "2px solid #000",
//         boxShadow: 24,
//         p: 4,
//       };
//     const [open, setOpen] = useState(false);
//     const handleClose = () => setOpen(false);
//     const {handleSubmit,control}= useForm()
//   return (
//     <>
//       <Modal
//         keepMounted
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="keep-mounted-modal-title"
//         aria-describedby="keep-mounted-modal-description"
//       >
//         <Box sx={style}>
//           <form onSubmit={{handleSubmit}(editSubmit)}>
//             <TimeTable control={control} />
//           </form>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default ClassRoutineEdit;
