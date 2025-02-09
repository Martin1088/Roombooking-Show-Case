import { writable } from 'svelte/store';
import todayJson from './today.json';

export const user = writable('TestUser');
export const users = writable(['TestUser', 'AnotherUser']);
export const cert = writable('');
export const responseMrbs = writable<MrbsResponse>([]);
export const dataStatus = writable('');
export const info = writable('');
export const loading = writable(false);
export const weekData = writable<WeekResponse>([]);

export const isAdmin = writable(false);
export const firstAvailibaleEntry = writable('');
export const lastAvailibaleEntry = writable('');

export const wookingDays = [
    { name: "Mon", num: 1 },
    { name: "Tue", num: 2 },
    { name: "Wed", num: 3 },
    { name: "Thu", num: 4 },
    { name: "Fri", num: 5 },
]

export type Participants = {
    id: number;
    username: string;
};

export type Room = {
    id: number;
    room_name: string;
    description: string;
    capacity: number;
    entry_id: number | null;
    registration_limit: number;
    participants: Participants[];
};

export type Area = {
    id: number;
    area_name: string;
    rooms: Room[];
}
export type MrbsResponse = Area[];

export type WeekData = {
    date: string;
    weekday: string;
    areas: Area[];
};

export type WeekResponse = WeekData[];
