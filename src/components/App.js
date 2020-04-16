import React from 'react';
import WelcomeScreen from './WelcomeScreen';
import { Icon, Modal, Table } from 'semantic-ui-react'

class App extends React.Component {

    state = {
        scope: "appledore",
        mode: "nameToCode",
        bird: {},
        userResponse: "",
        questionList: [],
        numQuestions: 2,
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
        this.setState({bird: "", questionList: [], gameOver: {total: total, congrat: congrat, open: true}}, () => console.log(this.state));
    }

    addResponses = () => {
        return this.state.questionList.map(bird => {
            let prompt, answer;
            const icon = bird.correct ? {name: "checkmark", color: 'green'} : {name: "x", color: 'red'}
            if (this.state.mode === "codeToName") {
                prompt = bird.four_letter_code;
                answer = bird.common_name;            
            } else {
                prompt = bird.common_name;
                answer = bird.four_letter_code;
            }
            return (
                <Table.Row key={bird.id}>
                <Table.Cell collapsing>
                  {prompt}
                </Table.Cell>
                <Table.Cell collapsing>{answer}</Table.Cell>
                <Table.Cell collapsing>
                    <Icon name={icon.name} size='large' color={icon.color} />
                </Table.Cell>
              </Table.Row>
            )
        })

    }

    onChange = (event) => this.setState({ [event.target.name]: event.target.id }, () => console.log(this.state))

    renderWelcomeScreen = () => {
        return (
            <WelcomeScreen 
                scope={this.state.scope} 
                mode={this.state.mode}
                launchQuestion={this.launchQuestion} 
                onChange={this.onChange}
            />
        )
    }

    render() {
        return (
            <div className="ui container">
            { !this.state.bird.common_name ? this.renderWelcomeScreen() : null }
                <Modal open={this.state.gameOver.open} onClose={() => this.setState({gameOver: {}})}>
                    <Modal.Header>Quiz Over!</Modal.Header>
                    <Modal.Content>
                        <h2>{this.state.gameOver.congrat} You got {this.state.gameOver.total} out of {this.state.numQuestions} correct!</h2>
                    </Modal.Content>
                </Modal>    

                {this.state.bird.common_name ? this.renderQuestion() : null }
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='3'>Results</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        { this.state.questionList.length > 0 ? this.addResponses() : null }
                    </Table.Body>
                </Table>
            </div>
        );
    }
};

export default App;