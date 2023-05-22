import { atom } from "recoil";

export const modalAtomState = atom({
	key: "modalAtomState",
	default: false,
});

export const movieAtomsState = atom({
	key: "movieAtomState",
	default: null,
});
