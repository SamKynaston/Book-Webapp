import { errorMessages } from "./Error.utilities";

export const apiFetch = async (endPoint: string, parameters: RequestInit = {} ): Promise<Response> => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const config: RequestInit = {
        ...parameters,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...parameters.headers,
        }
    }

    return await fetch(`${apiUrl}/${endPoint}`, config)
}

export const handleResponse = async <T = any>(res: Response): Promise<T> => {
    const data = await res.json()

    if (res.ok) {
        return data as T;
    }

    let error = { message: "undefined" }

    if (res.status !== 400) {
        if (data.message) {
            error = { message: data.message }
        } else {
            error = errorMessages[res.status] ?? {
                message: "Unknown error"
            };
        }
    } else {
        error = { message: data.message }
    }

    throw { status: res.status, message: error.message };
}