import * as React from "react";
import useSocketBuffer from "./useSocketBuffer";

interface StreamLoggerProps {
  url: string;
  bufferSize: number;
}

function SocketBuffer({url, bufferSize}: StreamLoggerProps) {
  const {status, buffer, sendAck} = useSocketBuffer(url, bufferSize);

  return (
    <div>
      <div>
        <button type="button" onClick={sendAck}>Ack</button>
        Status: {status}
      </div>
      <div>
        {buffer.map((data, i) => (<div key={i}>{JSON.stringify(data)}</div>))}
      </div>
    </div>
  );
}

export default SocketBuffer;
