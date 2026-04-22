import { useAuth } from "../Context/Authentication";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../Services/Users.service";

interface UpdateFormType {
    id: number | undefined;
}

export const UpdateForm = ({ id }: UpdateFormType ) => {
    const { user, refreshUser } = useAuth();

    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (!id) {
                id = user?.id
            }
            
            if (await updateUser(email, username, password, id)) {
                await refreshUser()
            }; 
        } catch (err) {
            console.log(err)
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