/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';
import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk';
import { App } from './index';
import { render, fireEvent, cleanup, configure } from '@testing-library/react';

configure({
  testIdAttribute: 'data-test-id'
});

function renderComponent(sdk: FieldExtensionSDK) {
  return render(<App sdk={sdk} />);
}

const sdk: any = {
  field: {
    getValue: jest.fn(),
    onValueChanged: jest.fn(),
    setValue: jest.fn(),
    locale: 'en-US'
  },
  window: {
    startAutoResizer: jest.fn()
  }
};

declare var global: any;

describe('App', () => {
  beforeEach(() => {
    global.Date.now = jest.fn(() => 123456789);
    jest.resetAllMocks();
  });

  afterEach(cleanup);

  it('should call startAutoResizer', () => {
    renderComponent(sdk);
    expect(sdk.window.startAutoResizer).toHaveBeenCalled();
  });

  it('should create a table with the correct rows', () => {
    sdk.field.getValue.mockImplementation(() => [
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' }
    ]);
    const { getByTestId } = renderComponent(sdk);

    expect(sdk.field.getValue).toHaveBeenCalled();
    expect(sdk.field.onValueChanged).toHaveBeenCalled();
    const inputs1 = getByTestId('row_0').getElementsByTagName('input');
    const keyInput1 = inputs1.item(0);
    expect((keyInput1 as HTMLInputElement).value).toEqual('key1');
    const valueInput1 = inputs1.item(1);
    expect((valueInput1 as HTMLInputElement).value).toEqual('value1');

    const inputs2 = getByTestId('row_1').getElementsByTagName('input');
    const keyInput2 = inputs2.item(0);
    expect((keyInput2 as HTMLInputElement).value).toEqual('key2');
    const valueInput2 = inputs2.item(1);
    expect((valueInput2 as HTMLInputElement).value).toEqual('value2');
  });

  it('should add row on click', () => {
    const { getByTestId } = renderComponent(sdk);

    fireEvent.click(getByTestId('add_row'));

    expect(sdk.field.setValue).toHaveBeenCalledWith([{ key: '', value: '' }]);
    expect(sdk.field.setValue).toHaveBeenCalledTimes(1);
  });

  it('should input key and value for a specific row', () => {
    sdk.field.getValue.mockImplementation(() => [{ key: 'key1', value: 'value1' }]);
    const { getByTestId } = renderComponent(sdk);

    const inputs1 = getByTestId('row_0').getElementsByTagName('input');
    const keyInput1 = inputs1.item(0);
    fireEvent.change(keyInput1 as HTMLInputElement, {
      target: { value: 'newKey' }
    });
    const valueInput1 = inputs1.item(1);
    fireEvent.change(valueInput1 as HTMLInputElement, {
      target: { value: 'newValue' }
    });
    expect(sdk.field.setValue).toHaveBeenNthCalledWith(1, [
      { key: 'newKey', value: 'value1', id: 'item_0_en-US_undefined' }
    ]);
    expect(sdk.field.setValue).toHaveBeenNthCalledWith(2, [
      { key: 'newKey', value: 'newValue', id: 'item_0_en-US_undefined' }
    ]);

    expect(sdk.field.setValue).toHaveBeenCalledTimes(2);
  });
});
