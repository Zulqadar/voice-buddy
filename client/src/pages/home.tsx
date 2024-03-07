import { FC } from "react";
import { JoinButton } from "../components/create-button";

export const Home: FC = () => {
    return (
        <div className='App flex items-center justify-center w-screen h-screen'>
            <JoinButton />
        </div>
    );
}