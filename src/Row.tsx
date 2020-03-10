import React from 'react';
import {
  TableRow,
  TableCell,
  TextInput,
  IconButton,
  CardDragHandle
} from '@contentful/forma-36-react-components';
import { css } from 'emotion';
import tokens from '@contentful/forma-36-tokens';
import { SortableHandle } from 'react-sortable-hoc';

import { KeyValue } from './index';
import { OnRemove, OnInput } from './Rows';

interface RowProps {
  itemIndex: number;
  value: KeyValue;
  onRemove: OnRemove;
  onInput: OnInput;
}

export const styles = {
  row: css({
    transform: 'scale(1)',
    width: '100%',
    backgroundColor: tokens.colorWhite,
    position: 'relative',
    '& > td, & > th': {
      verticalAlign: 'middle'
    }
  }),
  firstLastCell: css({
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0
  }),
  inputCell: css({
    width: '50%'
  }),
  dragHandler: css({
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%'
  })
};

export const DragHandler = SortableHandle(() => (
  <CardDragHandle className={styles.dragHandler}>Handler</CardDragHandle>
));

const Row = ({ itemIndex, value, onInput, onRemove }: RowProps) => {
  return (
    <TableRow testId={`row_${itemIndex}`} className={styles.row}>
      <TableCell className={styles.firstLastCell}>
        <DragHandler />
      </TableCell>
      <TableCell className={styles.inputCell}>
        <TextInput
          value={value.key}
          disabled={!onInput}
          onChange={({ target }) =>
            onInput(itemIndex, {
              ...value,
              key: target.value
            })
          }
        />
      </TableCell>
      <TableCell className={styles.inputCell}>
        <TextInput
          value={value.value}
          disabled={!onInput}
          onChange={({ target }) =>
            onInput(itemIndex, {
              ...value,
              value: target.value
            })
          }
        />
      </TableCell>
      <TableCell className={styles.firstLastCell}>
        <IconButton
          testId={`row_remove_${itemIndex}`}
          buttonType="muted"
          iconProps={{ icon: 'DeleteTrimmed' }}
          label="Remove row"
          onClick={() => onRemove(itemIndex)}
        />
      </TableCell>
    </TableRow>
  );
};

export default Row;
