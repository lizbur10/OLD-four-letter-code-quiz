import React from 'react';

const QuizQuestion = ({ bird, mode, userResponse, onAnswerSubmit, onChangeHandler, giveAnswer }) => {
    const prompt = mode === "codeToName" ? bird.four_letter_code : bird.common_name
    return (
        <form onSubmit={(event) => onAnswerSubmit(bird, event)}>
            <div className="ui horizontal segments">
                <div className="ui segment">{prompt}</div>
                <div className="ui segment">
                    <input type="text" id="answer" value={userResponse} onChange={onChangeHandler} />
                </div>
                <button type="button" onClick={event => giveAnswer(bird,event)}>Tell me</button>
            </div>
        </form>
    )
}

export default QuizQuestion;