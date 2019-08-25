import * as React from "react";
import {useContext} from "react";
import {SocketBufferContext, SocketBufferState} from "./types";

interface StreamLoggerProps {
  logSize: number;
}

function SocketBuffer<T>({logSize}: StreamLoggerProps) {
  const {status, buffer, sendAck, requestRestart} = useContext<SocketBufferState<T>>(SocketBufferContext)

  return (
    <div>
      <div>
        <button type="button" onClick={sendAck}>Ack</button>
        &nbsp;
        Status: {status}
        &nbsp;
        <button type="button" onClick={requestRestart}>Restart</button>
      </div>
      <div>
        {buffer && buffer.slice(-logSize).map((data, i) => (<div key={i}>{JSON.stringify(data)}</div>))}
      </div>
    </div>
  );
}

export default SocketBuffer;
