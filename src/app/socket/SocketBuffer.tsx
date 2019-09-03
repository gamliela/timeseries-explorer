import * as React from "react";
import {useContext} from "react";
import style from "./style.scss";
import {SocketBufferContext} from "../context";

interface StreamLoggerProps {
  logSize: number;
}

function SocketBuffer({logSize}: StreamLoggerProps) {
  const {status, header, buffer, sendAck, requestRestart} = useContext(SocketBufferContext)

  return (
    <div className={style.SocketBuffer}>
      <div>
        <button type="button" onClick={sendAck}>Ack</button>
        &nbsp;
        Status: {status}
        &nbsp;
        <button type="button" onClick={requestRestart}>Restart</button>
      </div>
      <div>
        <div className={style.header}>{JSON.stringify(header)}</div>
        {buffer.slice(-logSize).map((data, i) => (<div key={i}>{JSON.stringify(data)}</div>))}
      </div>
    </div>
  );
}

export default SocketBuffer;
