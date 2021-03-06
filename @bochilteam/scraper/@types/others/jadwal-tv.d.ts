import { JadwalTV, JadwalTVNOW } from "./types";
declare type ListJadwalTV = {
    value: string;
    channel: string;
    isPay: boolean;
}[];
export declare const listJadwalTV: ListJadwalTV;
export default function jadwalTV(channel: string): Promise<JadwalTV>;
export declare function jadwalTVNow(): Promise<JadwalTVNOW>;
export {};
