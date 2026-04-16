export async function AuthenticateUser(email: string, password: string) {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;
        console.log(email, password)
        
        const response = await fetch(`${apiUrl}/v1/users/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        });

        const data = await response.json();
        console.log(data);
        
        return data;
    } catch (error) {
        console.error("Authentication failed:", error);
        throw new Error("Authentication failed");
    }
}