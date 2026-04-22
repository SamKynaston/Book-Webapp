import { apiFetch, handleResponse } from "../Utilities/Fetch.utilities";

export async function updateUser(email: string, username: string, password: string, id: number | undefined): Promise<void> {
    const res = await apiFetch(`v1/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({ 
            email: email, 
            username: username, 
            password: password 
        }),
    });

    return await handleResponse(res);
}

export async function logout(): Promise<{}> {    
    const res = await apiFetch(`v1/users/logout`, {
      method: "POST",
    });
    
    return await handleResponse(res);
}

export async function login(email: string, password: string): Promise<void> {
    const res = await apiFetch(`v1/users/authenticate`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });

    return await handleResponse(res);
}

export async function signup(email: string, username: string, password: string): Promise<void> {
    const res = await apiFetch(`v1/users`, {
        method: "POST",
        body: JSON.stringify({ 
            email: email, 
            username: username, 
            password: password 
        }),
    });

    return await handleResponse(res); 
}