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
    const res = await fetch(`https://87.106.207.129/api/docs/${documentId}`, {
        next: {revalidate: 3600},
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await res.json() as Document;
}

export const updateDocumentById = async (token: string, documentId: string, updatedData: Document) => {
    const res = await fetch(`https://87.106.207.129/api/docs/${documentId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    });

    if (!res.ok) {
        throw new Error(`Failed to update document: ${res.statusText}`);
    }

    return await res.json() as Document;
};