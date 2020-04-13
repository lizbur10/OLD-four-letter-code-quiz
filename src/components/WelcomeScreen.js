import React from 'react';

const WelcomeScreen = (props) => {
    return (
        <div>
            <div className="ui container">
                <h1>Welcome to the Appledore Island Migration Station<br />Four-letter Code Quiz</h1>
                {/* <h2>Ready to Play?</h2>
                <button onClick={props.onGoClick}>GO</button> */}
                {/* {this.state.bird.common_name ? this.renderQuestion() : null } */}
                <div className="ui segment">
                    <div className="ui card">
                        <div className="content">
                            <div className="header">What birds should be included?</div>
                        </div>
                        <div className="content">
                            <div className="ui form">
                                <div className="grouped fields">
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input type="radio" name="scope" />
                                            <label>Appledore birds</label>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input type="radio" name="scope" />
                                            <label>All birds on the ABA checklist</label>
                                        </div>
                                    </div>        
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ui card">
                        <div className="content">
                            <div className="header">What game mode would you like?</div>
                        </div>
                        <div className="content">
                            <div className="ui form">
                                <div className="grouped fields">
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input type="radio" name="mode" />
                                            <label>Common name => Four-letter code</label>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input type="radio" name="mode" />
                                            <label>Four-letter code => Common name</label>
                                        </div>
                                    </div>        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2>Ready to Play?</h2>
                <button onClick={props.onGoClick}>GO</button>
            </div>
        </div>
    )}

export default WelcomeScreen;