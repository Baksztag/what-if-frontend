import React from 'react';
export const WebSocketContext = React.createContext();

export const webSocketConsumer = (Component) => {
    return class WebSocketConsumer extends React.Component {
        render() {
            return (
                <WebSocketContext.Consumer>
                    {(value) => <Component {...value}/>}
                </WebSocketContext.Consumer>
            )
        }
    }
};

export const WebSocketProvider = WebSocketContext.Provider;
