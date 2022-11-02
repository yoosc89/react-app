import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const colsname = [
  { field: "id", headerName: "순서", width: 90 },
  { field: "title", headerName: "제목", width: 600, editable: true },
  { field: "writer", headerName: "작성자", width: 200, editable: true },
  { field: "date", headerName: "날짜", width: 200, editable: true },
];

function Data(load) {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/allselect")
      .then((res) => {
        setdata(res.data);
      })
      .catch();
  }, [load]);

  return data;
}

function TableLoad() {
  const reload = useSelector((state) => state.reload);
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={Data(reload)}
        columns={colsname}
        pageSize={10}
        rowsPerPageOption={[5]}
        checkboxSelection
        disableSeletionOnClick
        ExperimentalFeatures={{ newEditingApi: true }}
      ></DataGrid>
    </Box>
  );
}

export default function TableGrid() {
  return (
    <React.Fragment>
      <TableLoad />
    </React.Fragment>
  );
}
