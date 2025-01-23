'use client'

import {useEffect, useRef, useState} from "react";
import {mdToHtmlConverter} from "@/utils/mdToHtmlConverter";

export const Texteditor = () => {
    const [htmlContent, setHtmlContent] = useState<string>("")
    const [mdContent, setMdContent] = useState<string>("")
    const [showMd, setShowMd] = useState<boolean>(true)
    const [showToolTipps, setShowToolTipps] = useState<{
        shown: boolean,
        position: { x: number, y: number }
    }>({shown: false, position: {x: -1, y: -1}})

    const toolTippsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!showMd)
            setHtmlContent(mdToHtmlConverter(mdContent))
    }, [showMd]);

    const handleTextSelection = (event: MouseEvent | KeyboardEvent) => {
        const selection = window.getSelection();
        const selectedText = selection?.toString().trim();

        if (selectedText) {
            let mouseX = 0;
            let mouseY = 0;

            if (event instanceof MouseEvent) {
                mouseX = event.clientX;
                mouseY = event.clientY;
            }

            setShowToolTipps({shown: true, position: {x: mouseX, y: mouseY}})
        } else {
            console.log("dawad")
            setShowToolTipps({shown: false, position: {x: -1, y: -1}})
        }
    };

    useEffect(() => {
        const handleMouseUp = (event: MouseEvent) => {
            handleTextSelection(event);
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            handleTextSelection(event);
        };

        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const handleSaveDocument = () => {

    }

    return (
        <section className="w-full h-full relative p-8 mt-2">
            {showToolTipps.shown &&
                <div ref={toolTippsRef} className="absolute bg-accent-300 px-2 rounded"
                     style={{top: showToolTipps.position.y - 120, left: showToolTipps.position.x}}>
                    <button>Deck</button>
                </div>}
            {showMd ?
                <textarea
                    className="text-text-900 focus:outline-none resize-none w-full h-full bg-primary-100 rounded-xl p-3"
                    value={mdContent}
                    onChange={(e) => setMdContent(e.target.value)}>
                </textarea>
                :
                <div
                    className="text-text-900 focus:outline-none resize-none w-full h-full bg-primary-100 rounded-xl p-3"
                    dangerouslySetInnerHTML={{__html: htmlContent}}>
                </div>
            }
            <button onClick={() => handleSaveDocument()}>
                 <span className="material-icons absolute top-0 right-10 text-black">
                    save
                 </span>
            </button>
            <button onClick={() => setShowMd(!showMd)}>
                <span className="material-icons absolute top-0 right-[70px] text-black">
                    {showMd ? "edit" : "menu_book"}
                </span>
            </button>


        </section>
    )
}