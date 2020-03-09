import React from 'react';
import { render } from 'react-dom';
import { init, FieldExtensionSDK } from 'contentful-ui-extensions-sdk';

import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

import Rows from './Rows';

interface AppProps {
  sdk: FieldExtensionSDK;
}

export interface KeyValue {
  id?: string;
  key: string;
  value: string;
}

interface AppState {
  values: KeyValue[];
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      values: this.enrichValues(props.sdk.field.getValue())
    };
  }

  detachExternalChangeHandler: Function | null = null;

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  enrichValues(values?: KeyValue[]): KeyValue[] {
    const enriched = (values || []).map((value, i) => ({
      ...value,
      id: value.id || this.genId(i)
    }));
    return enriched;
  }

  genId(i: number) {
    const { locale } = this.props.sdk.field;
    return `item_${i}_${locale}_${new Date().getTime()}`;
  }

  onExternalChange = (values: KeyValue[]) => {
    this.setState({ values: this.enrichValues(values) });
  };

  onChange = async (values: KeyValue[]) => {
    this.setState({ values: this.enrichValues(values) }, async () => {
      await this.props.sdk.field.setValue(values);
    });
  };

  render = () => {
    return (
      <div className="root">
        <Rows values={this.state.values} onChange={this.onChange} />
      </div>
    );
  };
}

init(sdk => {
  render(<App sdk={sdk as FieldExtensionSDK} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
