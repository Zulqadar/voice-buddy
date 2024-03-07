import { FC, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/room-context";
import { VideoPlayer } from "../components/video-player";

export const Room: FC = () => {
    const { id } = useParams();
    const { ws, me, stream } = useContext(RoomContext);

    useEffect(() => {
        if (me) {
            ws.emit('join-room', { roomId: id, peerId: me._id });
        }
    }, [id, me, ws])
    return (
        <>
            Room Id {id}
            <div>
                <VideoPlayer stream={stream} />
            </div>
        </>
    )
}