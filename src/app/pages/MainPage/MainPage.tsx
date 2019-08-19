import * as React from "react";
import style from "./style.scss";
import "../../stream/stream.ts";

function MainPage() {
  return (
    <div>
      <h1 className={style.header}>
        Hello World!
      </h1>
    </div>
  );
}

export default MainPage;