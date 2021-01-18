const { body } = require("express-validator/check")

exports.validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                body('Username', 'Username doesnot exist').exists(),
                body('email', 'Invalid Email').isEmail().exists(),
                body('phone').optional().isInt()
            ]
        }
    }
}
