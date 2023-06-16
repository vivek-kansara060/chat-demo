const webSocket = require('ws');
const urlPattern = require('url-pattern');
const { Messages, Rooms, UserContacts } = require('../database/models/index');

class WebSocket {
    constructor (server) {
        this.server = server;
        webSocket.Server.prototype.shouldHandle = (req) => this.customShouldHandle(req);
        this.socket = new webSocket.Server({ server });
        this.connect();
    }

    customShouldHandle = (req) => {
        const pattern = new urlPattern("/ws/:room");
        const url = require('url').parse(req.url).pathname;
        const match = pattern?.match(url);

        if (!match) return false

        if (!req.params) req.params = {}

        req.params.room = match.room
        return true;
    }

    connections = new Map();

    connect = () => {
        this.socket.on("connection", (ws, req) => {
            this.room = req?.params?.room;
            this.connections.set(req?.params?.room, ws);

            ws.onerror = () => console.log("Something went wrong");

            ws.onclose = () => console.log('Client has disconnected!');

            ws.onmessage = async (event) => {
                const message = JSON.parse(event.data);
                const room = message?.room?.slice(0, -1);
                const senderId = message?.sender;
                // const rooms = await Rooms.findOne({ where: { room } });
                const rooms = await Rooms.findOne({
                    where: { room },
                    include: [
                        {
                            model: UserContacts,
                            as: "room_contacts"
                        },
                    ],
                })
                console.log("room :: ", room);
                console.log("Rooms :: ", rooms);
                if (rooms) {
                    const add = await Messages.create({ roomId: rooms.id, senderId, message: message?.message, type: 'message' });
                    console.log("Add :: ", add);
                    if (add) {
                        console.log("CONNECTION KEYS :: ", this.connections.keys());
                        const data = JSON.stringify({ event: 'new_message', message: add });
                        if (rooms?.room_contacts) {
                            rooms?.room_contacts?.forEach(element => {
                                console.log("Testing :: ", this.connections.get(room + element.userid));
                                this.connections.get(room + element.userid)?.send(data);
                            });
                        }
                    }
                }
            };
        });
    }
}

module.exports = WebSocket;