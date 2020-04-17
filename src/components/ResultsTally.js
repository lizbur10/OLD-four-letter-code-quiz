import React from 'react';
import { Modal } from 'semantic-ui-react';
import ResponseTable from './ResponseTable';

const ResultsTally = ({ gameOver, numQuestions, onModalClose, questionList, mode }) => {
    return (
        <Modal open={gameOver.open} onClose={onModalClose}>
            <Modal.Header>Quiz Over!</Modal.Header>
            <Modal.Content>
                <h2>{gameOver.congrat} You got {gameOver.total} out of {numQuestions} correct!</h2>
                <ResponseTable 
                    questionList={questionList}
                    mode={mode}
                />
            </Modal.Content>
        </Modal>    

    )

}

export default ResultsTally;