import { useAuth } from "../Helpers/Authentication";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthenticationForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth() as any;
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await login(email, password); 
            console.log("navigating");
            navigate("/account");
        } catch (err) {
            alert("Login failed.");
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" required={true}></input>
            <br />
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required={true}></input>
            <br />
            <button type="submit">Login</button>
        </form>
    );
};