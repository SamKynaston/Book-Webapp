import { User } from "@bookwebapp/types";
import { apiFetch, handleResponse } from "../Utilities/Fetch.utilities";

export async function updateUser(email: string, username: string, password: string, id: number | undefined): Promise<boolean> {
    const data = await handleResponse<{ success: boolean, user: User }>(
        await apiFetch(`v1/users/${id}`, {
            method: "PUT",
            body: JSON.stringify({ 
                email: email, 
                username: username, 
                password: password 
            }),
        })
    )

    return data.success
}

export async function logout(): Promise<boolean> {    
    const data = await handleResponse<{ success: boolean }>(
        await apiFetch(`v1/users/logout`, {
            method: "POST",
        })
    );

    return data.success
}

export async function login(email: string, password: string): Promise<boolean> {
    const data = await handleResponse<{ success: boolean }>(
        await apiFetch(`v1/users/authenticate`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
        })
    );

    return data.success
}

export async function signup(email: string, username: string, password: string): Promise<boolean> {
    const data = await handleResponse<{ success: boolean }>(
        await apiFetch(`v1/users`, {
            method: "POST",
            body: JSON.stringify({ 
                email: email, 
                username: username, 
                password: password 
            }),
        })
    );

    return data.success; 
}