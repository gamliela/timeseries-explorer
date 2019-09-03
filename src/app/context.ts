import * as React from "react";
import {SocketBufferState, SocketStatus} from "./socket/types";
import {ServerFrame} from "./types";

function unexpectedAction() {
  console.error(`No context is provided. Unexpected action was called.`)
}

const SocketBufferContext = React.createContext<SocketBufferState<ServerFrame>>({
  status: SocketStatus.Init,
  sendAck: unexpectedAction,
  requestRestart: unexpectedAction,
  buffer: [],
})

export {SocketBufferContext}
