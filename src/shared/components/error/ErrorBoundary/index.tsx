import { Component, type PropsWithChildren, type ReactNode } from "react";

interface IProps extends PropsWithChildren {
  renderOnError?: (props: { error?: any }) => ReactNode;
}

export class ErrorBoundary extends Component<IProps> {
  state: { hasError: boolean; error?: any };

  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state?.hasError) {
      if (this.props.renderOnError) {
        return this.props.renderOnError({ error: this?.state?.error });
      }
      return null;
    }
    return this.props?.children;
  }
}
