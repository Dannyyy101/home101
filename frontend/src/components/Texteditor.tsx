'use client'

import {useState} from "react";

export const Texteditor = () => {
    const [content, setContent] = useState<string>("\"Das ist nur ein Test von mir\"")

    return (
        <textarea className="w-full h-full p-4 text-black focus:outline-none resize-none" value={content}
                  onChange={(e) => setContent(e.target.value)}>
        </textarea>
    )
}