import { atom } from "jotai";

export const filterTypeAtom = atom<string[]>([]);

export const filterTagsAtom = atom<string[]>([]);

export const tagsAtom = atom<string[]>(["halu", "gws", "klarifikasi", "???", "explicit"]);

export const typesAtom = atom<string[]>(["static", "dynamic"]);
