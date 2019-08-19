import React from 'react';
import { Button, Comment, Form, Header, Dropdown } from 'semantic-ui-react'
import eventConst from '../shared/eventConst';
import MyDropZone from './dropzone';

export default class ChatInterface extends React.Component {
    state = {
        userList: [],
        chatMessage: "",
    };

    componentDidMount() {
        this.initChatInterface();
    }

    initChatInterface = () => {
        this.props.socket.emit(eventConst.CHAT);
        this.props.socket.emit(eventConst.USERS_ONLINE);
    }

    logOut = () => {
        const { socket } = this.props;
        socket.emit(eventConst.LOGOUT);
        this.setState({user: null});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.socket.emit(eventConst.MESSAGE_SENT, this.props.userProfile.userName, "txt", this.state.chatMessage);
        this.setState({chatMessage: ""})
    }

    handleChange = (e) => {
        this.setState({chatMessage: e.target.value});
    }

    displayChatMessages = () => (
        this.props.messages.map((message) => (
            message.type === 'txt'
            ? <Comment key={message.id}>
                <Comment.Avatar src='https://react.semantic-ui.com/images/wireframe/square-image.png' />
                <Comment.Content>
                    <Comment.Author as='a'>{message.sender}</Comment.Author>
                    <Comment.Metadata>
                        <div>{message.created_at}</div>
                    </Comment.Metadata>
                    <Comment.Text>{message.message}</Comment.Text>
                </Comment.Content>
            </Comment>
            : <Comment key={message.id}>
            <Comment.Avatar src='https://react.semantic-ui.com/images/wireframe/square-image.png' />
            <Comment.Content>
                <Comment.Author as='a'>{message.sender}</Comment.Author>
                <Comment.Metadata>
                    <div>{message.created_at}</div>
                </Comment.Metadata>
                <img src={message.message} />
            </Comment.Content>
        </Comment>
        ))
    )

    render() {
        return (
            <Comment.Group>
                <Header as='h1' dividing>
                    Welcome to this random chat room.
                </Header>
                <div>
                {
                    <Dropdown text={`# of users online:  ${this.props.usersOnline.length}`}>
                        <Dropdown.Menu>
                        {
                            this.props.usersOnline.map((userName, idx) => (
                                <Dropdown.Item key={idx} text={userName} />
                            ))
                        }
                        </Dropdown.Menu>
                    </Dropdown>
                }
                </div>

                {
                    this.props.messages.length === 0
                    ? <p style={{'margin': '5rem 0' }}> There are no messages at this moment </p>
                    : this.displayChatMessages()
                }
                <Form reply onSubmit={this.handleSubmit}>
                    <Form.TextArea
                        name="chat-message"
                        value={this.state.chatMessage}
                        onChange={this.handleChange}
                    />
                    <Button content='sent' type="submit" labelPosition='left' icon='edit' primary />
                </Form>

                <div>
                    <MyDropZone
                        socket={this.props.socket}
                        userName={this.props.userProfile.userName}
                    />
                </div>
            </Comment.Group>
        );
    }
};
