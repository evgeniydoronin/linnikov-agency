import { deleteAsync } from "del";
import struct from "../structure.js";

export const cleanAll = () => {
	return deleteAsync(struct.build.path);
}
export const cleanImg = () => {
	return deleteAsync(struct.build.img.path);
}