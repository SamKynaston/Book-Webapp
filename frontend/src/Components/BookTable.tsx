import { useState, useEffect } from "react";
import { Book, Author } from "@bookwebapp/types";
import { getAllAuthors } from "../Services/Authors.service";
import { getAllBooks, deleteBook, updateBook, createNewBook} from "../Services/Books.service";
import { DataTable } from "./DataTable";

export function BookTable() {
    const [books, setBooks] = useState<Book[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [title, setTitle] = useState("");
    const [authorId, setAuthorId] = useState<number>(0);
    const [year, setYear] = useState("");
    const [cover, setCover] = useState("");
    const [recommended, setRecommended] = useState(false);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        (async () => {
        const [b, a] = await Promise.all([getAllBooks(), getAllAuthors()]);
        setBooks(b.body);
        setAuthors(a.body);
        })();
    }, []);

    const handleDelete = async (id: number) => {
        const res = await deleteBook(id.toString())

        if (res.success) {
        const fresh = await getAllBooks();
        setBooks(fresh.body);
        reset();
        }
    }

    const reset = () => {
        setTitle("");
        setAuthorId(0);
        setYear("");
        setCover("");
        setRecommended(false);
        setEditingId(null);
        setCreating(false);
    };

    const saveCreate = async () => {
        const res = await createNewBook(title, Number(cover), [authorId], Number(year), recommended);

        if (res.success) {
        const fresh = await getAllBooks();
        setBooks(fresh.body);
        reset();
        }
    };

    const saveUpdate = async (id: number) => {
        await updateBook(id.toString(), title, Number(cover), [authorId], Number(year), recommended);
        const fresh = await getAllBooks();

        setBooks(fresh.body);
        reset();
    };

    return (
        <DataTable data={books} isEditing={(b) => b.id === editingId} onAdd={() => setCreating(true)}
            columns={[
                {
                header: "Title",
                render: (b) => b.title,
                },

                {
                header: "Author",
                render: (b) => b.authors?.map(a => a.name).join(", ") ?? "",
                },

                {
                header: "Year",
                render: (b) => b.first_publish_year,
                },

                {
                header: "Cover",
                render: (b) => b.cover_id,
                },

                {
                header: "Recommended",
                render: (b) => (b.is_recommended ? "Yes" : "No"),
                },

                {
                header: "Actions",

                render: (b) => (
                    <div className="flex justify-end gap-3">
                    <a onClick={() => {
                        setEditingId(b.id);
                        setTitle(b.title);
                        setYear(String(b.first_publish_year));
                        setCover(String(b.cover_id ?? ""));
                        setAuthorId(b.authors?.[0]?.id ?? 0);
                        setRecommended(!!b.is_recommended);
                    }}>
                        Edit
                    </a>
                    <a onClick={() => handleDelete(b.id)}>
                        Delete
                    </a>
                    </div>
                ),
                },
            ]}

            renderEditRow={(b) => (
                <>
                <td><input className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" value={title} onChange={e => setTitle(e.target.value)} /></td>
                <td>
                    <select className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" value={authorId} onChange={e => setAuthorId(Number(e.target.value))}>
                    {authors.map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                    </select>
                </td>
                <td><input className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" value={year} onChange={e => setYear(e.target.value)} /></td>
                <td><input className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" value={cover} onChange={e => setCover(e.target.value)} /></td>
                <td>
                    <input className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" type="checkbox" checked={recommended} onChange={e => setRecommended(e.target.checked)} />
                </td>

                <td className="text-right space-x-3 px-4 py-3">
                    <a onClick={() => saveUpdate(b.id)}>Save</a>
                    <a onClick={reset}>Cancel</a>
                </td>
                </>
            )}

            renderCreateRow={() =>
                creating && (
                <>
                    <td className="px-4 py-3"><input className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /></td>
                    <td className="px-4 py-3">
                    <select className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" value={authorId} onChange={e => setAuthorId(Number(e.target.value))}>
                        <option value={0}>Select</option>
                        {authors.map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                        ))}
                    </select>
                    </td>
                    <td className="px-4 py-3"><input className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} /></td>
                    <td className="px-4 py-3"><input className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" placeholder="Cover" value={cover} onChange={e => setCover(e.target.value)} /></td>
                    <td>
                    <input className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" type="checkbox" checked={recommended} onChange={e => setRecommended(e.target.checked)}/>
                    </td>

                    <td className="text-right space-x-3 px-4 py-3">
                    <a onClick={saveCreate}>Create</a>
                    <a onClick={reset}>Cancel</a>
                    </td>
                </>
                )
            }
        />
    );
}

