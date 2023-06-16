
const { Op } = require("sequelize");
const { User, UserContacts, Messages, Rooms } = require("../database/models/index");
const { randomString } = require("../utils/common");
const path = require("path")
const multer = require("multer");

const upload = multer(
    {
        dest: 'uploads/',
        filename: function (req, file, cb) {
            console.log("HeLlO")
        }
    }).single('image');

module.exports = {

    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },

    getUserContacts: async (req, res) => {
        try {
            const userId = req.params.userId;
            const search = req.query?.search;
            let contacts = [];
            let users = [];
            let requests = [];
            if (!search || search === 'undefined' || search.trim() === '') {
                contacts = await User.findOne({
                    where: { id: userId }, include: [
                        {
                            model: UserContacts,
                            as: "contacts",
                            attributes: ['status', 'request', 'room'],
                            include: [{
                                model: User,
                                as: "scontacts",
                                attributes: ['id', 'email', 'first_name', 'last_name', 'full_name']
                            },
                            {
                                model: Rooms,
                                as: "user_room",
                            }],
                        }
                    ]
                });
                contacts = contacts?.contacts || [];
                requests = await UserContacts.findAll({ where: { contactuserid: userId, request: 'sent' }, include: { model: User, as: "rcontacts", attributes: ['id', 'email', 'first_name', 'last_name'] } });
            } else {
                contacts = await UserContacts.findAll({ where: { userid: userId }, include: { model: User, as: "scontacts", attributes: ['id', 'email', 'first_name', 'last_name'] } });
                users = await User.findAll({ where: { id: { [Op.ne]: userId }, [Op.or]: [{ first_name: { [Op.like]: `%${search}%` } }, { last_name: { [Op.substring]: search } }] } });
                requests = await UserContacts.findAll({ where: { contactuserid: userId, request: 'sent' }, include: { model: User, as: "rcontacts", attributes: ['id', 'email', 'first_name', 'last_name'] } });
            }
            return res.status(200).send({ contacts, users, requests });
        } catch (error) {
            return res.status(500).send(error);
        }
    },

    createContactRequest: async (req, res) => {
        try {
            const from = req.body.from;
            const to = req.body.to;
            const room = await Rooms.create({ room: randomString(15) })
            const user = await UserContacts.create({ userid: from, contactuserid: to, room: room.id });
            return res.status(201).send(user);
        } catch (error) {
            return res.status(500).send({ error });
        }
    },

    cancelContactRequest: async (req, res) => {
        try {
            const requestedBy = req.body.requested_by;
            const requestedContact = req.body.requested_contact;
            const user = await UserContacts.destroy({ where: { userid: requestedBy, contactuserid: requestedContact } });
            return res.status(200).send(typeof user);
        } catch (error) {
            return res.status(500).send({ error });
        }
    },

    requestActions: async (req, res) => {
        try {
            const requestId = req.body.request_id;
            const action = req.body.action;
            const requestData = await UserContacts.findOne({ where: { id: requestId } });
            const update = await UserContacts.update({ request: action }, { where: { id: requestId } });
            if (action === 'accepted' && requestData) {
                await UserContacts.create({ userid: requestData?.contactuserid, contactuserid: requestData?.userid, request: "accepted", room: requestData.room });
            }
            return res.status(200).send(update);
        } catch (error) {
            return res.status(500).send({ error });
        }
    },

    getMessages: async (req, res) => {
        try {
            const roomId = req.params.room?.slice(0, -1);
            if (roomId) {
                const room = await Rooms.findOne({
                    where: { room: roomId },
                    include: [
                        {
                            model: UserContacts,
                            as: "room_contacts"
                        },
                        {
                            model: Messages,
                            as: "messages",
                            separate: true,
                            order: [['createdAt', "asc"]]
                        },
                    ],
                })
                return res.status(200).send({ messages: room?.messages });
            } else {
                return res.status(400).send({ error: 'The room is required' });
            }
        } catch (error) {
            return res.status(500).send({ error });
        }
    },

    profileUpload: async (req, res) => {
        // return res.status(200).send({ message: "File uploaded successfully" });
        try {
            upload(req, res, function (err) {

                if (err && err?.length > 0) {
                    console.log("ERROR", err);

                    // ERROR occurred (here it can be occurred due
                    // to uploading image of size greater than
                    // 1MB or uploading different file type)
                    res.status(400).send(err)
                }
                else {
                    const response = {
                        message: "Success, Image uploaded!",
                        files: req.files,
                        file: req.file,
                    }
                    // SUCCESS, image successfully uploaded
                    res.status(200).send(response)
                }
            })
        } catch (error) {
            res.send(error.message);
        }
    }
}