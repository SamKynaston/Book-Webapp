import { useAuth } from "../Context/Authentication";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../Services/Users.service";

export const PasswordResetForm = ( { token }: { token?: string | null } ) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const { user, refreshUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (user) {
            try {
                if (await resetPassword(user.id, oldPassword, newPassword, token)) {
                    await refreshUser();
                    navigate("/account")
                }
            } catch (err: any) {
                console.log(err)
                alert(err.message);
            }
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setOldPassword(e.target.value)} type="password" placeholder="Your old password" required={true}></input>
            <br />
            <input onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="Your new password" required={true}></input>
            <br />
            <button type="submit">Update Password</button>
        </form>
    );
};