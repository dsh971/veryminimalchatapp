const { createUserObject, createMessageObject, } = require('./data-template');

function dataStore() {
    this.messages = [];

    this.userProfiles = {};

    this.isUserExist = (userName = "") => {
        return Object.keys(this.userProfiles).includes(userName);
    };

    this.removeUser = (userName = "") => {
        if (userName in Object.keys(this.userProfiles)) {
            delete this.userProfiles[userName];
        }
        return this.userProfiles;
    };

    this.addUser = (userName = "", socketId="") => {
        const userObject = createUserObject({userName, socketId});
        this.userProfiles[userName] = userObject;
        return userObject;
    };

    this.loadChatMessages = () => {
        return this.messages;
    }

    this.addMessage = (userName, message) => {
        const messageObj = createMessageObject({sender: userName, message});
        if (this.messages.length >= 20) {
            this.messages.shift();
        }
        this.messages.push(messageObj);
        return this.messages;
    }
};





module.exports = {
    dataStore,
}
