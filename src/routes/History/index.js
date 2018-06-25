import React, {Component} from 'react';
import {connect} from 'react-redux';

import {displayGameDetails, getGames, hideGameDetails} from '../../actions';

import History from './history';

class HistoryProvider extends Component {
    componentDidMount() {
        this.props.fetchGames();
    }

    render() {
        const {displayDetails, error, games, hideDetails, history, id, isFetching} = this.props;

        return (
            <History displayDetails={displayDetails}
                     error={error}
                     games={games}
                     hideDetails={hideDetails}
                     id={id}
                     loading={isFetching}
                     pushRoute={history.push}
            />
        );
    }
}

function mapStateToProps({history}) {
    return {
        error: history.error,
        games: history.games,
        isFetching: history.isFetching,
        id: history.gameDetails.id,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        displayDetails: (gameId) => dispatch(displayGameDetails(gameId)),
        fetchGames: () => dispatch(getGames()),
        hideDetails: (gameId) => dispatch(hideGameDetails(gameId)),
    };
}

HistoryProvider.propTypes = {};
HistoryProvider.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryProvider);
