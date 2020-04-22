import React from 'react';
import WelcomeScreen from './WelcomeScreen';
import QuizQuestion from './QuizQuestion';
import ResponseTable from './ResponseTable';
import ResultsTally from './ResultsTally';
import RightWrong from './RightWrong';

class App extends React.Component {

    state = {
        display: "welcome",
        settings: {
            scope: "appledore",
            mode: "nameToCode",
            numQuestions: 5    
        },
        correct: null,
        answer: null,
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
        this.setState({display: "question"})
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
        bird.correct = false;
        this.setState({display: "rightWrong", answer: answer, questionList: [...this.state.questionList, bird]});

    }

    checkContinue = () => {
        this.state.questionList.length < this.state.settings.numQuestions ? this.launchQuestion() : this.endGame();
    }

    onAnswerSubmit = (bird, event) => {
        event.preventDefault();
        if (this.checkCorrect(bird)) {
            bird.correct = true
            this.setState({correct: true, display: "rightWrong", bird: {}, userResponse: "", questionList: [...this.state.questionList, bird] });
        } else {
            
            this.setState({correct: false, display: "rightWrong", userResponse: ""});
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
        this.setState({bird: "", display: "over", gameOver: {total: total, congrat: congrat, open: true}});
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
        this.setState({ display: "welcome", gameOver: {}, questionList: []})
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

    onRightWrongModalClose = () => {
        if (this.state.correct) {
            this.setState({correct: null}, () => this.checkContinue())
        } else if (this.state.answer) {
            this.setState({correct: null, answer: null}, () => this.checkContinue())
        } else {
            this.setState({correct: null, display: "question"})
        }
    }

    renderRightWrong = () => {
        return (
            <RightWrong open={true} correct={this.state.correct} answer={this.state.answer} onEnterPress={this.onRightWrongModalClose} />
        )
    }

    render() {
        return (
            <div className="ui container">
                { this.state.display === "welcome" ? this.renderWelcomeScreen() : null }
                { this.state.display === "question" ? this.renderQuestion() : null }
                { this.state.display === "rightWrong" ? this.renderRightWrong () : null }
                { this.state.display === "over" ? this.renderQuizResults() : null }
            </div>
        );
    }
};

export default App;