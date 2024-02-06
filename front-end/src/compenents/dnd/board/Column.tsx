import React from "react";
import { colors } from "@atlaskit/theme";
import { Draggable } from "react-beautiful-dnd";
import QuoteList from "../styles/list";
import { Box, Divider, MenuItem, Paper, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useCatalogueMap } from "@/store/useCatalogueMap";

const Column = (props: any) => {
  const title = props.title;
  const quotes = props.quotes;
  const index = props.index;

  const updateColumns = useCatalogueMap(state => state.updateColumns)
  const updateOrdered = useCatalogueMap(state => state.updateOrdered)
  const columns = useCatalogueMap(state => state.columns)
  const ordered = useCatalogueMap(state => state.ordered)

  const handleRemoveEntry = async() => {
    const order = title
    const newOrdered = ordered.filter(o => o != order)
    updateOrdered(newOrdered)
    updateColumns(columns)

  }

  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <Box marginX={2}>
            <Paper style={{ display: 'flex', flexDirection: 'column', borderRadius: 2, }} ref={provided.innerRef} {...provided.draggableProps} elevation={10}  >
              <div {...provided.dragHandleProps} >
                <Stack direction={'row'} borderRadius={10} flex={1} height={50} alignItems={'end'} display={'flex'} >
                  <Typography
                    aria-label={`${title} quote list`}
                    mb={1} mx={1} flex={1}
                  >
                    {title}
                  </Typography>
                  <MenuItem sx={{fontSize: 12}} onClick={handleRemoveEntry} > <DeleteIcon style={{ fontSize: 20}} /></MenuItem>
                </Stack>
              </div>
                <Divider />
              <QuoteList
                listId={title}
                listType="QUOTE"
                style={{
                  backgroundColor: snapshot.isDragging ? colors.G50 : 'white'
                }}
                quotes={quotes}
                internalScroll={props.isScrollable}
                isCombineEnabled={Boolean(props.isCombineEnabled)}
                useClone={Boolean(props.useClone)}
              />
            </Paper>
        </Box>
      )}
    </Draggable>
  );
};

export default Column;

//isDragging={snapshot.isDragging} 