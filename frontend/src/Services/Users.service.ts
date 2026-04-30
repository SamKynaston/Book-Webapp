import { User, Book } from "@bookwebapp/types";
import { apiFetch, handleResponse } from "../Utilities/Fetch.utilities";

export async function updateUser(email: string, username: string, id: number): Promise<boolean> {
    const data = await handleResponse<{ success: boolean, body: User }>(
        await apiFetch(`v1/users/${id}`, {
            method: "PUT",
            body: JSON.stringify({ 
                email: email, 
                username: username, 
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

export async function getAllUsers(): Promise<{ success: boolean, body: User[] }> {
    const res = await apiFetch(`v1/users`);
    return await handleResponse<{ success: boolean, body: User[] }>(res)
}

export async function login(email: string, password: string): Promise<boolean> {
    const data = await handleResponse<{ success: boolean, message: string }>(
        await apiFetch(`v1/users/authenticate`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
        })
    );

    return data.success
}

export async function resetPassword(id: number, oldPassword: string, newPassword: string): Promise<boolean> {
    const data = await handleResponse<{ success: boolean }>(
        await apiFetch(`v1/users/${id}/reset-password`, {
            method: "POST",
            body: JSON.stringify({ oldPassword, newPassword }),
        })
    );

    return data.success
}

export async function forcePasswordReset(id: number): Promise<boolean> {
    const data = await handleResponse<{ success: boolean }>(
        await apiFetch(`v1/users/${id}/admin-reset-password`, {
            method: "POST",
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