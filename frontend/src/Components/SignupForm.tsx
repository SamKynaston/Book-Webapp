import { useAuth } from "../Helpers/Authentication";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const { signup } = useAuth() as any;
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await signup(email, username, password); 
            console.log("navigating");
            navigate("/account");
        } catch (err) {
            alert("Login failed.");
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setUsername(e.target.value)} placeholder="Username"></input>
            <br />
            <input onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
            <br />
            <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password"></input>
            <br />
            <button type="submit">Signup</button>
        </form>
    );
};