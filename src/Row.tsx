import CardDragHandle from '@contentful/forma-36-react-components/dist/components/Card/CardDragHandle/CardDragHandle';
import IconButton from '@contentful/forma-36-react-components/dist/components/IconButton/IconButton';
import TableCell from '@contentful/forma-36-react-components/dist/components/Table/TableCell/TableCell';
import TableRow from '@contentful/forma-36-react-components/dist/components/Table/TableRow/TableRow';
import TextInput from '@contentful/forma-36-react-components/dist/components/TextInput/TextInput';
import tokens from '@contentful/forma-36-tokens';
import { css } from 'emotion';
import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import { KeyValue } from './index';
import { OnInput, OnRemove } from './Rows';

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
