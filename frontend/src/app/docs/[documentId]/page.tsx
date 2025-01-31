'use client'

import {useParams, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {getDocumentById} from "@/services/documentService";
import Cookies from "js-cookie";
import {Document} from "@/types/document";
import {Texteditor} from "@/components/Texteditor";

export default function Page() {
    const [document, setDocument] = useState<Document | null>(null)

    const params = useParams<{ documentId: string }>()
    const searchParams = useSearchParams(); // Verwende useSearchParams
    const newDoc: boolean = Boolean(searchParams.get('newDoc'));

    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (token) {
            if (newDoc) {
                setDocument({content: "", title: "", updated: new Date(), created: new Date(), id: params.documentId})
            } else {
                getDocumentById(token, params.documentId).then((doc: Document) => {
                    setDocument(doc);
                })
            }
        }
    }, [params]);

    return (
        <main className="w-screen flex items-center flex-col h-[90%]">
            {document &&
                <Texteditor doc={document} newDocument={newDoc}/>
            }
        </main>
    )
}
