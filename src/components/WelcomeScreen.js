import React from 'react';

const WelcomeScreen = (props) => {
    const questions = [{
        questionText: "What birds should be included?", 
        questionName: "scope",
        questionOptions: [{
            optionVal: "appledore",
            optionLabel: "Appledore birds"
        }, {
            optionVal: "aba",
            optionLabel: "All birds on the ABA checklist"
        }]
    }, 
    {
        questionText: "What game mode would you like?", 
        questionName: "mode",
        questionOptions: [{
            optionVal: "nameToCode",
            optionLabel: "Common name => Four-letter code"
        }, {
            optionVal: "codeToName",
            optionLabel: "Four-letter code => Common name"
        }]
    }]

    const renderQuestions = () => {
        return questions.map(question => {
            return (
                <div key={question.questionName} className="ui card">
                    <div className="content">
                        <div className="header">{question.questionText}</div>
                    </div>
                    <div className="content">
                        <div className="ui form">
                            <div className="grouped fields">
                                {question.questionOptions.map(option => {
                                    return (
                                        <div key={option.optionVal} className="field">
                                            <div className="ui radio checkbox">
                                                <input 
                                                    type="radio" 
                                                    name={question.questionName} 
                                                    id={option.optionVal}
                                                    onChange={props.onChange}
                                                    defaultChecked={props[question.questionName]===option.optionVal} 
                                                />
                                                <label>{option.optionLabel}</label>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
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