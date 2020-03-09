import React from 'react';
import { TextLink } from '@contentful/forma-36-react-components';
import tokens from '@contentful/forma-36-tokens';
import { css } from 'emotion';
import { OnAdd } from './Rows';

const styles = {
  box: css({
    opacity: '1 !important',
    position: 'absolute',
    display: 'block',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    '& > svg': {
      width: '100%',
      height: '100%',
      fill: 'transparent',
      stroke: tokens.colorTextLightest,
      cursor: 'pointer'
    },
    '&:hover': {
      '& > svg': {
        stroke: tokens.colorBlueBase,
        '& > rect': {
          strokeWidth: '2 !important'
        }
      },
      '& > button, & > button svg': {
        fill: tokens.colorTextDark,
        color: tokens.colorTextDark
      }
    },
    '& > button': {
      position: 'absolute',
      transform: 'translate(-50%, -60%)',
      left: '50%',
      top: '50%',
      pointerEvents: 'none'
    }
  })
};

interface AddRowOverlayProps {
  onAdd: OnAdd;
}

const AddRowOverlay = ({ onAdd }: AddRowOverlayProps) => {
  return (
    <td className={styles.box}>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" onClick={onAdd}>
        <rect
          height="100%"
          width="100%"
          strokeWidth="1"
          strokeDasharray="5"
          strokeLinecap="square"
        />
      </svg>
      <TextLink icon="PlusTrimmed">Add row</TextLink>
    </td>
  );
};

export default AddRowOverlay;
