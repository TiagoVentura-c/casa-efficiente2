import React, { useEffect,  } from "react";
import Column from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useCatalogueMap } from "@/store/useCatalogueMap";
import { Box } from "@mui/material";



type Props = {
  isCombineEnabled?: any
  initial: any
  useClone?: any
  containerHeight?: any
  withScrollableColumns: any
}

export default function Board ({
  isCombineEnabled=false,
  initial,
  useClone,
  containerHeight,
  withScrollableColumns, }: Props) {

  const updateColumns = useCatalogueMap(state => state.updateColumns)
  const updateOrdered = useCatalogueMap(state => state.updateOrdered)

  const columns = useCatalogueMap(state => state.columns)
  const ordered = useCatalogueMap(state => state.ordered)
  const onDragEnd = useCatalogueMap(state => state.onDragEnd)

  useEffect(() => {
    updateColumns(initial)
    updateOrdered(Object.keys(initial))
  }, [])

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="board"
          type="COLUMN"
          direction="horizontal"
          ignoreContainerClipping={Boolean(containerHeight)}
          isCombineEnabled={isCombineEnabled}
        >
          {(provided: any) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Box  minHeight={'100vh'} minWidth={'100vw'} display={'inline-flex'} >
                  {ordered.map((key, index) => (
                    <Column
                      key={key}
                      index={index}
                      title={key}
                      quotes={columns[key]}
                      isScrollable={withScrollableColumns}
                      isCombineEnabled={isCombineEnabled}
                      useClone={useClone}
                    />
                  ))}
                  {provided.placeholder}
              </Box>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
