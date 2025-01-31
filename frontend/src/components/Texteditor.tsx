'use client'

import {useEffect, useRef, useState} from "react";
import {mdToHtmlConverter} from "@/utils/mdToHtmlConverter";
import {Document} from "@/types/document";
import {createNewDocument, updateDocumentById} from "@/services/documentService";
import Cookies from "js-cookie";

export const Texteditor = ({doc, newDocument}: { doc: Document, newDocument: boolean }) => {

    const [htmlContent, setHtmlContent] = useState<string>("")
    const [mdContent, setMdContent] = useState<string>("")
    const [title, setTitle] = useState<string>("");
    const [showMd, setShowMd] = useState<boolean>(true)
    const [showToolTipps, setShowToolTipps] = useState<{
        shown: boolean,
        position: { x: number, y: number }
    }>({shown: false, position: {x: -1, y: -1}})

    useEffect(() => {
        setTitle(doc.title)
        setMdContent(doc.content)
    }, [doc]);

    const toolTippsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!showMd)
            setHtmlContent(mdToHtmlConverter(mdContent))
    }, [showMd, mdContent]);

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

    const handleSaveDocument = async () => {
        const token = Cookies.get("accessToken");
        if (token) {
            if (newDocument) {
                await createNewDocument(token, {
                    ...doc,
                    content: mdContent,
                    title: title,
                    created: new Date(),
                    updated: new Date()
                })
            } else {
                await updateDocumentById(token, String(doc.id), {...doc, content: mdContent, updated: new Date()})
            }
        }
    }

    return (
        <section className="w-full h-full relative p-8 mt-2">
            <section className="w-full h-12 flex justify-end">
                <div className="w-1/2 flex justify-start items-end">
                    {showMd ?
                        <input className="w-64 h-full bg-primary-100 rounded text-text-950 pl-2 mb-2 focus:outline-none"
                               value={title}
                               placeholder={"Titel"}
                               onChange={(e) => setTitle(e.target.value)}/>
                        : <div className="w-64 rouned text-text-950 pl-2" dangerouslySetInnerHTML={{__html: title}}></div>}
                </div>
                <div className="w-1/2 h-full flex justify-end items-end">
                    <button onClick={() => handleSaveDocument()} className="h-6 mb-2">
                 <span className="material-icons text-black">
                    save
                 </span>
                    </button>
                    <button onClick={() => setShowMd(!showMd)} className="h-6 mb-2">
                <span className="material-icons text-black">
                    {showMd ? "edit" : "menu_book"}
                </span>
                    </button>
                </div>
            </section>
            <section className="h-full w-full">
                {showToolTipps.shown &&
                    <div ref={toolTippsRef} className="absolute bg-accent-300 px-2 rounded"
                         style={{top: showToolTipps.position.y - 120, left: showToolTipps.position.x}}>
                        <button>Deck</button>
                    </div>}
                {showMd ?
                    <textarea
                        placeholder={"Text eingaben"}
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
            </section>
        </section>
    )
}