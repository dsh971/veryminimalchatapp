const uuidv4 = require('uuid/v4')

exports.createUserObject = ({userName="", socketId=""} = {}) => ({
    id: uuidv4(),
    userName,
    socketId,
    created_at: new Date()
});

exports.createMessageObject = ({sender="", type="txt", message=""} = {}) => ({
    id: uuidv4(),
    type,
    sender,
    message,
    created_at: new Date()
});
