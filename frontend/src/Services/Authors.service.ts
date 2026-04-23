import { apiFetch, handleResponse } from "../Utilities/Fetch.utilities";
import { Author } from "@bookwebapp/types";

export async function getAllAuthors(): Promise<{ body: Author[], success: boolean }> {
    const res = await apiFetch(`v1/authors`);
    return await handleResponse<{ body: Author[], success: boolean }>(res)
}