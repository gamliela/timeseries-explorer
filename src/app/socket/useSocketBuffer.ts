import useSocket from "./useSocket";
import {useCallback, useState} from "react";
import {BufferState, SocketBufferState} from "./types";

function useSocketBuffer<T>(url: string, bufferSize = 200): SocketBufferState<T> {
  const [bufferState, setBufferState] = useState<BufferState<T>>({buffer: []});

  const onOpen = useCallback(function onOpen() {
    setBufferState({buffer: []});
  }, []);

  const onMessage = useCallback(function onMessage(data) {
    setBufferState(bufferState => {
      if (bufferState.header) {
        return {header: bufferState.header, buffer: [...(bufferState.buffer || []).slice(-bufferSize + 1), data]};
      } else {
        return {header: data as T, buffer: []};
      }
    });
  }, [bufferSize]);

  const socketState = useSocket<T>(url, onOpen, onMessage);

  return {...socketState, ...bufferState}
}

export default useSocketBuffer;
