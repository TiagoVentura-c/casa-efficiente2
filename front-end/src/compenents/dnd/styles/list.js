/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from '@xstyled/styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import QuoteItem from './item';
import { grid } from './constants';
import Title from './title';
import { Box } from '@mui/material';

export const getBackgroundColor = (isDraggingOver, isDraggingFrom) => {
  if (isDraggingOver) {
    return '#FFEBE6';
  }
  if (isDraggingFrom) {
    return '#E6FCFF';
  }
  return '#EBECF0';
};

const Wrapper = styled.div`
  background-color: ${(props) => getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: ${grid}px;
  border: ${grid}px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;

const scrollContainerHeight = 250;

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: ${scrollContainerHeight}px;
  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  padding-bottom: ${grid}px;
`;



/* stylelint-disable block-no-empty */
const Container = styled.div``;
/* stylelint-enable */

const InnerQuoteList = React.memo(function InnerQuoteList(props) {
  return props.quotes.map((quote, index) => (
    <Draggable key={quote.id} draggableId={quote.id} index={index}>
      {(dragProvided, dragSnapshot) => (
        <QuoteItem
          key={quote.id}
          quote={quote}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
          title={props.titleColumn.props.children}
        />
      )}
    </Draggable>
  ));
});

function InnerList(props) {
  const { quotes, dropProvided } = props;
  const title = props.title ? <Title>{props.title}</Title> : null;

  return (
    <Box >
      <DropZone ref={dropProvided.innerRef}>
        <InnerQuoteList quotes={quotes} titleColumn={title} />
        {dropProvided.placeholder}
      </DropZone>
    </Box>
  );
}

export default function QuoteList(props) {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
    style,
    quotes,
    title,
    useClone,
  } = props;

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      
    >
      {(dropProvided, dropSnapshot) => (
        <Wrapper
          style={style}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          <InnerList quotes={quotes} title={listId} dropProvided={dropProvided} />
        </Wrapper>
      )}
    </Droppable>
  );
}
