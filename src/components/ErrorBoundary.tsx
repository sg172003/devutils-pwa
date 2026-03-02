import { Component, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, message: '' };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, message: error.message };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    gap: 12,
                }}>
                    <h2>Something went wrong</h2>
                    <p style={{ fontSize: 14 }}>{this.state.message}</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => this.setState({ hasError: false, message: '' })}
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}