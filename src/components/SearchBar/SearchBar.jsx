import { useState } from "react";
import toast from 'react-hot-toast';
import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            toast.error('Please enter a search term!');
            return;
        }
        onSubmit(query);
        setQuery('');
    };

    return (
        <header>
            <form onSubmit={handleSubmit} className={css.form}>
                <input
                    type="text"
                    autoComplete="off"
                    value={query}
                    placeholder="Search images and photos"
                    onChange={(e) => setQuery(e.target.value)}
                    className={css.input}
                />
                <button type="submit">Search</button>
            </form>
        </header >
    );
};

export default SearchBar;