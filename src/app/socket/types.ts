import * as React from "react";

enum SocketStatus {
  Init = "Init",
  Connecting = "Connecting",
  WaitingForData = "Waiting for Data",
  WaitingForAck = "Waiting for Ack",
  Closed = "Closed",
  Error = "Error"
}

interface SocketState<T> {
  status: SocketStatus;
  data?: T;
  error?: Event;
  sendAck: () => void;
  requestRestart: () => void;
}

interface BufferState<T> {
  header?: T;
  buffer?: T[];
}

type SocketBufferState<T> = SocketState<T> & BufferState<T>

function unexpectedAction() {
  console.error(`No context is provided. Unexpected action was called.`)
}

const SocketBufferContext = React.createContext({
  status: SocketStatus.Init,
  sendAck: unexpectedAction,
  requestRestart: unexpectedAction
})

export {SocketStatus, SocketState, BufferState, SocketBufferState, SocketBufferContext}
