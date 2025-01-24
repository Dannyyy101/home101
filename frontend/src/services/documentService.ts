import {Document} from "@/types/document";

export const getAllDocuments = async (token: string) => {
    const res = await fetch('https://', {
        next: {revalidate: 3600},
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await res.json() as Document;
}

export const getDocumentById = async (token: string, documentId:string) => {
    const res = await fetch(`https://localhost/docs/${documentId}`, {
        next: {revalidate: 3600},
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await res.json() as Document;
}