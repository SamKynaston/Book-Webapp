import type { Book } from "@bookwebapp/types";
import { apiFetch, handleResponse } from "../Utilities/Fetch.utilities";

export async function getBookInventory(id: number | undefined): Promise<{ success: boolean,  body: { availability: number, total: number, } }> {
    if (!id) {
        throw { status: 404, message: "Missing ID for book!" }
    }

    const res = await apiFetch(`v1/inventory/${id}`, {});
    return await handleResponse<{ success: boolean,  body: { availability: number, total: number, } }>(res)
}