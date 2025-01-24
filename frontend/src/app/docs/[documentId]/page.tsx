'use client'

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {getDocumentById} from "@/services/documentService";
import Cookies from "js-cookie";
import {Document} from "@/types/document";
import {Texteditor} from "@/components/Texteditor";

export default function Page() {
    const [document, setDocument] = useState<Document | null>(null)
    const params = useParams<{ documentId: string }>()

    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (token) {
            getDocumentById(token, params.documentId).then((doc: Document) => {
                setDocument(doc);
            })
        }
    }, []);

    return (
        <main className="w-screen">
            {document &&
                <Texteditor doc={document}/>
            }
        </main>
    )
}