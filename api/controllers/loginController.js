const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginValidation = require('../validations/login');
const { convertErrors } = require('../utils/common');
const moment = require('moment');
const User = require('../database/models/User');


class LoginController {
    static login = async (req, res) => {
        try {
            const validate = await loginValidation.validate(req.body);
            if (validate.error) return res.status(400).send(convertErrors(validate.error.details));

            const body = req.body;
            const user = await User.findOne({ where: { email: body.email } });
            if (!user) return res.status(400).send({ email: "Email not found" });

            const verify = await bcrypt.compare(body.password, user.password);
            if (!verify) return res.status(400).send({ password: 'Invalid Password' });

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET);
            await User.update({ token, token_expired_on: moment().add(60, 'm').local() }, { where: { email: user.email } });
            return res.status(201).send({ token: token, user: user });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
}

module.exports = LoginController;