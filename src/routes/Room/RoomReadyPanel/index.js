import React from 'react';
import PropTypes from 'prop-types';

import {Button} from '../../../components';

const RoomReadyPanel = ({error, onReady, readyButtonDisabled}) => (
    <div className="room-ready-panel">
        {error === 'no_questions_added' ?
            (<div>You can't be marked as ready when there are no questions</div>)
            :
            (<div>{error}</div>)
        }
        <Button onClick={onReady}
                disabled={readyButtonDisabled}
        >
            Ready!
        </Button>
    </div>
);

RoomReadyPanel.propTypes = {
    error: PropTypes.string.isRequired,
    onReady: PropTypes.func.isRequired,
    readyButtonDisabled: PropTypes.bool.isRequired,
};
RoomReadyPanel.defaultProps = {};

export default RoomReadyPanel;
