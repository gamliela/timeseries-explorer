import useSocket, {SocketStatus} from "./useSocket";
import {useState} from "react";
import {SocketBufferState} from "./types";

function useSocketBuffer<T>(url: string, bufferSize = 200): SocketBufferState<T> {
  const [prevData, setPrevData] = useState<T[]>([]);
  const {status, data, error, sendAck} = useSocket<T>(url);

  function sendBufferAck() {
    if ((status == SocketStatus.WaitingForAck) && (data !== undefined)) {
      setPrevData([...prevData.slice(-bufferSize + 1), data]);
      sendAck();
    }
  }

  return {status, data, buffer: data ? [...prevData, data] : prevData, error, sendAck: sendBufferAck}
}

export default useSocketBuffer;
