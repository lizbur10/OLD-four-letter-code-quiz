import React from 'react';
import { Modal } from 'semantic-ui-react';

const QuizQuestion = ({ bird, mode, userResponse, onAnswerSubmit, onChangeHandler, giveAnswer, open }) => {
    const prompt = mode === "codeToName" ? bird.four_letter_code : bird.common_name
    return (
        <Modal open={open}>
            <Modal.Content>
                <form onSubmit={(event) => onAnswerSubmit(bird, event)}>
                    <div className="ui horizontal segments">
                        <div className="ui segment"><h2>{prompt}:</h2></div>
                        <div className="ui segment">
                            <h2><input type="text" id="answer" value={userResponse} onChange={onChangeHandler} autoFocus/></h2>
                        </div>
                        <button type="button" onClick={event => giveAnswer(bird,event)}><h3>Tell me</h3></button>
                    </div>
                </form>
            </Modal.Content>
        </Modal>
    )
}

export default QuizQuestion;