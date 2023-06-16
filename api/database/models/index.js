const User = require("./User");
const UserContacts = require("./UserContacts");
const Messages = require("./Messages");
const Rooms = require("./Rooms");


User.hasMany(UserContacts, { foreignKey: 'userid', targetKey: 'id', as: "contacts" });
Rooms.hasMany(UserContacts, { foreignKey: 'room', targetKey: "id", as: 'room_contacts' });
Rooms.hasMany(Messages, { foreignKey: 'roomId', targetKey: "id", as: 'messages' });

UserContacts.belongsTo(User, { foreignKey: 'contactuserid', targetKey: 'id', as: "scontacts" });
UserContacts.belongsTo(User, { foreignKey: 'userid', targetKey: 'id', as: "rcontacts" });
UserContacts.belongsTo(Rooms, { foreignKey: 'room', targetKey: 'id', as: "user_room" });
// UserContacts.belongsToMany(Messages, { through: { model: Rooms }, as: "messages" });
Messages.belongsTo(Rooms, { as: "room", foreignKey: 'roomId' });

module.exports = {
    User,
    UserContacts,
    Messages,
    Rooms,
}