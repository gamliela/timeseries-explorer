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
  frame?: T;
  error?: Event;
  sendAck: () => void;
  requestRestart: () => void;
}

interface BufferState<T, U> {
  header?: T;
  buffer: U[];
}

type SocketBufferState<T, U> = SocketState<T | U> & BufferState<T, U>

export {SocketStatus, SocketState, BufferState, SocketBufferState}
