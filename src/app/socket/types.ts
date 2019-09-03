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
  buffer: T[];
}

type SocketBufferState<T> = SocketState<T> & BufferState<T>

export {SocketStatus, SocketState, BufferState, SocketBufferState}
