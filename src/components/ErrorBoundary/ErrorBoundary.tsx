import React, { ErrorInfo, ReactNode } from 'react';
import utils from 'utils';

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error boundary caught an error', error, errorInfo);
  }

  render() {
    utils.apiClient.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.setState({ hasError: true });
          throw error;
        }
      }
    );
    if (this.state.hasError) {
      // render fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
