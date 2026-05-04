import type { Book, InventoryStatus } from "@bookwebapp/types";
import { apiFetch, handleResponse } from "../Utilities/Fetch.utilities";

export async function getBookInventory(id: number | undefined): Promise<{ success: boolean,  body: { availability: number, total: number, } }> {
    if (!id) {
        throw { status: 404, message: "Missing ID for book!" }
    }

    const res = await apiFetch(`v1/inventory/${id}`, {});
    return await handleResponse<{ success: boolean,  body: { availability: number, total: number, } }>(res)
}

export async function createBookInventory( bookId: number, location: string, ): Promise<{ success: boolean,  body: { availability: number, total: number, } }> {
    if (!bookId) {
        throw { status: 404, message: "Missing ID for book!" }
    }

    const res = await apiFetch(`v1/inventory`, {
        method: "POST",
        body: JSON.stringify({
            bookId: bookId,
            location: location,
        })
    });

    return await handleResponse<{ success: boolean,  body: { availability: number, total: number, } }>(res)
}

export async function updateBookInventory(inventoryId: number, location: string, ): Promise<{ success: boolean,  body: { availability: number, total: number, } }> {
    if (!inventoryId) {
        throw { status: 404, message: "Missing ID for inventory!" }
    }

    const res = await apiFetch(`v1/inventory`, {
        method: "PUT",
        body: JSON.stringify({
            inventoryId: inventoryId,
            location: location,
        })
    });

    return await handleResponse<{ success: boolean,  body: { availability: number, total: number, } }>(res)
}

export async function getAllInventory(): Promise<{ success: boolean,  body: { id: number, bookId: number, location: string, status: InventoryStatus }[] }> {
    const res = await apiFetch(`v1/inventory`, {});
    return await handleResponse<{ success: boolean,  body: { id: number, bookId: number, location: string, status: InventoryStatus }[] }>(res)
}