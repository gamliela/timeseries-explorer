import * as React from "react";
import {useContext} from "react";
import {SocketBufferContext, SocketBufferState} from "./types";
import style from "./style.scss";

interface StreamLoggerProps {
  logSize: number;
}

function SocketBuffer<T>({logSize}: StreamLoggerProps) {
  const {status, header, buffer, sendAck, requestRestart} = useContext<SocketBufferState<T>>(SocketBufferContext)

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
        {buffer && buffer.slice(-logSize).map((data, i) => (<div key={i}>{JSON.stringify(data)}</div>))}
      </div>
    </div>
  );
}

export default SocketBuffer;
