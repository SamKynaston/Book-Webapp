import type { Book } from "@bookwebapp/types";
import { apiFetch, handleResponse } from "../Utilities/Fetch.utilities";

const bookDirectory = import.meta.env.VITE_BOOK_DIRECTORY;

export async function getBook(id: string | undefined): Promise<{ body: Book }> {
    if (!id) {
        throw { status: 404, message: "Missing ID for book!" }
    }

    const res = await apiFetch(`v1/books/${id}`, {});
    return await handleResponse<{ body: Book }>(res)
}

export async function getAllBooks(): Promise<{ body: Book[] }> {
    const res = await apiFetch(`v1/books`);
    return await handleResponse<{ body: Book[] }>(res)
}

export async function updateBook(id: string, title: string, coverId: number, authors: number[], firstPublishYear: number, isRecommended: boolean): Promise< { success: boolean } > {
    const res = await apiFetch(`v1/books/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            title: title,
            cover_id: coverId,
            first_publish_year: firstPublishYear,
            authors: authors,
            is_recommended: isRecommended
        })
    })

    return await handleResponse<{ success: boolean }>(res)
}

export async function deleteBook(id: string) {
    const res = await apiFetch(`v1/books/${id}`, {
        method: "DELETE",
    })
    
    return await handleResponse<{ success: boolean }>(res)
}

export async function createNewBook(title: string, coverId: number, authors: number[], firstPublishYear: number, isRecommended: boolean): Promise<{ success: boolean }> {
    const res = await apiFetch(`v1/books`, {
        method: "POST",
        body: JSON.stringify({ 
            title: title,
            cover_id: coverId,
            first_publish_year: firstPublishYear,
            authors: authors,
            is_recommended: isRecommended || false
        }),
    });

    return await handleResponse<{ success: boolean }>(res)
}

export function getBookLink(id: string) {
    return `${bookDirectory}/${id}`;
};

export async function getFavourites(): Promise<Book[]> {
    const data = await handleResponse<{ success: boolean, body: Book[] }>(
        await apiFetch(`v1/users/favourites`)
    )

    return data.body
}

export async function isFavourited(id: number | undefined): Promise<Boolean> {
    const data = await handleResponse<{ success: boolean, favourited: boolean }>(
        await apiFetch(`v1/books/${id}/favourited`)
    )

    return data.favourited
}

export async function favouriteBook(id: number | undefined): Promise<Boolean> {
   const data = await handleResponse<{ success: boolean }>(
    await apiFetch(`v1/books/${id}/favourite`, {
        method: "POST"
    })
   )

   return data.success
}

export async function unFavouriteBook(id: number | undefined): Promise<Boolean> {
   const data = await handleResponse<{ success: boolean }>(
    await apiFetch(`v1/books/${id}/unfavourite`, {
        method: "POST"
    })
   )

   return data.success
}