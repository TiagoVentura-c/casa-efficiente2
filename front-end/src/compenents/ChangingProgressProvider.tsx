import React, { Component, ReactNode } from "react";

interface ChangingProgressProviderProps {
  interval?: number;
  values: any[];
  children: (value: any) => ReactNode;
}

interface ChangingProgressProviderState {
  valuesIndex: number;
}

class ChangingProgressProvider extends Component<
  ChangingProgressProviderProps,
  ChangingProgressProviderState
> {
  static defaultProps = {
    interval: 1000
  };

  state = {
    valuesIndex: 0
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(prevState => ({
        valuesIndex: (prevState.valuesIndex + 1) % this.props.values.length
      }));
    }, this.props.interval);
  }

  render() {
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

export default ChangingProgressProvider;
