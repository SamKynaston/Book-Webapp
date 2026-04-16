import { AuthenticateUser } from "../Helpers/Authentication";
import { useState } from "react";

export const AuthenticationForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(true)
        await AuthenticateUser(username, password)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input className="loginInput" onChange= {(e) => setUsername(e.target.value)}></input>
            <input className="loginInput" onChange= {(e) => setPassword(e.target.value)}></input>
            <button type="submit">Login</button>
        </form>
    );
};