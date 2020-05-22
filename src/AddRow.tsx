import IconButton from '@contentful/forma-36-react-components/dist/components/IconButton/IconButton';
import TableCell from '@contentful/forma-36-react-components/dist/components/Table/TableCell/TableCell';
import TableRow from '@contentful/forma-36-react-components/dist/components/Table/TableRow/TableRow';
import TextInput from '@contentful/forma-36-react-components/dist/components/TextInput/TextInput';
import { css } from 'emotion';
import React from 'react';
import AddRowOverlay from './AddRowOverlay';
import { DragHandler, styles as rowStyles } from './Row';
import { OnAdd } from './Rows';

interface RowProps {
  onAdd: OnAdd;
}

export const styles = {
  mutedRow: css({
    '& > td': {
      opacity: 0.25
    }
  })
};

const Row = ({ onAdd }: RowProps) => {
  return (
    <TableRow className={`${rowStyles.row} ${styles.mutedRow}`}>
      <TableCell className={rowStyles.firstLastCell}>
        <DragHandler />
      </TableCell>
      <TableCell className={rowStyles.inputCell}>
        <TextInput disabled />
      </TableCell>
      <TableCell className={rowStyles.inputCell}>
        <TextInput disabled />
      </TableCell>
      <TableCell className={rowStyles.firstLastCell}>
        <IconButton
          buttonType="muted"
          iconProps={{
            icon: 'DeleteTrimmed'
          }}
          label="Remove row"
        />
      </TableCell>
      <AddRowOverlay onAdd={onAdd} />
    </TableRow>
  );
};

export default Row;
