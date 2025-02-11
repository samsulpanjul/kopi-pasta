import { atom } from "jotai";

export const filterTypeAtom = atom<string[]>([]);

export const filterTagsAtom = atom<string[]>([]);

export const tagsAtom = atom<string[]>(["halu", "gws", "klarifikasi", "???", "nsfw"]);

export const typesAtom = atom<string[]>(["dynamic", "static"]);
