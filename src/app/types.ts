type ServerHeaderFrame = string[];
type ServerTickFrame = { Time: string; Error?: string; Values: number[] }

export {ServerHeaderFrame, ServerTickFrame}
