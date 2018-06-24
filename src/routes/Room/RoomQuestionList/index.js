import React from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';

const RoomQuestionList = ({questions}) => (
    <ul className={c("room-question-list", {"empty": questions.length === 0})}>
        {
            questions.length === 0 ?
                (<span>
                    No questions added yet
                </span>)
                :
                questions.map((question, index) => (
                    <li key={question + index}
                        className="room-question"
                    >
                        <span>{question}</span>
                        <div>X</div>
                    </li>
                ))
        }
    </ul>

);

RoomQuestionList.propTypes = {
    questions: PropTypes.array.isRequired,
};
RoomQuestionList.defaultProps = {};

export default RoomQuestionList;
