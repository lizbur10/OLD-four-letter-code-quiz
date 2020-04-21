import React from 'react';
import { Modal } from 'semantic-ui-react';
import KeyHandler, { KEYPRESS } from 'react-key-handler';

const Congrats = ({open, onEnterPress}) => {
    const daBomb = ["Boomshaka!", "Woot!!", "Cha-ching!", "Whooga!", "Awesomesauce!", "Cool beans!", "Bejujular!", "Awesome socks!", "Spifftacular", "Grooveballs!", "The bomb.com!", "Shweet!", "Amazazing!", "Shmakalaking!","Bomb diggity!"]
    var wootWoot = daBomb[Math.floor(Math.random()*daBomb.length)];
return (
        <Modal open={open} centered={true}>
            <Modal.Content>
                <KeyHandler
                    keyEventName={KEYPRESS}
                    keyValue="Enter"
                    onKeyHandle={onEnterPress}
                />
                <h2>{wootWoot}</h2>
            </Modal.Content>
        </Modal>
    )
}

export default Congrats;