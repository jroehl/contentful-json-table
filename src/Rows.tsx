import tokens from '@contentful/forma-36-tokens';
import arrayMove from 'array-move';
import { css } from '@emotion/css';
import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import AddRow from './AddRow';
import { KeyValue } from './index';
import Row, { styles as rowStyles } from './Row';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@contentful/forma-36-react-components';

export const styles = {
  sortableHelper: css({
    width: '100%',
    border: `1px solid ${tokens.colorElementLight}`,
  }),
  table: css({
    marginBottom: tokens.spacingXs,
  }),
};

type OnChange = (values: KeyValue[]) => void;
export type OnInput = (index: number, value: KeyValue) => void;
export type OnRemove = (index: number) => void;
export type OnAdd = () => void;

interface SortableListProps {
  values: KeyValue[];
  onInput: OnInput;
  onRemove: OnRemove;
  onAdd: OnAdd;
}

const SortableList = SortableContainer(
  ({ values, onInput, onRemove, onAdd }: SortableListProps) => {
    return (
      <Table className={styles.table}>
        <TableHead isSticky>
          <TableRow className={rowStyles.row}>
            <TableCell className={rowStyles.firstLastCell} />
            <TableCell>Key</TableCell>
            <TableCell>Value</TableCell>
            <TableCell className={rowStyles.firstLastCell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((value, index) => (
            <SortableItem
              key={value.id}
              value={value}
              index={index}
              itemIndex={index}
              onInput={onInput}
              onRemove={onRemove}
            />
          ))}
          <AddRow onAdd={onAdd} />
        </TableBody>
      </Table>
    );
  }
);

interface SortableItemProps {
  itemIndex: number;
  onInput: OnInput;
  onRemove: OnRemove;
  value: KeyValue;
}

const SortableItem = SortableElement(
  ({ value, itemIndex, onInput, onRemove }: SortableItemProps) => {
    return <Row value={value} itemIndex={itemIndex} onInput={onInput} onRemove={onRemove} />;
  }
);

interface RowsProps {
  values: KeyValue[];
  onChange: OnChange;
}

const Rows = ({ values, onChange }: RowsProps) => {
  const onInput: OnInput = (index, value) => {
    const updatedValues = values.map((item, i) => (i === index ? value : item));
    onChange(updatedValues);
  };

  const onRemove: OnRemove = (index) => {
    const updatedValues = values.filter((_, i) => i !== index);
    onChange(updatedValues);
  };

  const onAdd: OnAdd = () => {
    const updatedValues = [...values, { key: '', value: '' }];
    onChange(updatedValues);
  };

  return (
    <SortableList
      helperClass={styles.sortableHelper}
      useDragHandle
      lockAxis="y"
      values={values}
      onInput={onInput}
      onAdd={onAdd}
      onRemove={onRemove}
      onSortEnd={({ oldIndex, newIndex }) => {
        const updatedValues = arrayMove(values, oldIndex, newIndex);
        onChange(updatedValues);
      }}
    />
  );
};

export default Rows;
