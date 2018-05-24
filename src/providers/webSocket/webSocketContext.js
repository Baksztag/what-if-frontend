import React from 'react';
const webSocketContext = React.createContext();

export const webSocketConsumer = (Component) => {
    return class WebSocketConsumer extends React.Component {
        render() {
            return (
                <webSocketContext.Consumer>
                    {(value) => <Component {...value}
                                           {...this.props}/>}
                </webSocketContext.Consumer>
            )
        }
    }
};

export const WebSocketProvider = webSocketContext.Provider;
