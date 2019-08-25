import useSocket, {SocketStatus} from "./useSocket";
import {useState} from "react";
import {SocketBufferState} from "./types";

function useStream<T>(url: string, bufferSize = 200): SocketBufferState<T> {
  const [buffer, setBuffer] = useState<T[]>([]);
  const {status, data, error, sendAck} = useSocket<T>(url);

  function sendBufferAck() {
    if ((status == SocketStatus.WaitingForAck) && (data !== undefined)) {
      setBuffer([...buffer.slice(-bufferSize + 1), data]);
      sendAck();
    }
  }

  return {status, data, buffer, error, sendAck: sendBufferAck}
}

export default useStream;
