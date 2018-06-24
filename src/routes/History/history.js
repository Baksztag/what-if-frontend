import React, {Component} from 'react';
import PropTypes from 'prop-types';

import HistoryError from './HistoryError';
import HistoryList from './HistoryList';
import HistoryLoader from './HistoryLoader';

class History extends Component {
    render() {
        const {error, games, loading} = this.props;

        return (
            <div className="history-container">
                {loading ?
                    (<HistoryLoader/>)
                    :
                    (error.length === 0 ?
                            (<HistoryList games={games}/>)
                            :
                            (<HistoryError error={error}/>)
                    )
                }
            </div>
        );
    }
}

History.propTypes = {
    error: PropTypes.string.isRequired,
    games: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};
History.defaultProps = {};

export default History;
