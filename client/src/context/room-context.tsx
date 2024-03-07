import React, { createContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import Peer from 'peerjs';
import { v4 as uuidV4 } from 'uuid';
import { peersReducer } from './peer-reducer';
import { addPeerAction } from './peer-actions';
const WS = "http://localhost:8080";

export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);
export const RoomProvider: React.FunctionComponent = ({
    children
}) => {
    const navigate = useNavigate();
    const [me, setMe] = useState<Peer>();
    const [stream, setStream] = useState<MediaStream>();
    const [peers, dispatch] = useReducer(peersReducer, {});

    const enterRoom = ({ roomId }: { roomId: string }) => {
        console.log('roomId: ', roomId)
        navigate(`/room/${roomId}`);
    }

    const getUsers = ({ participants }: { participants: string[] }) => {
        console.log('users list: ', participants);
    }

    useEffect(() => {
        const meId = uuidV4();
        const peer = new Peer(meId);
        setMe(peer);

        try {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    setStream(stream);
                })

        } catch (err) {
            console.log('error: ', err)
        }

        ws.on('room-created', enterRoom);
        ws.on('get-users', getUsers);
    }, [])

    useEffect(() => {
        debugger
        if (!me) return;
        if (!stream) return;

        ws.on('user-joined', ({ peerId }) => {
            const call = me.call(peerId, stream);

            call.on('stream', (peerStream) => {
                console.log('userjoin method is called')
                dispatch(addPeerAction(peerId, peerStream))
            })
        })

        me.on("call", (call) => {
            call.answer(stream);
            call.on('stream', (peerStream) => {
                console.log('call method is called')
                dispatch(addPeerAction(call.peer, peerStream));
            })
        })
    }, [me, stream])

    console.log({peers,dispatch})

    return (
        <RoomContext.Provider value={{ ws, me, stream }}>{children}</RoomContext.Provider>
    )
}