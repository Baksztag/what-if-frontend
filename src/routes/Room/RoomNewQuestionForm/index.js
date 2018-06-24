import React from 'react';
import PropTypes from 'prop-types';

import {Button, Input} from '../../../components';

const RoomNewQuestionForm = ({newQuestion, onNewQuestionChange, onNewQuestionSubmit}) => (
    <div className="room-new-question-form">
        <Input type="text"
               value={newQuestion}
               onChange={onNewQuestionChange}
               label="New question"
        />
        <Button onClick={onNewQuestionSubmit}>
            Add question
        </Button>
    </div>
);

RoomNewQuestionForm.propTypes = {
    newQuestion: PropTypes.string.isRequired,
    onNewQuestionChange: PropTypes.func.isRequired,
    onNewQuestionSubmit: PropTypes.func.isRequired,
};
RoomNewQuestionForm.defaultProps = {};

export default RoomNewQuestionForm;
