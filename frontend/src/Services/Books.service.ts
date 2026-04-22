import type { Book } from "@bookwebapp/types";

const bookDirectory = import.meta.env.VITE_BOOK_DIRECTORY;

export async function getBook(id: string | undefined): Promise<Book | null> {
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
        const response = await fetch(`${apiUrl}/v1/books/${id}`);
        const data = await response.json();

        if (response.ok) {
            if (data && data.body) {
                return data.body as Book;
            } else {
                throw new Error("Book not found");
            }
        } else {
            if (response.status == 401) {
                throw new Error("UNAUTHORISED")
            }
        }

        return null
    } catch (error) {
        throw error;
    }
}

export async function getAllBooks(): Promise<Book[]> {
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
        const response = await fetch(`${apiUrl}/v1/books`);
        const data = await response.json();

        if (data && data.body) {
            return data.body as Book[];
        } else {
            throw new Error("No books found");
        }
    } catch (error) {
        throw error;
    }
}

export function getBookLink(id: string) {
    return `${bookDirectory}/${id}`;
};