import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react'
import eventConst from '../shared/eventConst';

export default class SignIn extends React.PureComponent {
    state = { name: "", error: false, errorMessage: "" };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.socket.emit(
            eventConst.CHECK_USER,
            this.state.name,
            this.loginSubmissionCallBack);
    }

    loginSubmissionCallBack = ({isUserExist, userProfile}) => (
        isUserExist
        ? this.setState({error : true, errorMessage: "name already exist"})
        : this.setState(
            () => ({ error: false, errorMessage: "" }),
            () => this.props.setUserProfile(userProfile)
        )
    );

    handleInput = (e) => {
        this.setState({name: e.target.value});
    }

    render(){
        return (
            <>
                <h1 style={{'margin': '10rem 0'}}>Welcome to a random chat room</h1>
                <Form className={this.state.error && "ui error form"} onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label for="name">Before you enter, give yourself a name:</label>
                        <input placeholder='Name' value={this.state.name} type="text" id="name" name="name" onChange={this.handleInput}/>
                    </Form.Field>
                    <Message
                        error
                        header='Action Forbidden'
                        content={this.state.errorMessage}
                    />
                    <Button type='submit'>Submit</Button>
                </Form>
            </>
        )
    }
}
