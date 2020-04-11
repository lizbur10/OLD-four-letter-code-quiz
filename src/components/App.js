import React from 'react';
// import GameOptions from './GameOptions';

class App extends React.Component {

    state = {
        mode: "codeToName",
        bird: {},
        userResponse: "",
        score: 0
        // gameOptions: [
        //     {
        //         questionName: "scope",
        //         question: "What birds should be included?",
        //         choices: ["Appledore birds", "All birds on the ABA checklist"]
        //     },
        //     {
        //         questionName: "mode",
        //         question: "What game mode would you like?",
        //         choices: ["Common name => Four-letter code", "Four-letter code => Common name"]
        //     }
        // ]
    }

    onGoClick = () => {
        fetch("http://localhost:3000/birds/appledore/random")
        .then(resp => resp.json())
        .then(bird => {
            this.setState({bird: bird});
            document.querySelector("#answer").focus();
        })
    }

    onChangeHandler = (event) => {
        this.setState({userResponse: event.target.value})
    }

    giveAnswer = (bird) => {
        const answer = this.state.mode === "nameToCode" ? bird.four_letter_code : bird.common_name
        alert("The correct answer is " + answer);
        this.onGoClick();
    }


    renderQuestion = () => {
        const bird=this.state.bird;
        const prompt = this.state.mode === "codeToName" ? bird.four_letter_code : bird.common_name
        return (
            <form onSubmit={(event) => this.onSubmit(bird, event)}>
                <div className="ui horizontal segments">
                    <div className="ui segment">{prompt}</div>
                    <div className="ui segment">
                        <input type="text" id="answer" value={this.state.userResponse} onChange={this.onChangeHandler} />
                    </div>
                    <button type="button" onClick={event => this.giveAnswer(bird,event)}>Tell me</button>
                </div>
            </form>
        )

    }

    onSubmit = (bird, event) => {
        event.preventDefault();
        const daBomb = ["Boomshaka!", "Woot!!", "Cha-ching!", "Whooga!", "Awesomesauce!", "Cool beans!", "Bejujular!", "Awesome socks!", "Spifftacular", "Grooveballs!", "The bomb.com!", "Looking fly!", "Off the meter!", "Shweet!", "Amazazing!", "Shmakalaking!","Bomb diggity!"]
        var wootWoot = daBomb[Math.floor(Math.random()*daBomb.length)];
        const correctAnswer = this.state.mode === "nameToCode" ? bird.four_letter_code : bird.common_name
        if (this.state.userResponse.toLowerCase() === correctAnswer.toLowerCase()) {
            alert(wootWoot);
            this.setState({userResponse: ""});
            this.onGoClick();
        } else {
            alert("No soap - try again")
            this.setState({userResponse: ""});
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="ui container">
                    <h1>Welcome to the Appledore Island Migration Station<br />Four-letter Code Quiz</h1>
                    <h2>Ready to Play?</h2>
                    <button onClick={this.onGoClick}>GO</button>
                    {this.state.bird.common_name ? this.renderQuestion() : null }
                </div>
            </React.Fragment>
        );
            // <div className="ui container" style={{marginTop: '10px'}}>
            //     {this.state.gameOptions.map(option => {
            //         return <GameOptions 
            //             questionName={option.questionName} 
            //             question={option.question} 
            //             choices={option.choices}
            //         />
            //     })}
                
            // </div>
        // );    
    }
};

export default App;