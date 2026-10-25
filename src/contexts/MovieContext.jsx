import { createContext, useState, useContext, useEffect } from 'react';
import Watchlist from '../pages/Watchlist';

const WatchListContext = createContext();

export function useWatchList() {
    const context = useContext(WatchListContext);
    if (!context) {
        throw new Error('useWatchList must be used within WatchListProvider');
    }
    return context;
};

export function WatchListProvider({ children }) {
    const [watchList, setWatchList] = useState(() => {
        try {
            const savedWatchlist = localStorage.getItem('watchlist');
            return savedWatchlist ? JSON.parse(savedWatchlist) : [];
        } catch (error) {
            console.error("Failed to parse watchlist from localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('watchlist', JSON.stringify(watchList));
        } catch (error) {
            console.error("Failed to save watchlist to localStorage:", error);
        }
    }, [watchList]);

    const addToWatchList = (movie) => {
        if (!watchList.some(m => m.id === movie.id)) {
            setWatchList(prev => [...prev, movie]);
        }
    };

    const removeFromWatchList = (movieId) => {
        setWatchList(prev => prev.filter(movie => movie.id !== movieId));
    };

    const isInWatchList = (movieId) => {
        return watchList.some(movie => movie.id === movieId);
    };

    const value = {
        watchList,
        addToWatchList,
        removeFromWatchList,
        isInWatchList
    };

    return (
        <WatchListContext.Provider value={value}>
            {children}
        </WatchListContext.Provider>
    );
};