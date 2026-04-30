import { useState, useEffect } from "react";
import { User } from "@bookwebapp/types";
import { getAllUsers, updateUser } from "../Services/Users.service";
import { DataTable } from "./DataTable";

export function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [creating, setCreating] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        (async () => {
            const body = await getAllUsers();
            setUsers(body.body);
        })();
    }, []);

    const reset = () => {
        setUsername("");
        setEmail("");
    };

    const saveUpdate = async (id: number) => {
        await updateUser(email, username, id);
        
        const fresh = await getAllUsers();
        setUsers(fresh.body);

        reset();
    };

    return (
        <DataTable data={users} isEditing={(u) => u.id === editingId} onAdd={() => setCreating(true)}
            columns={[
                {
                header: "Username",
                render: (u) => u.username,
                },

                {
                header: "Email",
                render: (u) => u.email,
                },

                {
                header: "Actions",

                render: (u) => (
                    <div className="flex justify-end gap-3">
                        <a onClick={() => {
                            setEditingId(u.id);
                            setUsername(u.username);
                            setEmail(u.email);
                        }}>
                            Edit
                        </a>
                    </div>
                ),
                },
            ]}

            renderEditRow={(b) => (
                <>
                <td><input className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" value={username} onChange={e => setUsername(e.target.value)} /></td>
                <td><input className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" value={email} onChange={e => setEmail(e.target.value)} /></td>

                <td className="text-right space-x-3 px-4 py-3">
                    <a onClick={() => saveUpdate(b.id)}>Save</a>
                    <a onClick={reset}>Cancel</a>
                </td>
                </>
            )}

            renderCreateRow={() =>
                creating && (
                <>
                    <td className="px-4 py-3"><input className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" placeholder="Title" value={email} onChange={e => setEmail(e.target.value)} /></td>
                    <td className="px-4 py-3"><input className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" placeholder="Year" value={username} onChange={e => setUsername(e.target.value)} /></td>
            
                    <td className="text-right space-x-3 px-4 py-3">
                    <a onClick={reset}>Cancel</a>
                    </td>
                </>
                )
            }
        />
    );
}

