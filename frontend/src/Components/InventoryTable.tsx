import { useState, useEffect } from "react";

import { Book, InventoryStatus } from "@bookwebapp/types";
import { getAllBooks, getBook } from "../Services/Books.service";
import { getAllInventory, updateBookInventory, createBookInventory } from "../Services/Inventory.service";

import { DataTable } from "./DataTable";

export function InventoryTable() {
    const [books, setBooks] = useState<Book[]>([]);
    const [inventory, setInventory] = useState<{ id: number; bookId: number; location: string; status: InventoryStatus }[]>([]);    
    const [editingId, setEditingId] = useState<number | null>(null);
    const [creating, setCreating] = useState(false);
    
    const [bookId, setBookId] = useState(1);
    const [location, setLocation] = useState("");

    useEffect(() => {
        (async () => {
            const body = await getAllInventory();
            setInventory(body.body);
        })();

        (async () => {
            const body = await getAllBooks();
            setBooks(body.body);
        })();
    }, []);

    const reset = () => {
        setBookId(1);
        setLocation("");
        setEditingId(null);
        setCreating(false);
    };

    const getBookTitle = (bookId: number) => {
        return books.find(b => b.id === bookId)?.title ?? "Unknown Book";
    };

    const saveCreate = async () => {
        const res = await createBookInventory(bookId, location);

        if (res) {
            const fresh = await getAllInventory();
            setInventory(fresh.body);

            reset();
        }
    };

    const saveUpdate = async (id: number) => {
        await updateBookInventory(id, location);
        
        const fresh = await getAllInventory();
        setInventory(fresh.body);

        reset();
    };

    return (
        // Use the inventory table of the database for this table, with Book and Location as columns
        <DataTable data={inventory} isEditing={(i) => i.id === editingId} onAdd={() => setCreating(true)}
            columns={[
                {
                    header: "Book",
                    render: (i) => getBookTitle(i.bookId),
                },

                {
                    header: "Location",
                    render: (i) => i.location,
                },

                {
                header: "Actions",

                render: (u) => (
                    <div className="flex justify-end gap-3">
                        <a onClick={() => {
                            setEditingId(u.id);
                            setBookId(u.bookId);
                            setLocation(u.location);
                        }}>
                            Edit
                        </a>
                    </div>
                ),
                },
            ]}

            // Changes the row the data is on to the create format, but with the current data it uses
            renderEditRow={(b) => (
                <>
                    <td>
                        <select className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" value={bookId} onChange={e => setBookId(Number(e.target.value))}>
                        {books.map(a => (
                            <option key={a.id} value={a.id}>{a.title}</option>
                        ))}
                        </select>
                    </td>
                    <td><input className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" value={location} onChange={e => setLocation(e.target.value)} /></td>

                    <td className="text-right space-x-3 px-4 py-3">
                        <a onClick={() => saveUpdate(b.id)}>Save</a>
                        <a onClick={reset}>Cancel</a>
                    </td>
                </>
            )}

            // Creates a new row when creating a new entry in that specific table for the database
            renderCreateRow={() =>
                creating && (
                    <>
                        <td>
                            <select className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" value={bookId} onChange={e => setBookId(Number(e.target.value))}>
                            {books.map(a => (
                                <option key={a.id} value={a.id}>{a.title}</option>
                            ))}
                            </select>
                        </td>
                        <td><input className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" value={location} onChange={e => setLocation(e.target.value)} /></td>

                        <td>
                            <a onClick={saveCreate}>Save</a>
                            <a onClick={reset}>Cancel</a>
                        </td>
                    </>
                )
            }
        />
    );
}

