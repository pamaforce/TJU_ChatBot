import { service } from "../utils/request";

export function search(data) {
    return service({
        url: `/search`,
        method: "POST",
        data,
    });
}

export function getConversation(cid) {
    return service({
        url: `/conversation/${cid}`,
        method: "GET",
    });
}