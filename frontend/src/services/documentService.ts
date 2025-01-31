import {Document} from "@/types/document";
import {Pageable} from "@/types/pageable";


export const getAllDocuments = async (token: string, params?: { searchQuery?: string }) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_SPRING_BOOT_URL}/docs`)
    if (params && params.searchQuery)
        url.searchParams.append("searchQuery", params?.searchQuery)

    const res = await fetch(url.toString(), {
        next: {revalidate: 3600},
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await res.json() as Pageable<Document>;
}

export const getDocumentById = async (token: string, documentId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_BOOT_URL}/docs/${documentId}`, {
        next: {revalidate: 3600},
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await res.json() as Document;
}

export const createNewDocument = async (token: string, document: Document) => {
    await fetch(`${process.env.NEXT_PUBLIC_SPRING_BOOT_URL}/docs`, {
        method: 'POST',
        next: {revalidate: 3600},
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(document)
    });
}

export const updateDocumentById = async (token: string, documentId: string, updatedData: Document) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_BOOT_URL}/docs/${documentId}`, {
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