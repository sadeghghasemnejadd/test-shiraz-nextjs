"use client";
import { useEffect, useState } from "react";

const Stream = ({ ticket }) => {
  const [streamData, setStreamData] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await fetch("http://shserver.top:8080/test/users/getCode", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ticket}`,
      },
      body: JSON.stringify({
        message: "Write me a chrome extension code",
      }),
    });

    const data = await res.text();
    const sanitizedData = data.replace(/`/g, "");
    const dataArray = sanitizedData.trim().split("\n\n");
    dataArray.forEach((d) => {
      const str = JSON.parse(d.split("data:")[1]).content.trim();
      if (str) {
        setStreamData((prev) => prev + " " + str);
      }
    });
  };

  return (
    <div>
      <code>{streamData}</code>
    </div>
  );
};

export default Stream;
