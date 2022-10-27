import { ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import * as React from "react";

function List(id, list_name) {
  return { id, list_name };
}

const Menu = [
  List(1, "list1"),
  List(2, "list2"),
  List(3, "list3"),
  List(4, "list4"),
  List(5, "list5"),
  List(6, "list6"),
  List(7, "list7"),
];

export default function MList() {
  return (
    <React.Fragment>
      {Menu.map((item) => (
        <ListItemButton href={item.id}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={item.list_name} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
}
