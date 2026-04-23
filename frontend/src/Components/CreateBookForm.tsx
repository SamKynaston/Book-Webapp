import { useAuth } from "../Context/Authentication";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewBook } from "../Services/Books.service";

export const CreateBookForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [isRecommended, setRecommended] = useState(false);
    const [coverId, setCoverId] = useState("");

    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const authorToSubmit = author
            .split(",")
            .map(a => Number(a.trim()))
            .filter(n => !isNaN(n));

        try {
            if (await createNewBook(title, parseInt(coverId, 10), authorToSubmit, parseInt(publishYear, 10), isRecommended)) {
                await refreshUser();
                navigate("/account")
            };
        } catch (err) {
            alert("Sign up failed.");
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setTitle(e.target.value)} placeholder="Title" required={true}></input>
            <br />
            <input onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required={true}></input>
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
    );
};