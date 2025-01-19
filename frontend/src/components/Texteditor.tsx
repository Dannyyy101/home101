'use client'

import {useEffect, useState} from "react";
import {mdToHtmlConverter} from "@/utils/mdToHtmlConverter";

export const Texteditor = () => {
    const [htmlContent, setHtmlContent] = useState<string>("")
    const [mdContent, setMdContent] = useState<string>("")
    const [showMd, setShowMd] = useState<boolean>(true)

    useEffect(() => {
        if (!showMd)
            setHtmlContent(mdToHtmlConverter(mdContent))
    }, [showMd]);

    return (
        <section className="w-full h-full relative p-8 mt-2">
            {
                showMd ? <textarea
                        className="text-black focus:outline-none resize-none w-full h-full bg-blue-100 rounded-xl p-3"
                        value={mdContent}
                        onChange={(e) => setMdContent(e.target.value)}>
                </textarea> :
                    <div
                        className="text-black focus:outline-none resize-none w-full h-full bg-blue-100 rounded-xl p-3"
                        dangerouslySetInnerHTML={{__html: htmlContent}}>

                    </div>
            }

            <button onClick={() => setShowMd(!showMd)}>
                <span className="material-icons absolute top-0 right-4 text-black">{showMd ? "edit" : "menu_book"}</span>
            </button>
        </section>
    )
}