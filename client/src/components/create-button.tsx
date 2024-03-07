import { FC, useContext } from "react";
import { RoomContext } from "../context/room-context";

export const JoinButton: FC = () => {
    const { ws } = useContext(RoomContext);
    const createRoomHandler = () => {
        ws.emit("create-room");
    }

    return (
        <button onClick={createRoomHandler} className=''>Start Meeting</button>
    )
}