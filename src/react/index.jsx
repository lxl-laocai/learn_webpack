import React, { useEffect, useState } from "react";
import axios from "axios";
export default function () {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  useEffect(() => {
    axios.get("https://api.vvhan.com/api/ian").then((res) => {
      setTitle(res.data);
    });
  }, [count]);

  return (
    <>
      <h2 onClick={(e) => setCount(count + 1)}>Hello React {count}</h2>
      <h3>{title}</h3>
    </>
  );
}
