import { StickerLine, StickerTelegram } from "./types";
export declare function stickerTelegram(query: string, page?: number): Promise<StickerTelegram[]>;
export declare function stickerLine(query: string): Promise<StickerLine[]>;
