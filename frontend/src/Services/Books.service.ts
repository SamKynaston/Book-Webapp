import type { Book } from "@bookwebapp/types";
import { apiFetch, handleResponse } from "../Utilities/Fetch.utilities";

const bookDirectory = import.meta.env.VITE_BOOK_DIRECTORY;

export async function getBook(id: string | undefined): Promise<Book | null> {
    if (!id) {
        throw { status: 404, message: "Missing ID for book!" }
    }

    const res = await apiFetch(`v1/books/${id}`, {});
    return await handleResponse<Book>(res)
}

export async function getAllBooks(): Promise<Book[]> {
    const res = await apiFetch(`v1/books`);
    return await handleResponse<Book[]>(res)
}

export function getBookLink(id: string) {
    return `${bookDirectory}/${id}`;
};