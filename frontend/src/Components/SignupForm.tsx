import { useAuth } from "../Context/Authentication";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../Services/Users.service";

export const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (await signup(email, username, password)) {
                await refreshUser();
                navigate("/account")
            }
        } catch (err: any) {
            alert(err.message);
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" required={true}></input>
            <br />
            <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" required={true}></input>
            <br />
            <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required={true}></input>
            <br />
            <button type="submit">Signup</button>
        </form>
    );
};