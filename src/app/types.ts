type ServerHeaderFrame = string[];
type ServerDataFrame = { Time: string; Data: number[] }
type ServerFrame = ServerHeaderFrame | ServerDataFrame;

export {ServerFrame}
