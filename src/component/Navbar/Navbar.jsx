"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutButton from "../shared/form/LogoutButton";
import { usePathname } from "next/navigation";
import { useState } from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { routesUrl } from "@/utils/pagesurl";

function ResponsiveAppBar(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  const pathName = usePathname();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElStudent, setAnchorElStudent] = useState(null);
  const [anchorElTeacher, setAnchorElTeacher] = useState(null);
  const { data: session } = useSession();

  if (pathName === "/auth/signin") return null;

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleOpenStudentMenu = (event) =>
    setAnchorElStudent(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleCloseStudentMenu = () => setAnchorElStudent(null);
  const handleOpenTeacherMenu = (event) =>
    setAnchorElTeacher(event.currentTarget);
  const handleCloseTeacherMenu = () => setAnchorElTeacher(null);
  const signInOrOutButton = session ? (
    <LogoutButton />
  ) : (
    <Link href={routesUrl.signIn}>
      <Typography className="signin-button" color="white">
        Sign In
      </Typography>
    </Link>
  );

  return (
    <AppBar position="sticky" className="bg- shadow-none">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {session && (
              <>
                <IconButton
                  onClick={handleOpenStudentMenu}
                  sx={{ my: 2, color: "white" }}
                >
                  <Typography>Student</Typography>
                </IconButton>
                <Menu
                  anchorEl={anchorElStudent}
                  open={Boolean(anchorElStudent)}
                  onClose={handleCloseStudentMenu}
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                >
                  <MenuItem onClick={handleCloseStudentMenu}>
                    <Link href={routesUrl.student}>
                      <Typography>Add Student</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseStudentMenu}>
                    <Link href={routesUrl.attendence}>
                      <Typography>Student Attendance</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseStudentMenu}>
                    <Link href={routesUrl.studentleave}>
                      <Typography>Student Leave</Typography>
                    </Link>
                  </MenuItem>
                </Menu>

                <IconButton
                  onClick={handleOpenTeacherMenu}
                  sx={{ my: 2, color: "white" }}
                >
                  <Typography>Teacher</Typography>
                </IconButton>
                <Menu
                  anchorEl={anchorElTeacher}
                  open={Boolean(anchorElTeacher)}
                  onClose={handleCloseTeacherMenu}
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                >
                  <MenuItem onClick={handleCloseTeacherMenu}>
                    <Link href={routesUrl.teacher}>
                      <Typography>Add Teacher</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseTeacherMenu}>
                    <Link href={routesUrl.teacherleave}>
                      <Typography>Leave Request</Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
          <Box>{session?.user?.email}</Box>
          <Box sx={{ flexGrow: 0, marginLeft: 2 }}>
            <Tooltip title={session ? "Sign Out" : "Sign in"}>
              {signInOrOutButton}
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {session && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography>{session.user.email}</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
