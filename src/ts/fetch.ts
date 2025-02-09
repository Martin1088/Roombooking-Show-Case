import { loading, responseMrbs, user, info, weekData, cert, users, type MrbsResponse, type WeekResponse } from "./store";
import dayjs from "dayjs";
import { invoke } from "@tauri-apps/api/core";
import { get } from "svelte/store";


export function getName(username: string) {
    return username.includes('@') ? username.split('@')[0] : username;
}

export function getNameBeam(username: string) {
    return username.includes('.') ? username.split('.')[0] : username;
}

export async function getUser() {
    invoke('get_user')
        .then((res) => {
            if (typeof res == 'string') {
                user.set(res.replace(/-/g, ' '))
            }
        }
        )
        .catch((e) => info.set(e));
}

export async function getOverviewday(inputdate: Date | null) {
    loading.set(true);
    if (inputdate == null) {
        await invoke<MrbsResponse>('get_overviewday', { queryDay: null })
            .then((res) => { responseMrbs.set(res); loading.set(false); })
            .catch((e) => { info.set(e); loading.set(false); });
    } else {
        let rfc3339Date: string | null = inputdate.toISOString();
        await invoke<MrbsResponse>('get_overviewday', { queryDay: rfc3339Date })
            .then((res) => { responseMrbs.set(res); loading.set(false); })
            .catch((e) => { info.set(e); loading.set(false); });
    }
}
export async function getOverviewweek(inputdate: Date | null) {
    loading.set(true);
    if (inputdate == null) {
        await invoke<WeekResponse>('get_overviewweek', { queryDay: null })
            .then((res) => { weekData.set(res); loading.set(false); })
            .catch((e) => { info.set(e); loading.set(false); });
    } else {
        let rfc3339Date: string | null = inputdate.toISOString();
        await invoke<WeekResponse>('get_overviewweek', { queryDay: rfc3339Date })
            .then((res) => { weekData.set(res); loading.set(false); })
            .catch((e) => { info.set(e); loading.set(false); });
    }
}

export async function deleteJoin(id: number, date: Date, week: boolean) {
    loading.set(true);
    await invoke<string>('delete_participant', { entryId: id })
        .then((res) => info.set(res))
        .catch((e) => info.set(e));
    if (week) {
        getOverviewweek(date);
        loading.set(false);
    } else {
        getOverviewday(date);
        loading.set(false);
    }
}

export async function setJoin(roomId: number | null, entryId: number | null, date: Date, week: boolean, other_user: String | null) {
    let rfc3339Date = date.toISOString();
    //let entryId: number | null = null;
    //const areas = get(responseMrbs);
    //for (const area of areas) {
    //    const room = area.rooms.find(r => r.id === roomId);
    //    if (room) {
    //        entryId = room.entry_id;
    //    }
    //}
    loading.set(true);
    await invoke<string>('post_joinroom', { entryId: entryId, roomId: roomId, date: rfc3339Date, name: other_user })
        .then((res) => info.set(res))
        .catch((e) => info.set(e));

    if (week) {
        getOverviewweek(date);
        loading.set(false);
    } else {
        getOverviewday(date);
        loading.set(false);
    }
}

export async function setJoins(id: number, weekdays, repeat_weeks: number) {
    loading.set(true);
    let isoVec = [];

    for (let i = 7; i < (7 * repeat_weeks) + 1; i += 7) {
        for (let val of weekdays) {
            console.log(val);
            isoVec.push(dayjs().day(val + i).toISOString());
        }
    }

    let d = { days: isoVec };
    console.log(isoVec);
    await invoke<WeekResponse>('post_joinrooms', { roomId: id, payload: isoVec })
        .then((res) => { weekData.set(res); loading.set(false); })
        .catch((e) => { info.set(e); loading.set(false); });
}

export async function getAvailableUser() {
    await invoke('get_users')
        .then((res) => {
            console.log(res);
            users.set(res)
        }
        )
        .catch((e) => info.set(e));
}

