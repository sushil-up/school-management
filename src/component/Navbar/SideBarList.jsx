"use client";
import { List, ListItem, ListItemButton } from "@mui/joy";
import { Collapse, ListItemIcon, ListItemText } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import {useTheme } from "@mui/material/styles";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { SideBarAdmin, SideBarStudent } from "./SideBarpage";
const SideBarList = ({
  selectedIndex,
  toggleCollapse,
  selectedSubIndex,
  openItems,
  open,
  handleItemClick,
}) => {
  const { data: session } = useSession();
  const theme = useTheme();
  return (
    <>
      <List>
        {session?.user?.role === "student" ? (
          <>
            {SideBarStudent?.map((item, index) => (
              <div key={index}>
                <ListItem disablepadding onClick={() => toggleCollapse(index)}>
                  <ListItemButton
                    selected={
                      selectedIndex === index && selectedSubIndex === null
                    }
                    onClick={() => handleItemClick(index)}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      backgroundColor:
                        selectedIndex === index && selectedSubIndex === null
                          ? theme.palette.action.selected
                          : "transparent",
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color:
                          (selectedIndex === index &&
                            selectedSubIndex !== null) ||
                          (selectedIndex === index && selectedSubIndex === null)
                            ? theme.palette.primary.main
                            : "inherit",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                    {item.subItems &&
                      open &&
                      (openItems.includes(index) ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      ))}
                  </ListItemButton>
                </ListItem>
                {item.subItems && (
                  <Collapse
                    in={openItems.includes(index)}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablepadding>
                      {item.subItems.map((subItem, subIndex) => (
                        <Link href={subItem.route} key={subIndex}>
                          <ListItemButton
                            selected={
                              selectedIndex === index &&
                              selectedSubIndex === subIndex
                            }
                            onClick={() => handleItemClick(index, subIndex)}
                            sx={{
                              pl: open ? 6 : 4,
                              backgroundColor:
                                selectedIndex === index &&
                                selectedSubIndex === subIndex
                                  ? theme.palette.action.selected
                                  : "transparent",
                              "&:hover": {
                                backgroundColor: theme.palette.action.hover,
                              },
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                                color:
                                  selectedIndex === index &&
                                  selectedSubIndex === subIndex
                                    ? theme.palette.primary.main
                                    : "inherit",
                              }}
                            >
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText
                              sx={{ marginLeft: 1 }}
                              primary={subItem.title}
                            />
                          </ListItemButton>
                        </Link>
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
            ))}
          </>
        ) : (
          <>
            {SideBarAdmin?.map((item, index) => (
              <div key={index}>
                <ListItem disablepadding onClick={() => toggleCollapse(index)}>
                  <ListItemButton
                    selected={
                      selectedIndex === index && selectedSubIndex === null
                    }
                    onClick={() => handleItemClick(index)}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      backgroundColor:
                        selectedIndex === index && selectedSubIndex === null
                          ? theme.palette.action.selected
                          : "transparent",
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color:
                          (selectedIndex === index &&
                            selectedSubIndex !== null) ||
                          (selectedIndex === index && selectedSubIndex === null)
                            ? theme.palette.primary.main
                            : "inherit",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                    {item.subItems &&
                      open &&
                      (openItems.includes(index) ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      ))}
                  </ListItemButton>
                </ListItem>
                {item.subItems && (
                  <Collapse
                    in={openItems.includes(index)}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablepadding>
                      {item.subItems.map((subItem, subIndex) => (
                        <Link href={subItem.route} key={subIndex}>
                          <ListItemButton
                            selected={
                              selectedIndex === index &&
                              selectedSubIndex === subIndex
                            }
                            onClick={() => handleItemClick(index, subIndex)}
                            sx={{
                              pl: open ? 6 : 4,
                              backgroundColor:
                                selectedIndex === index &&
                                selectedSubIndex === subIndex
                                  ? theme.palette.action.selected
                                  : "transparent",
                              "&:hover": {
                                backgroundColor: theme.palette.action.hover,
                              },
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                                color:
                                  selectedIndex === index &&
                                  selectedSubIndex === subIndex
                                    ? theme.palette.primary.main
                                    : "inherit",
                              }}
                            >
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText
                              sx={{ marginLeft: 1 }}
                              primary={subItem.title}
                            />
                          </ListItemButton>
                        </Link>
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
            ))}
          </>
        )}
      </List>
    </>
  );
};

export default SideBarList;
