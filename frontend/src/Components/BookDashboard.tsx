import { useState, useEffect } from "react";
import { useAuth } from "../Context/Authentication";
import { getAllBooks, createNewBook, getBookLink, updateBook } from "../Services/Books.service";
import { getAllAuthors } from "../Services/Authors.service";
import { Author, Book } from "@bookwebapp/types";

export const BookDashboard = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    
    const [editingId, setEditingId] = useState<number>(0);
    const [isCreating, setIsCreating] = useState(false);

    const [title, setTitle] = useState("");
    const [selectedAuthor, setSelectedAuthor] = useState<number>(0);
    const [publishYear, setPublishYear] = useState("");
    const [isRecommended, setRecommended] = useState(false);
    const [coverId, setCoverId] = useState("");

    const { refreshUser } = useAuth();

    const fetchData = async () => {
        const [booksRes, authorsRes] = await Promise.all([
            getAllBooks(),
            getAllAuthors()
        ]);
        setBooks(booksRes.body);
        setAuthors(authorsRes.body);
    };

    const resetForm = () => {
        setTitle("");
        setSelectedAuthor(0);
        setPublishYear("");
        setCoverId("");
        setRecommended(false);
        setEditingId(0);
        setIsCreating(false);
    };

    const handleStartCreate = () => {
        resetForm();
        setIsCreating(true);
    };

    const handleStartEdit = (book: Book) => {
        resetForm();
        setEditingId(book.id);
        setTitle(book.title);

        const authorId = book.authors?.[0]?.id || (typeof book.authors?.[0] === 'number' ? book.authors[0] : 0);
        setSelectedAuthor(authorId);
        
        setPublishYear(book.first_publish_year.toString());
        setCoverId(book.cover_id?.toString() || "");
        
        setRecommended(!!book.is_recommended);
    };

    const handleCreate = async () => {
        try {
            const res = await createNewBook(title, parseInt(coverId, 10), [selectedAuthor], parseInt(publishYear, 10), isRecommended);
            if (res.success) {
                await refreshUser();
                await fetchData();
                resetForm();
            }
        } catch (err) { console.error("Create failed", err); }
    };

    const handleUpdate = async () => {
        try {
            await updateBook(editingId.toString(), title, parseInt(coverId, 10), [selectedAuthor], parseInt(publishYear, 10), isRecommended);
            await fetchData();
            resetForm();
        } catch (err) { console.error("Update failed", err); }
    };

    useEffect(() => { fetchData(); }, []);

    return (
        <div className="w-full md:max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Book Management</h1>

            <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto shadow-sm">
                <table className="min-w-[1000px] w-full leading-normal">
                    <thead>
                        <tr className="bg-stone-900 text-gray-300 uppercase text-[10px] tracking-widest">
                            <th className="px-5 py-4 text-left">Title</th>
                            <th className="px-5 py-4 text-left">Author</th>
                            <th className="px-5 py-4">Year</th>
                            <th className="px-5 py-4">Cover ID</th>
                            <th className="px-5 py-4">Recommended</th>
                            <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {books.map((book) => (
                            <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                                {editingId === book.id ? (
                                    <>
                                        <td className="p-3"><input required={true} className="w-full border border-blue-600 rounded px-2 py-1 outline-none" value={title} onChange={e => setTitle(e.target.value)} /></td>
                                        <td className="p-3">
                                            <select required={true} className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none" value={selectedAuthor} onChange={e => setSelectedAuthor(Number(e.target.value))}>
                                                {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                            </select>
                                        </td>
                                        <td className="p-3"><input required={true} className="w-24 border border-blue-600 rounded px-2 py-1 mx-auto block" type="number" value={publishYear} onChange={e => setPublishYear(e.target.value)} /></td>
                                        <td className="p-3"><input required={true} className="w-24 border border-blue-600 rounded px-2 py-1 mx-auto block" value={coverId} onChange={e => setCoverId(e.target.value)} /></td>
                                        <td className="p-3 text-center"><input required={true} type="checkbox" className="w-4 h-4" checked={isRecommended} onChange={e => setRecommended(e.target.checked)} /></td>
                                        <td className="px-5 py-4 text-sm text-right space-x-4">
                                            <a onClick={handleUpdate} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">Save</a>
                                            <a onClick={resetForm} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">Cancel</a>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="px-5 py-4 text-sm font-medium text-gray-900 text-left">{book.title}</td>
                                        <td className="px-5 py-4 text-sm text-gray-600 text-left">{book.authors?.map(a => a.name).join(", ")}</td>
                                        <td className="px-5 py-4 text-sm text-center">{book.first_publish_year}</td>
                                        <td className="px-5 py-4 text-sm text-center">{book.cover_id}</td>
                                        <td className="px-5 py-4 text-sm text-center">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${book.is_recommended ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                                {book.is_recommended ? "Yes" : "No"}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-right space-x-4">
                                            <a onClick={() => handleStartEdit(book)} className="text-blue-600 hover:text-blue-800  font-semibold transition-colors">Edit</a>
                                            <a href={getBookLink(book.id.toString())} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">View</a>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}

                        {isCreating && (
                            <tr className="bg-blue-50/50 border-b-2 border-blue-200">
                                <td className="p-3"><input required={true} autoFocus className="w-full border border-blue-600 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-400" placeholder="Book Title" value={title} onChange={e => setTitle(e.target.value)} /></td>
                                <td className="p-3">
                                    <select required={true} className="w-full border border-blue-600 rounded px-2 py-1 bg-white outline-none focus:ring-2 focus:ring-blue-400" value={selectedAuthor} onChange={e => setSelectedAuthor(Number(e.target.value))}>
                                        <option value={0}>Select Author</option>
                                        {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                    </select>
                                </td>
                                <td className="p-3"><input required={true} className="w-24 border border-blue-600 rounded px-2 py-1 mx-auto block" type="number" placeholder="Year" value={publishYear} onChange={e => setPublishYear(e.target.value)} /></td>
                                <td className="p-3"><input required={true} className="w-24 border border-blue-600 rounded px-2 py-1 mx-auto block" placeholder="Cover" value={coverId} onChange={e => setCoverId(e.target.value)} /></td>
                                <td className="p-3 text-center"><input type="checkbox" required={true} className="w-4 h-4" checked={isRecommended} onChange={e => setRecommended(e.target.checked)} /></td>
                                <td className="px-5 py-4 text-sm text-right space-x-4">
                                    <a onClick={handleCreate} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors disabled:opacity-50">Create</a>
                                    <a onClick={resetForm} className="text-blue-600 hover:text-blue-800  font-semibold transition-colors">Cancel</a>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot className="bg-stone-900">
                        <tr>
                            <td colSpan={999} className="px-4 py-3">
                                <div className="flex justify-end">
                                    <button onClick={handleStartCreate} className="bg-green-900 text-white w-8 h-8 rounded-lg flex items-center justify-center text-lg shadow-lg transition-transform active:scale-95" title="Add New Book">
                                        +
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};