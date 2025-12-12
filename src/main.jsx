import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="bg-slate-900 text-red-500 p-8 min-h-screen font-mono">
                    <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
                    <div className="bg-black p-4 rounded border border-red-900 overflow-auto">
                        <p className="font-bold">{this.state.error && this.state.error.toString()}</p>
                        <pre className="text-xs mt-2 opacity-75 whitespace-pre-wrap">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </React.StrictMode>,
)

