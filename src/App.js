import React from 'react';
import { Container } from 'semantic-ui-react'
import io from 'socket.io-client';
import ChatInterface from './components/chatInterface';
import SignIn from './components/signIn';
import eventConst from './shared/eventConst';

const baseServerUrl = "http://localhost:5000";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: null,
      messages: [],
      usersOnline: [],
    };
  }
  state = {
      socket: null,
      user: null,
  }

  componentDidMount() {
    this.initSocket();
  }

  setUserProfile = (userProfile) => {
		this.state.socket.emit(eventConst.USER_CONNECTED, userProfile);
		this.setState({user:userProfile});
	}

  initSocket = () => {
      const socket = io(baseServerUrl);
      // Would have been better to store this stuff in a global store somewhere
      socket.on('connect', () => {
          this.setState({socket});
          socket.on(eventConst.MESSAGE_RECIEVED, (messages) => {
            console.log(messages);
            this.setState({messages});
          });
          socket.on(eventConst.CHAT, (messages) => {
              this.setState({messages});
          });
          socket.on(eventConst.USERS_ONLINE, (userNames) => {
            this.setState({usersOnline: userNames})
          })
      })
  }

  render() {
    return (
      <Container>
        {
          this.state.user
          ? <ChatInterface
              socket={this.state.socket}
              userProfile={this.state.user}
              messages={this.state.messages}
              usersOnline={this.state.usersOnline}
            />
          : <SignIn socket={this.state.socket} setUserProfile={this.setUserProfile} />
        }
      </Container>
    );
  }
}

export default App;
