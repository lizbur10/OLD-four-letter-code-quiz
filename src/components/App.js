import React from 'react';
import { Modal } from 'semantic-ui-react'
import WelcomeScreen from './WelcomeScreen';
import QuizQuestion from './QuizQuestion';
import ResponseTable from './ResponseTable';

class App extends React.Component {

    state = {
        scope: "appledore",
        mode: "nameToCode",
        bird: {},
        userResponse: "",
        questionList: [],
        numQuestions: 5,
        gameOver: {}
    }

    launchQuestion = () => {
        let url;
        this.state.scope==="appledore" ? url="http://localhost:3000/birds/appledore/random" : url="http://localhost:3000/birds/random"
        fetch(url)
        .then(resp => resp.json())
        .then(bird => {
            if (this.state.questionList.find(question => question.id === bird.id)) {
                this.launchQuestion();
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
        this.state.questionList.length < this.state.numQuestions ? this.launchQuestion() : this.endGame();
    }

    onAnswerSubmit = (bird, event) => {
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
        let congrat;
        if (total > 8) {
            congrat = "You rule!"
        } else if (total > 6) {
            congrat = "Nice going!"
        } else if (total > 4) {
            congrat = "You're making progress!"
        } else {
            congrat = "Keep practicing:"
        }
        this.setState({bird: "", questionList: [], gameOver: {total: total, congrat: congrat, open: true}});
    }

    renderResponseTable = () => {
        return (
            <ResponseTable 
                questionList={this.state.questionList}
                mode={this.state.mode}
            />
        )
    }

    onOptionChange = (event) => this.setState({ [event.target.name]: event.target.id })

    renderWelcomeScreen = () => {
        return (
            <WelcomeScreen 
                scope={this.state.scope} 
                mode={this.state.mode}
                launchQuestion={this.launchQuestion} 
                onChange={this.onOptionChange}
            />
        )
    }

    renderQuestion = () => {
        return (
            <QuizQuestion 
                bird={this.state.bird}
                mode={this.state.mode}
                userResponse={this.state.userResponse}
                onAnswerSubmit={this.onAnswerSubmit}
                onChangeHandler={this.onChangeHandler}
                giveAnswer={this.giveAnswer}
            />
        )

    }

    render() {
        return (
            <div className="ui container">
            { !this.state.bird.common_name ? this.renderWelcomeScreen() : null }
            { this.state.bird.common_name ? this.renderQuestion() : null }
            { this.state.questionList.length > 0 ? this.renderResponseTable() : null }

                <Modal open={this.state.gameOver.open} onClose={() => this.setState({gameOver: {}})}>
                    <Modal.Header>Quiz Over!</Modal.Header>
                    <Modal.Content>
                        <h2>{this.state.gameOver.congrat} You got {this.state.gameOver.total} out of {this.state.numQuestions} correct!</h2>
                    </Modal.Content>
                </Modal>    

            </div>
        );
    }
};

export default App;