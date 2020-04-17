import React from 'react';
import { Modal } from 'semantic-ui-react';
import ResponseTable from './ResponseTable';

const ResultsTally = ({ gameOver, numQuestions, onModalClose, questionList, mode }) => {
    return (
        <Modal open={gameOver.open} onClose={onModalClose}>
            <Modal.Header><h2>{gameOver.congrat} You got {gameOver.total} out of {numQuestions} correct!</h2></Modal.Header>
            <Modal.Content>
                <ResponseTable 
                    questionList={questionList}
                    mode={mode}
                />
            </Modal.Content>
        </Modal>    
    )

}

export default ResultsTally;