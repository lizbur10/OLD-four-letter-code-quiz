import React from 'react';

const WelcomeScreen = (props) => {
    const questions = [
        {
            questionText: "What birds should be included?", 
            questionId: "scope",
            questionOptions: [{
                optionVal: "appledore",
                optionLabel: "Appledore birds"
            },
            {
                optionVal: "aba",
                optionLabel: "All birds on the ABA checklist"
            }

            ]
        }, 
        {
            questionText: "What game mode would you like?", 
            questionId: "mode",
            questionOptions: [{
                optionVal: "nameToCode",
                optionLabel: "Common name => Four-letter code"
            },
            {
                optionVal: "codeToName",
                optionLabel: "Four-letter code => Common name"
            }

            ]
        }, 
    ]

    const renderQuestions = () => {
        return questions.map(question => {
            return (
                <React.Fragment>
                    <div className="ui card">
                    <div className="content">
                        <div className="header">{question.questionText}</div>
                    </div>
                    <div className="content">
                        <div className="ui form">
                            <div className="grouped fields">
                                {question.questionOptions.map(option => {
                                    return (
                                        <React.Fragment>
                                            <div className="field">
                                                <div className="ui radio checkbox">
                                                    <input 
                                                        type="radio" 
                                                        name={question.questionId} 
                                                        id={question.questionVal}
                                                        onChange={props.onScopeChange}
                                                        defaultChecked={props[question.questionId]===option.optionVal} 
                                                    />
                                                    <label>{option.optionLabel}</label>
                                                </div>
                                            </div>
                                        </React.Fragment>    
                                    )
                                })}
                            </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        })
    }

    return (
        <div>
            <div className="ui container">
                <h1>Welcome to the Appledore Island Migration Station<br />Four-letter Code Quiz</h1>
                <div className="ui segment">
                    {renderQuestions()}
                </div>
                <button onClick={props.launchQuestion}>START</button>
            </div>
        </div>
    )}

export default WelcomeScreen;