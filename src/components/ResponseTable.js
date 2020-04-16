import React from 'react';
import { Icon, Table } from 'semantic-ui-react'

const ResponseTable = ({ questionList, mode }) => {
    const renderRows = () => {
        return questionList.map(bird => {
            let prompt, answer;
            const icon = bird.correct ? {name: "checkmark", color: 'green'} : {name: "x", color: 'red'}
            if (mode === "codeToName") {
                prompt = bird.four_letter_code;
                answer = bird.common_name;            
            } else {
                prompt = bird.common_name;
                answer = bird.four_letter_code;
            }
            return (
                <Table.Row key={bird.id}>
                    <Table.Cell collapsing>{prompt}</Table.Cell>
                    <Table.Cell collapsing>{answer}</Table.Cell>
                    <Table.Cell collapsing>
                        <Icon name={icon.name} size='large' color={icon.color} />
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='3'>Results</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {renderRows()}
            </Table.Body>
        </Table>
    )
}

export default ResponseTable;