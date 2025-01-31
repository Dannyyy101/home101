'use client'

import {useEffect, useState} from "react";
import {Document} from "@/types/document";
import Cookies from "js-cookie";
import {createNewDocument, getAllDocuments} from "@/services/documentService";
import {Pageable} from "@/types/pageable";
import {useRouter} from "next/navigation";
import {ObjectId} from "bson";
import {mdToHtmlConverter} from "@/utils/mdToHtmlConverter";
import Link from "next/link";

export default function Page() {
    const [documents, setDocuments] = useState<Document[] | null>(null)
    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get("accessToken");

        if (token) {
            getAllDocuments(token).then((page: Pageable<Document>) => {
                setDocuments(page.content);
            })
        }
    }, []);

    const handleCreateNewDocument = async () => {
        const newMongoDbId = new ObjectId();
        router.push(`/docs/${newMongoDbId}?newDoc=true`)
    }

    return (
        <main className="w-full flex justify-center relative">
            <button
                onClick={() => handleCreateNewDocument()}
                className="absolute top-10 right-10 flex justify-center items-center border bg-primary-500 rounded-full w-10 h-10">
            <span className="material-icons text-text-50">
                add
            </span>
            </button>
            <section className="w-10/12 flex mt-4 justify-center flex-wrap">
                {documents && documents.length > 0 && documents.map((doc, index) =>
                    <Link href={`/docs/${doc.id}`} key={index} className="flex flex-col w-52 h-72 p-4 m-4 bg-accent-600">
                        <div className="text-text-50" dangerouslySetInnerHTML={{__html: mdToHtmlConverter(doc.title)}}></div>
                        <div className="break-all" dangerouslySetInnerHTML={{__html: mdToHtmlConverter(doc.content)}}></div>
                    </Link>
                )}
            </section>
        </main>
    )
}