import React from 'react';
import WelcomeScreen from './WelcomeScreen';

class App extends React.Component {

    state = {
        mode: "nameToCode",
        bird: {},
        userResponse: "",
        questionList: [],
        numQuestions: 10
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
        this.setState({questionList: [...this.state.questionList, {bird: bird, correct: false}]}, () => this.checkContinue());

    }

    checkContinue = () => {
        this.state.questionList.length < this.state.numQuestions ? this.onGoClick() : this.endGame();
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
        const daBomb = ["Boomshaka!", "Woot!!", "Cha-ching!", "Whooga!", "Awesomesauce!", "Cool beans!", "Bejujular!", "Awesome socks!", "Spifftacular", "Grooveballs!", "The bomb.com!", "Shweet!", "Amazazing!", "Shmakalaking!","Bomb diggity!"]
        var wootWoot = daBomb[Math.floor(Math.random()*daBomb.length)];
        if (this.checkCorrect(bird)) {
            alert(wootWoot);
            this.setState({userResponse: "", questionList: [...this.state.questionList, {bird: bird, correct: true}] }, () => this.checkContinue());
        } else {
            alert("No soap - try again")
            this.setState({userResponse: ""});
        }
    }

    checkCorrect = (bird) => {
        const {userResponse, mode} = this.state;
        const correctAnswer = mode === "nameToCode" ? bird.four_letter_code : bird.common_name
        return userResponse.toLowerCase() === correctAnswer.toLowerCase() ||
            userResponse.toLowerCase().replace("'", "") === correctAnswer.toLowerCase().replace("'", "") ||
            userResponse.toLowerCase().replace("-", " ") === correctAnswer.toLowerCase().replace("-", " ") ||
            userResponse.toLowerCase().replace("'", "").replace("-", " ") === correctAnswer.toLowerCase().replace("'", "").replace("-", " ") 
    }

    endGame = () => {
        const total = this.state.questionList.reduce((memo, currentVal) => {
            
            return currentVal.correct ? memo + 1 : memo
        },0)
        this.setState({bird: "", questionList: []});

        alert(`You got ${(total/this.state.questionList.length)*100}% correct`);
    }

    addResponses = () => {
        return this.state.questionList.map(question => {
            let prompt, answer;
            if (this.state.mode === "codeToName") {
                prompt = question.bird.four_letter_code;
                answer = question.bird.common_name;            
            } else {
                prompt = question.bird.common_name;
                answer = question.bird.four_letter_code;
            }
            return (
                <div key={question.bird.id} className="ui horizontal segments">
                    <div className="ui segment">{prompt}</div>
                    <div className="ui segment">{answer}</div>
                    <div className="ui segment">{question.correct ? "Correct" : "Incorrect"}</div>
                </div>
            )
        })

    }

    render() {
        return (
            <WelcomeScreen onClick={this.onGoClick}/>
            // <React.Fragment>
            //     <div className="ui container">
            //         <h1>Welcome to the Appledore Island Migration Station<br />Four-letter Code Quiz</h1>
            //         <h2>Ready to Play?</h2>
            //         <button onClick={this.onGoClick}>GO</button>
            //         {this.state.bird.common_name ? this.renderQuestion() : null }
            //     </div>
            //     <div className="ui container">
            //         { this.state.questionList.length > 0 ? this.addResponses() : null }
            //     </div>
            // </React.Fragment>
        );
    }
};

export default App;