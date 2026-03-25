import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets';


const SearchInput = ({ placeholder = 'Search...', onSearch } = {}) => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const inputRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        if (open && inputRef.current) inputRef.current.focus()
    }, [open])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') setOpen(false)
            if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault()
                setOpen((v) => !v)
            }
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [])

    useEffect(() => {
        const onDocClick = (e) => {
            if (!containerRef.current) return
            if (!containerRef.current.contains(e.target)) setOpen(false)
        }
        if (open) document.addEventListener('mousedown', onDocClick)
        return () => document.removeEventListener('mousedown', onDocClick)
    }, [open])

    const submit = (e) => {
        e.preventDefault()
        if (onSearch) onSearch(query)
        else console.log('Search:', query)
        setOpen(false)
    }

    return (
        <div className="relative" ref={containerRef}>
            {!open && (
                <button
                    aria-label="Open search"
                    className="p-2 dark:hover:bg-gray-700 transition"
                    onClick={() => setOpen(true)}
                >
                    <img src={assets.searchIcon} alt="Search" />
                </button>
            )}

            {open && (
                <form onSubmit={submit} className="flex items-center gap-2 bg-white dark:bg-gray-400 rounded-md p-1 border border-gray-2400 dark:border-gray-400 shadow-sm">
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="px-2 py-1 w-30 sm:w-64 md:w-72 text-sm bg-transparent outline-none"
                        placeholder={placeholder}
                        aria-label="Search input"
                    />
                    <button type="submit" className="px-2 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm">
                        Search
                    </button>
                    <button
                        type="button"
                        className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        onClick={() => setOpen(false)}
                        aria-label="Close search"
                    >
                        ✕
                    </button>
                </form>
            )}
        </div>
    )
}

export default SearchInput
