import React from 'react';

const GameOptions = (props) => {
    return (
        // <div className="ui segment">
        <div className="ui card">
            <div className="content">
                <div className="header">{props.question}</div>
            </div>
            <div className="content">
                <div className="ui form">
                    <div className="grouped fields">
                        {props.choices.map(choice => {
                            return (
                                <div className="field">
                                    <div className="ui radio checkbox">
                                        <input type="radio" name={props.questionName} />
                                        <label>{choice}</label>
                                    </div>
                                </div>
        
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameOptions;