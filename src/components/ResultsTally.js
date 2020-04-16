import React from 'react';
import { Modal } from 'semantic-ui-react'

const ResultsTally = ({ gameOver, numQuestions, onModalClose }) => {
    return (
        <Modal open={gameOver.open} onClose={onModalClose}>
            <Modal.Header>Quiz Over!</Modal.Header>
            <Modal.Content>
                <h2>{gameOver.congrat} You got {gameOver.total} out of {numQuestions} correct!</h2>
            </Modal.Content>
        </Modal>    

    )

}

export default ResultsTally;