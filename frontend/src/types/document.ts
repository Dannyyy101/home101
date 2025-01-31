import {Folder} from "@/types/folder";

export interface Document{
    id?:string
    title:string
    content:string;
    created:Date
    updated:Date
}