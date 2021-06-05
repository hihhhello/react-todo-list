import "./_error-boundary.sass";
import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo,
        });
    }

    render() {
        const {error, errorInfo} = this.state;
        if(error && errorInfo) {
            return(
                <div className="error-message">
                    <div className="container">
                        <div className="error-message__wrapper">
                            <details>
                                <summary className="error-message__title">{error.toString()}</summary>
                                <br />
                                <div className="error-message__content>">{errorInfo.componentStack}</div>
                            </details>
                        </div>
                    </div>
                </div>
            )
        }
        return this.props.children;
    }
};

export default ErrorBoundary;