import React from 'react';
import { Modal, Icon } from 'semantic-ui-react';
import KeyHandler, { KEYPRESS } from 'react-key-handler';

const RightWrong = ({open, correct, answer, onEnterPress}) => {
    const gotIt = ["Boomshaka!", "Woot!!", "Cha-ching!", "Whooga!", "Awesomesauce!", "Cool beans!", "Bejujular!!", "Awesome socks!!", "Spifftacular!", "Grooveballs!", "The bomb.com!", "Shweet!", "Amazazing!", "Shmakalaking!","Bomb diggity!"]
    const icon = correct ? {name: "checkmark", color: 'green'} : {name: "x", color: 'red'}
    let wootWoot
    if (correct) {
        wootWoot = gotIt[Math.floor(Math.random()*gotIt.length)];
    } else if (answer) {
        wootWoot = "The correct answer is " + answer;
    } else {
        wootWoot = "No soap - try again";
    }
return (
        <Modal open={open} centered={true} size="mini">
            <Modal.Content>
                <KeyHandler
                    keyEventName={KEYPRESS}
                    keyValue="Enter"
                    onKeyHandle={onEnterPress}
                />
                <h2 style={{textAlign: "center"}}><Icon name={icon.name} size='large' color={icon.color} />{wootWoot}</h2>
            </Modal.Content>
        </Modal>
    )
}

export default RightWrong;