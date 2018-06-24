import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getGames} from '../../actions';

import History from './history';

class HistoryProvider extends Component {
    componentDidMount() {
        this.props.fetchGames();
    }

    render() {
        const {error, games, isFetching} = this.props;

        return (
            <History error={error}
                     games={games}
                     loading={isFetching}
            />
        );
    }
}

function mapStateToProps({history}) {
    return {
        error: history.error,
        games: history.games,
        isFetching: history.isFetching,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchGames: () => dispatch(getGames()),
    };
}

HistoryProvider.propTypes = {};
HistoryProvider.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryProvider);
