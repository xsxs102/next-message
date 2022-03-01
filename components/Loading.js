import React from "react";
import Image from "next/image";

import LoadingLogoPic from '../public/logo.png';

function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src={LoadingLogoPic} alt="Picture of LoadingLogo" width={100} height={100} />
        Loading...
      </div>
    </center>
  );
}

export default Loading;
