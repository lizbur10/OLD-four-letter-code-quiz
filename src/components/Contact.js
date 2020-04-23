import React from 'react';
import { Modal, Checkbox, Form, Input, Button, TextArea } from 'semantic-ui-react';


class Contact extends React.Component {
        state = {
            email: "",
            comment: "",
            firstChecked: false,
            secondChecked: false
        }
        onFormSubmit = (event) => {
            event.preventDefault();
            console.log(this.state);
        }

        render() {
            return (
            <Modal open={this.props.open}>
                <Modal.Content>
                    <Modal.Header className="ui container">
                        <h2>Contact the developer:</h2>
                    </Modal.Header>
                    <Form onSubmit={(e) => this.onFormSubmit(e)} size="huge">
                        <Form.Field required>
                            <label>Your Email:</label>
                            <Input 
                                focus 
                                placeholder='Email' 
                                value={this.state.email}
                                onChange={(event) => this.setState({email: event.target.value})}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Comment:</label>
                            <TextArea 
                                value={this.state.comment}
                                onChange={(event) => this.setState({comment: event.target.value})}
                            />
                        </Form.Field>
                        {/* <Form.Field style={{display: "none"}}> */}
                        <Form.Field>
                            <Checkbox
                                label='Add me to the mailing list'
                                value='this'
                                checked={this.state.firstChecked}
                                onChange={() => this.setState({firstChecked: !this.state.firstChecked})}
                            />
                        </Form.Field>
                        {/* <Form.Field style={{display: "none"}}> */}
                        <Form.Field>
                            <Checkbox
                                label="I'm interested in volunteering"
                                value='that'
                                checked={this.state.secondChecked}
                                onChange={() => this.setState({secondChecked: !this.state.secondChecked})}
                            />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default Contact;