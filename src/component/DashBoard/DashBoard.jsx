"use client";
import { Box, Container, Grid, Typography } from "@mui/joy";
import { Paper } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import LayersIcon from "@mui/icons-material/Layers";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BadgeIcon from '@mui/icons-material/Badge';
import StorageIcon from '@mui/icons-material/Storage';
const DashBoard = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#f7f7f7",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#f7f7f7",
    }),
  }));
  return (
    <>
      <Container className="mt-5 text-center text-white  bg-slate-500 rounded-lg border-inherit">
        <div>
          {" "}
          <SchoolIcon className="dashboard-icon" />
        </div>
        <Typography className="text-white text-3xl">
          School DashBoard{" "}
        </Typography>{" "}
      </Container>
      <Box>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="mt-4"
        >
          <Grid item xs={3}>
            <Item>
            <Typography className="text-center">
              <LayersIcon  className="rounded-full border-black border-2 layer-icon"/>
              </Typography>
              <Typography className="rounded-full border-slate-950">12</Typography>
             

              <Typography>Total Classes</Typography>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Typography className="text-center">
                
                <LayersIcon className="rounded-full border-black border-2 layer-icon"/>
              </Typography>
              <Typography>36</Typography>

              <Typography>Total Section</Typography>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Typography className="text-center">
                {" "}
                <CalendarMonthIcon className="rounded-full border-black border-2 layer-icon"/>
              </Typography>
              <Typography>0</Typography>

              <Typography>Exams with Published Timetables</Typography>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Typography className="text-center ">
                <BadgeIcon className="rounded-full border-black border-2 layer-icon"/>
              </Typography>
              <Typography>0</Typography>

              <Typography>Exams with Published Admit Cards</Typography>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Typography className="text-center">
                {" "}
                <StorageIcon className="rounded-full border-black border-2 layer-icon"/>
              </Typography>
              <Typography>0</Typography>

              <Typography>Exams with Published Results</Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DashBoard;
