import { ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import * as React from "react";

const Menu = {
  1: "list1",
  2: "list2",
  3: "list3",
  4: "list4",
  5: "list5",
  6: "list6",
  7: "list7",
};

function listArry(arry1) {
  let arr = [];
  for (let key in arry1) {
    arr.push(
      <ListItemButton href={key}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={arry1[key]} />
      </ListItemButton>
    );
  }
  return arr;
}

export function MList() {
  return <React.Fragment>{listArry(Menu)}</React.Fragment>;
}
