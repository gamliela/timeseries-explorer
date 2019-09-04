import useSocket from "./useSocket";
import {useCallback, useState} from "react";
import {BufferState, SocketBufferState} from "./types";

function useSocketBuffer<T, U>(url: string, bufferSize = 200): SocketBufferState<T, U> {
  const [bufferState, setBufferState] = useState<BufferState<T, U>>({buffer: []});

  const onOpen = useCallback(function onOpen() {
    setBufferState({buffer: []});
  }, []);

  const onMessage = useCallback(function onMessage(frame) {
    setBufferState(bufferState => {
      if (bufferState.header) {
        return {header: bufferState.header, buffer: [...bufferState.buffer.slice(-bufferSize + 1), frame as U]};
      } else {
        return {header: frame as T, buffer: []};
      }
    });
  }, [bufferSize]);

  const socketState = useSocket<T>(url, onOpen, onMessage);

  const requestRestart = useCallback(function requestRestart() {
    setBufferState({buffer: []});
    socketState.requestRestart();
  }, [socketState])

  return {...socketState, ...bufferState, requestRestart}
}

export default useSocketBuffer;
