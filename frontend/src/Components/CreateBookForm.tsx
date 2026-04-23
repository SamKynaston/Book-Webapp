import { useAuth } from "../Context/Authentication";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createNewBook } from "../Services/Books.service";
import { getAllAuthors } from "../Services/Authors.service";
import { Author } from "@bookwebapp/types";

export const CreateBookForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState(0);
    const [publishYear, setPublishYear] = useState("");
    const [isRecommended, setRecommended] = useState(false);
    const [coverId, setCoverId] = useState("");
    const [authors, setAuthors] = useState<Author[]>([]);

    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    useEffect(() => {
        getAllAuthors().then((res) => setAuthors(res.body));
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try { 
            if (await createNewBook(title, parseInt(coverId, 10), [author], parseInt(publishYear, 10), isRecommended)) {
                await refreshUser();
                navigate("/account")
            };
        } catch (err) {
            alert("Sign up failed.");
        }
    }
    
    return (
        <>
            <select value={author} onChange={(e) => setAuthor(Number(e.target.value))}>
                {authors.map((a: Author) => (
                    <option key={a.id} value={a.id}>
                    {a.name}
                    </option>
                ))}
            </select>
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setTitle(e.target.value)} placeholder="Title" required={true}></input>
                <br />
                <input onChange={(e) => setPublishYear(e.target.value)} placeholder="First Publish Year" required={true}></input>
                <br />
                <label>Recommended:
                <input type="checkbox" name="Recommended" onChange={(e) => setRecommended(e.target.checked) } placeholder="Recommend" required={true}></input>
                </label>
                <br />
                <input onChange={(e) => setCoverId(e.target.value)} placeholder="Cover ID" required={true}></input>
                <br />
                <button type="submit">Signup</button>
            </form>
        </>
    );
};