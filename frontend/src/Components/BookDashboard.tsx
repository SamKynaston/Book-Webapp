import { useState, useEffect } from "react";
import { useAuth } from "../Context/Authentication";
import { getAllBooks, createNewBook, getBookLink } from "../Services/Books.service";
import { getAllAuthors } from "../Services/Authors.service";
import { Author, Book } from "@bookwebapp/types";

export const BookDashboard = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    
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

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const res = await createNewBook(
                title, 
                parseInt(coverId, 10), 
                [selectedAuthor], 
                parseInt(publishYear, 10), 
                isRecommended
            );
            
            if (res.success) {
                await refreshUser();
                await fetchData();
                // Reset Form
                setTitle("");
                setSelectedAuthor(0);
                setPublishYear("");
                setCoverId("");
                setRecommended(false);
            }
        } catch (err) {
            console.error("Failed to create book", err);
        }
    };

    return (
        <div className="w-full md:max-w-6xl text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Management</h1>

            <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
                <table className="min-w-[900px] w-full leading-normal">
                    <thead>
                        <tr className="bg-stone-900">
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Title</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Author</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Year</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Cover</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Recommended</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {books.map((book) => (
                            <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-5 py-4 text-sm font-medium text-gray-900">{book.title}</td>
                                <td className="px-5 py-4 text-sm text-gray-600">
                                    {book.authors?.map((a) => a.name).join(", ") || "Unknown"}
                                </td>                                
                                <td className="px-5 py-4 text-sm text-gray-500">
                                    {book.first_publish_year}
                                </td>
                                <td className="px-5 py-4 text-sm text-gray-500">
                                    {book.cover_id}
                                </td>
                                <td className="px-5 py-4 text-sm">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                                        book.is_recommended ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                    }`}>
                                        {book.is_recommended ? "Yes" : "No"}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-sm">
                                    <a href={getBookLink(book.id.toString())} className="text-blue-600 hover:text-blue-800 font-semibold">View</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot className="bg-gray-50 border-t-2 border-stone-900">
                        <tr>
                            <td className="px-4 py-4">
                                <input 
                                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:border-blue-500 outline-none"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </td>
                            <td className="px-4 py-4">
                                <select 
                                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:border-blue-500 outline-none bg-white"
                                    value={selectedAuthor}
                                    onChange={(e) => setSelectedAuthor(Number(e.target.value))}
                                >
                                    <option value={0}>Select Author</option>
                                    {authors.map((a) => (
                                        <option key={a.id} value={a.id}>{a.name}</option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-4 py-4">
                                <input 
                                    className="w-20 border border-gray-300 rounded px-2 py-1 text-sm focus:border-blue-500 outline-none"
                                    placeholder="Year"
                                    type="number"
                                    value={publishYear}
                                    onChange={(e) => setPublishYear(e.target.value)}
                                />
                            </td>
                            <td className="px-4 py-4">
                                <input 
                                    className="w-20 border border-gray-300 rounded px-2 py-1 text-sm focus:border-blue-500 outline-none"
                                    placeholder="Cover"
                                    value={coverId}
                                    onChange={(e) => setCoverId(e.target.value)}
                                />
                            </td>
                            <td className="px-4 py-4">
                                <label className="flex items-center space-x-2 text-xs text-gray-600 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        checked={isRecommended}
                                        onChange={(e) => setRecommended(e.target.checked)}
                                    />
                                </label>
                            </td>
                            <td className="px-4 py-4">
                                <button 
                                    onClick={handleSubmit}
                                    disabled={!title || !selectedAuthor}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-1.5 px-3 rounded text-sm transition-colors"
                                >
                                    Add Book
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};