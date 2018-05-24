import React from 'react';
const lobbyChannelContext = React.createContext();

export const lobbyChannelConsumer = (Component) => {
    return class LobbyChannelConsumer extends React.Component {
        render() {
            return (
                <lobbyChannelConsumer.Consumer>
                    {(value) => <Component {...value}/>}
                </lobbyChannelConsumer.Consumer>
            )
        }
    }
};

export const lobbyChannelProvider = lobbyChannelContext.Provider;
