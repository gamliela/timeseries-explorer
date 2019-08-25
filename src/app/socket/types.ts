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
}

interface SocketBufferState<T> extends SocketState<T> {
  buffer: T[];
}

const SocketBufferContext = React.createContext({
  status: SocketStatus.Init, sendAck: () => {
  }
})

export {SocketStatus, SocketState, SocketBufferState, SocketBufferContext}
