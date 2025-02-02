'use client'
import React, { useState, useEffect, useRef } from "react";
import { getAllDocuments } from "@/services/documentService";
import Cookies from "js-cookie";
import Link from "next/link";

export const GlobalSearchField = () => {
    const [isInputVisible, setInputVisible] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchResult, setSearchResult] = useState<{ result: string, path: string }[]>([]);
    const [lastPressedKey, setLastPressedKey] = useState<{ shift: boolean; time: number }>({ shift: false, time: 0 });
    const inputRef = useRef<HTMLInputElement>(null);

    // Handle Shift key press to toggle input visibility
    useEffect(() => {
        const handleShiftClick = (event: KeyboardEvent) => {
            if (event.key === "Shift") {
                const currentTime = new Date().getTime();
                const differenceInMilliseconds = currentTime - lastPressedKey.time;
                const differenceInSeconds = differenceInMilliseconds / 1000;

                if (lastPressedKey.shift && differenceInSeconds <= 0.3) {
                    setInputVisible((prev) => !prev); // Toggle visibility
                    setLastPressedKey({ shift: false, time: currentTime });
                } else {
                    setLastPressedKey({ shift: true, time: currentTime });
                }
            }
        };

        window.addEventListener("keydown", handleShiftClick);

        return () => {
            window.removeEventListener("keydown", handleShiftClick);
        };
    }, [lastPressedKey]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setInputVisible(false);
            }
        };

        if (isInputVisible) {
            window.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isInputVisible]);

    const handleSearch = async (value: string) => {
        setSearchValue(value);
        setSearchResult([]);
        const token = Cookies.get("accessToken");
        if (token && value.length > 0) {
            const result = await getAllDocuments(token, { searchQuery: value });
            const formattedResult = result.content.map((e) => ({ result: e.title, path: `docs/${e.id}` }));
            setSearchResult(formattedResult);
        }
    };

    return (
        <>
            {isInputVisible && (
                <section
                    ref={inputRef}
                    className="shadow-xl z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-fit rounded-lg bg-white flex flex-col items-center pb-2"
                >
                    <input
                        value={searchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="text-text-900 w-full font-medium h-12 px-4 tb-2 focus:outline-none rounded-t-lg"
                        placeholder="Search..."
                        autoFocus
                    />
                    <div className="w-full px-4 flex flex-col">
                        {searchResult.map((result, index) => (
                            <Link href={`/${result.path}`} className="w-full text-text-900" key={index}>
                                {result.result}
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
};