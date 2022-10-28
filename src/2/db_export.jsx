import React from "react";

useEffect(() => {
  axios.get("/api/test").then((res) => console.log(res));
});
