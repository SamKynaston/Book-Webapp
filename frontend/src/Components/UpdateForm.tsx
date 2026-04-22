import { useAuth } from "../Helpers/Authentication";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UpdateFormType {
    id: number | null;
}

export const UpdateForm = ({ id }: UpdateFormType ) => {
    const { update, user } = useAuth();

    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await update(email, username, password, id); 
            console.log("navigating");
            navigate("/account");
        } catch (err) {
            alert("Login failed.");
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required={true}></input>
            <br />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required={true}></input>
            <br />
            <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password"></input>
            <br />
            <button type="submit">Signup</button>
        </form>
    );
};