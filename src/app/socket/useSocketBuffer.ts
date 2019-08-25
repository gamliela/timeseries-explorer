import useSocket from "./useSocket";
import {useCallback, useState} from "react";
import {SocketBufferState} from "./types";

function useSocketBuffer<T>(url: string, bufferSize = 200): SocketBufferState<T> {
  const [buffer, setBuffer] = useState<T[]>([]);

  const onMessage = useCallback(function onMessage(data) {
    setBuffer(buffer => [...buffer.slice(-bufferSize + 1), data]);
  }, [bufferSize]);

  const socketState = useSocket<T>(url, onMessage);

  return {...socketState, buffer}
}

export default useSocketBuffer;
