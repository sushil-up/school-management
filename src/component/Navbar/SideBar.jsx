"use client";
import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutButton from "../shared/form/LogoutButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { routesUrl } from "@/utils/pagesurl";
import { Tooltip } from "@mui/joy";
import { ToastContainer } from "react-toastify";
import ResponsiveAppBar from "./Navbar";
import SideBarList from "./SideBarList";
const drawerWidth = 273;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ children }) {
  const { data: session } = useSession();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedSubIndex, setSelectedSubIndex] = useState(null);
  const [openItems, setOpenItems] = useState([]);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleItemClick = (index, subIndex) => {
    setSelectedIndex(index);
    setSelectedSubIndex(subIndex !== undefined ? subIndex : null);

    // Save to localStorage
    localStorage.setItem("selectedIndex", index);
    localStorage.setItem(
      "selectedSubIndex",
      subIndex !== undefined ? subIndex : null
    );
  };

  // get data form localstorage
  useEffect(() => {
    const storedSelectedIndex = localStorage.getItem("selectedIndex");
    const storedSelectedSubIndex = localStorage.getItem("selectedSubIndex");

    if (storedSelectedIndex !== null) {
      setSelectedIndex(parseInt(storedSelectedIndex, 10));
    }
    if (storedSelectedSubIndex !== null) {
      setSelectedSubIndex(parseInt(storedSelectedSubIndex, 10));
    }
  }, []);

  const toggleCollapse = (index) => {
    setOpenItems((prev) => {
      const updatedItems = prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index];
      // Save updated state to localStorage
      localStorage.setItem("openItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  //
  useEffect(() => {
    const storedOpenItems = localStorage.getItem("openItems");
    if (storedOpenItems) {
      setOpenItems(JSON.parse(storedOpenItems));
    }
  }, []);
  const signInOrOutButton = session ? (
    <LogoutButton />
  ) : (
    <Link href={routesUrl.signIn}>
      <Typography color="white">Sign In</Typography>
    </Link>
  );
  return (
    <>
      {session === null || undefined ? (
        <>
          <ResponsiveAppBar />
          {children}
        </>
      ) : (
        <>
          {" "}
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} className="bg-gray-700">
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  edge="start"
                  sx={{ marginRight: 5, ...(open && { display: "none" }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  School Management
                </Typography>
                <Box sx={{ flexGrow: 1 }} />{" "}
                <Typography className="mr-3">{session?.user?.email}</Typography>
                <Tooltip title={session ? "Sign Out" : "Sign In"}>
                  {signInOrOutButton}
                </Tooltip>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <DrawerHeader />
              <Divider />
              <SideBarList
                selectedIndex={selectedIndex}
                toggleCollapse={toggleCollapse}
                selectedSubIndex={selectedSubIndex}
                openItems={openItems}
                handleItemClick={handleItemClick}
              />
              <Divider />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
              <ToastContainer />
              {children}
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

// "use client";
// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import SquareIcon from "@mui/icons-material/Square";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { routesUrl } from "@/utils/pagesurl";
// import { Tooltip } from "@mui/joy";
// import LogoutButton from "../shared/form/LogoutButton";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { ListItemIcon } from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import ResponsiveAppBar from "./Navbar";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// const DrawerListItemButton = ({ href, label, open, icon }) => (
//   <ListItem disablePadding sx={{ display: "block" }}>
//     <Link href={href}>
//       <ListItemButton
//         sx={[
//           {
//             minHeight: 48,
//             px: 2.5,
//           },
//           open
//             ? {
//                 justifyContent: "initial",
//               }
//             : {
//                 justifyContent: "center",
//               },
//         ]}
//       >
//         <ListItemIcon
//           sx={[
//             {
//               minWidth: 0,
//               justifyContent: "center",
//             },
//             open
//               ? {
//                   mr: 3,
//                 }
//               : {
//                   mr: "auto",
//                 },
//           ]}
//         >
//           {icon}
//         </ListItemIcon>
//         <Typography
//           sx={[
//             open
//               ? {
//                   opacity: 1,
//                 }
//               : {
//                   opacity: 0,
//                 },
//           ]}
//         >
//           {label}
//         </Typography>
//       </ListItemButton>
//     </Link>
//   </ListItem>
// );

// export default function MiniDrawer({ children }) {
//   const { data: session, status } = useSession();
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(true);

//   const toggleDrawer = () => setOpen((prevOpen) => !prevOpen);

//   const signInOrOutButton = session ? (
//     <LogoutButton />
//   ) : (
//     <Link href={routesUrl.signIn}>
//       <Typography color="white">Sign In</Typography>
//     </Link>
//   );

//   return (
//     <>
//       {session === null || undefined ? (
//         <>
//         <ResponsiveAppBar/>
//         {children}</>
//       ) : (
//         <Box sx={{ display: "flex" }}>
//           <CssBaseline />
//           <AppBar position="fixed" open={open} className="bg-gray-700">
//             <Toolbar>
//               <IconButton
//                 color="inherit"
//                 aria-label="open drawer"
//                 onClick={toggleDrawer}
//                 edge="start"
//                 sx={{ marginRight: 5, ...(open && { display: "none" }) }}
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Typography variant="h6" noWrap component="div">
//                 School Management
//               </Typography>
//               <Box sx={{ flexGrow: 1 }} />
//               <Typography className="mr-3">{session?.user?.email}</Typography>
//               <Tooltip title={session ? "Sign Out" : "Sign In"}>
//                 {signInOrOutButton}
//               </Tooltip>
//             </Toolbar>
//           </AppBar>
//           <Drawer variant="permanent" open={open} className="bg-gray-700">
//             <DrawerHeader>
//               <IconButton onClick={toggleDrawer}>
//                 {theme.direction === "rtl" ? (
//                   <ChevronRightIcon />
//                 ) : (
//                   <ChevronLeftIcon />
//                 )}
//               </IconButton>
//             </DrawerHeader>
//             <Divider />
//             {/* <Typography className="ml-1">Student </Typography> */}
//             <List>
//               <DrawerListItemButton
//                 href={routesUrl.student}
//                 label="Add Student"
//                 open={open}
//               />
//               <DrawerListItemButton
//                 href={routesUrl.attendence}
//                 label="Student Attendance"
//                 open={open}
//               />
//               <DrawerListItemButton
//                 href={routesUrl.viewAttendence}
//                 label="View Attendence"
//                 open={open}
//                 // icon={<SquareIcon />}
//               />
//               <DrawerListItemButton
//                 href={routesUrl.studentleave}
//                 label="Student Leave"
//                 open={open}
//               />

//             </List>
//             <Divider />
//             <List>
//               <DrawerListItemButton
//                 href={routesUrl.teacher}
//                 label="Add Teacher"
//                 open={open}
//               />
//               <DrawerListItemButton
//                 href={routesUrl.teacherleave}
//                 label="Teacher Leave"
//                 open={open}
//               />
//             </List>
//             <Divider />
//             <List>
//               <DrawerListItemButton
//                 href={routesUrl.timetable}
//                 label="Class Timetable"
//                 open={open}
//               />
//               <DrawerListItemButton
//                 href={routesUrl.viewtimetable}
//                 label="View Timetable"
//                 open={open}
//               />
//             </List>
//             <Divider />
//             <List>
//             <DrawerListItemButton
//                 href={routesUrl.exam}
//                 label="Exam Schedule"
//                 open={open}
//               />
//                  <DrawerListItemButton
//                 href={routesUrl.examTable}
//                 label="Exam Schedule Table"
//                 open={open}
//               />
//             </List>

//             <Divider />
//           </Drawer>
//           <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//             <DrawerHeader />
//             <ToastContainer/>
//             {children}
//           </Box>
//         </Box>
//       )}
//     </>
//   );
// }
