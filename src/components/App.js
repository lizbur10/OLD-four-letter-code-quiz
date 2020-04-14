import React from 'react';
import WelcomeScreen from './WelcomeScreen';

class App extends React.Component {

    state = {
        scope: "",
        mode: "nameToCode",
        bird: {},
        userResponse: "",
        questionList: [],
        numQuestions: 10
    }

    onGoClick = () => {
        let url;
        this.state.scope==="appledore" ? url="http://localhost:3000/birds/appledore/random" : url="http://localhost:3000/birds/random"
        fetch(url)
        .then(resp => resp.json())
        .then(bird => {
            if (this.state.questionList.find(question => question.id === bird.id)) {
                this.onGoClick();
            } else {
                this.setState({bird: bird});
                document.querySelector("#answer").focus();    
            }
        })
    }

    onChangeHandler = (event) => {
        this.setState({userResponse: event.target.value})
    }

    giveAnswer = (bird) => {
        const answer = this.state.mode === "nameToCode" ? bird.four_letter_code : bird.common_name
        alert("The correct answer is " + answer);
        bird.correct = false;
        this.setState({questionList: [...this.state.questionList, bird]}, () => this.checkContinue());

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
            bird.correct = true
            this.setState({userResponse: "", questionList: [...this.state.questionList, bird] }, () => this.checkContinue());
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
        return this.state.questionList.map(bird => {
            let prompt, answer;
            if (this.state.mode === "codeToName") {
                prompt = bird.four_letter_code;
                answer = bird.common_name;            
            } else {
                prompt = bird.common_name;
                answer = bird.four_letter_code;
            }
            return (
                <div key={bird.id} className="ui horizontal segments">
                    <div className="ui segment">{prompt}</div>
                    <div className="ui segment">{answer}</div>
                    <div className="ui segment">{bird.correct ? "Correct" : "Incorrect"}</div>
                </div>
            )
        })

    }

    onScopeChange = (event) => {
        console.log(event.target.id);
        this.setState({
            scope: event.target.id
        })
    }

    render() {
        return (
            <div className="ui container">
                <WelcomeScreen 
                    scope={this.state.scope} 
                    mode={this.state.mode}
                    onGoClick={this.onGoClick} 
                    onScopeChange={this.onScopeChange}
                />
                    {this.state.bird.common_name ? this.renderQuestion() : null }
                <div className="ui container">
                    { this.state.questionList.length > 0 ? this.addResponses() : null }
                </div>
            </div>
        );
    }
};

export default App;