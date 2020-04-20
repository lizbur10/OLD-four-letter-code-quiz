import React from 'react';
import WelcomeScreen from './WelcomeScreen';
import QuizQuestion from './QuizQuestion';
import ResponseTable from './ResponseTable';
import ResultsTally from './ResultsTally';

class App extends React.Component {

    state = {
        settings: {
            scope: "appledore",
            mode: "nameToCode",
            numQuestions: 5    
        },
        bird: {},
        userResponse: "",
        questionList: [],
        gameOver: {}
    }


  componentDidUpdate(prevProps, prevState) {
      if (document.querySelector("#answer")) {
        document.querySelector("#answer").focus();
      }
  }

    launchQuestion = () => {
        let url;
        this.state.settings.scope==="appledore" ? url="http://localhost:3000/birds/appledore/random" : url="http://localhost:3000/birds/random"
        fetch(url)
        .then(resp => resp.json())
        .then(bird => {
            if (this.state.questionList.find(question => question.id === bird.id)) {
                this.launchQuestion();
            } else {
                this.setState({bird: bird});
            }
        })
    }

    onChangeHandler = (event) => {
        this.setState({userResponse: event.target.value})
    }

    giveAnswer = (bird) => {
        const answer = this.state.settings.mode === "nameToCode" ? bird.four_letter_code : bird.common_name
        alert("The correct answer is " + answer);
        bird.correct = false;
        this.setState({questionList: [...this.state.questionList, bird]}, () => this.checkContinue());

    }

    checkContinue = () => {
        this.state.questionList.length < this.state.settings.numQuestions ? this.launchQuestion() : this.endGame();
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
        const {userResponse} = this.state;
        const correctAnswer = this.state.settings.mode === "nameToCode" ? bird.four_letter_code : bird.common_name
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
        this.setState({bird: "", gameOver: {total: total, congrat: congrat, open: true}});
    }

    renderResponseTable = () => {
        return (
            <ResponseTable 
                questionList={this.state.questionList}
                mode={this.state.settings.mode}
            />
        )
    }

    onOptionChange = (event) => this.setState({ settings: {...this.state.settings, [event.target.name]: event.target.id }})

    renderWelcomeScreen = () => {
        console.log(this.state)
        return (
            <WelcomeScreen 
                scope={this.state.settings.scope} 
                mode={this.state.settings.mode}
                launchQuestion={this.launchQuestion} 
                onChange={this.onOptionChange}
                open={true}
            />
        )
    }

    renderQuestion = () => {
        return (
            <QuizQuestion 
                bird={this.state.bird}
                mode={this.state.settings.mode}
                userResponse={this.state.userResponse}
                onAnswerSubmit={this.onAnswerSubmit}
                onChangeHandler={this.onChangeHandler}
                giveAnswer={this.giveAnswer}
                open={true}
            />
        )
    }

    onResultsModalClose = () => {
        this.setState({ gameOver: {}, questionList: []})
    }

    renderQuizResults = () => {
        return (
            <ResultsTally
                gameOver={this.state.gameOver}
                numQuestions={this.state.settings.numQuestions}
                onModalClose={this.onResultsModalClose}
                questionList={this.state.questionList}
                mode={this.state.settings.mode}
            />
        )
    }

    render() {
        return (
            <div className="ui container">
                { !this.state.bird.common_name ? this.renderWelcomeScreen() : null }
                { this.state.bird.common_name ? this.renderQuestion() : null }
                { this.state.gameOver.open ? this.renderQuizResults() : null }
            </div>
        );
    }
};

export default App;