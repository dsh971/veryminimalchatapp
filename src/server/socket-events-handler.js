const io = require('./index.js').io;
const eventConst =  require('../shared/eventConst');
const dataStore = require('./data-store').dataStore;

// Doing this because there isn't enough time to build out a database layer
const store = new dataStore();

module.exports = function (socket) {
    console.log("Socket Id: " + socket.id);

	socket.on(eventConst.CHECK_USER, (userName, callback)=>{
		if(store.isUserExist(userName)){
			callback({ isUserExist:true, userProfile:null });
		}else{
			const userProfile = store.addUser(userName, socket.id);
			callback({ isUserExist:false, userProfile});
		}
	});

	socket.on(eventConst.USER_CONNECTED, (userProfile)=>{
		socket.user = userProfile
		io.emit(eventConst.USER_CONNECTED, userProfile)
	});

	socket.on(eventConst.USERS_ONLINE, () => {
		const userNames = Object.keys(store.userProfiles);
		io.emit(eventConst.USERS_ONLINE, userNames)
	});

	socket.on('disconnect', ()=>{
		if("user" in socket){
			const userProfiles = store.removeUser(socket.user.name)
			io.emit(eventConst.USER_DISCONNECTED, userProfiles)
		}
	});

	socket.on(eventConst.CHAT, ()=>{
		const messages = store.loadChatMessages();
		io.emit(eventConst.CHAT, messages)
	});

	socket.on(eventConst.MESSAGE_SENT, (userName, message)=>{
		const messages = store.addMessage(userName, message);
		io.emit(eventConst.MESSAGE_RECIEVED, messages);
	});
};
