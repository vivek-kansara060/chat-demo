const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const { LoginController } = require('../controllers');
const moment = require('moment');
const { getAllUsers, createContactRequest, getUserContacts, cancelContactRequest, requestActions, getMessages, profileUpload } = require('../controllers/UserController');
const { User } = require('../database/models');

router.post('/login', LoginController.login);

router.all('/*', async (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1];
    if (!token || token === 'undefined') return res.status(401).send({ error: "Unauthorized" });
    let decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded) return res.status(401).send({ error: "Unauthorized" });

    const user = await User.findOne({ where: { email: decoded.email, token: token } });

    if (!user) return res.status(401).send({ error: "Unauthorized" });

    if (moment(user.token_expired_on).local().isBefore(moment().local())) return res.status(401).send({ error: "Token exprired" });

    next();
});

router.get('/users', getAllUsers);
router.get('/user/:userId/contacts', getUserContacts);
router.post('/create-contact', createContactRequest);
router.post('/cancel-request', cancelContactRequest);
router.post('/request-action', requestActions);
router.get('/get-messages/:room', getMessages);
router.post('/file/upload', profileUpload);







module.exports = router;