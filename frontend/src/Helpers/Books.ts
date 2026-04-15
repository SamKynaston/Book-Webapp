import type { Book } from "@bookwebapp/types";

export async function getBook(id: string | undefined): Promise<Book> {
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
        const response = await fetch(`${apiUrl}/v1/books/${id}`);
        const data = await response.json();

        if (data && data.body) {
            return data.body as Book;
        } else {
            throw new Error("Book not found");
        }
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