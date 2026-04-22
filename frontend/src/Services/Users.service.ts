import { useAuth } from "../Context/Authentication";

export async function updateUser(email: string, username: string, password: string, id: number | undefined): Promise<Boolean> {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const res = await fetch(`${apiUrl}/v1/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                email: email, 
                username: username, 
                password: password 
            }),
            credentials: "include"
        });

        if (res.ok) {
            return true
        } else {
            throw new Error("Update failed");
        }
    } catch (error) {
        throw error;
    }
}

export async function logout(): Promise<boolean> {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    await fetch(`${apiUrl}/v1/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    
    return true
}

export async function login(email: string, password: string): Promise<boolean> {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const res = await fetch(`${apiUrl}/v1/users/authenticate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include"
        });

        if (res.ok) {
            return true
        } else {
            throw new Error("Login failed");
        }
    } catch (error) {
        throw new Error("Authentication failed");
    }
}

export async function signup(email: string, username: string, password: string) {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const res = await fetch(`${apiUrl}/v1/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              email: email, 
              username: username, 
              password: password 
            }),
            credentials: "include"
        });

        if (res.ok) {
            return true
        } else {
            throw new Error("Login failed");
        }
    } catch (error) {
        throw new Error("Authentication failed");
    }
  }