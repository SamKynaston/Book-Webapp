import { useAuth } from "../Context/Authentication";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Services/Users.service";

export const AuthenticationForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { refreshUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (await login(email, password)) {
                await refreshUser();
                navigate("/account")
            }
        } catch (err: any) {
            console.log(err)
            alert(err.message);
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