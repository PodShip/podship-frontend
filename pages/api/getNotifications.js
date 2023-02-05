// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const PushAPI = require("@pushprotocol/restapi");

const fetchNotifs = async () => {
    try {
        const notifications = await PushAPI.user.getFeeds({
            user: "eip155:42:0x80744e7DAaDb9E175B76f1651f564244b2F806D7", // user address in CAIP
            env: "staging",
        });
        return notifications;
    } catch (error) {
        console.log(error);
    }
};

export default async function handler(req, res) {
    const nots = await fetchNotifs();

    res.status(200).json(nots);
}
