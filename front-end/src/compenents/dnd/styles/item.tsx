import React from 'react';
import { useRouter } from 'next/navigation';

import { Box, Chip, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCatalogueMap } from '@/store/useCatalogueMap';
import { CatalogueMap } from '@/_types';

function QuoteItem(props: any) {
  const router = useRouter()

  const { quote, isDragging, isGroupedOver, provided, style, isClone, index, title } = props;
  const updateColumns = useCatalogueMap(state => state.updateColumns)
  const updateOrdered = useCatalogueMap(state => state.updateOrdered)
  const columns = useCatalogueMap<CatalogueMap>(state => state.columns)
  const ordered = useCatalogueMap(state => state.ordered)


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveFromEntry = () => {

    const updatedColumn = columns[title].filter(e => e.id != quote.id )
    delete columns[title]

    const newColumns = columns
    newColumns[title] = updatedColumn
    const newOrdered = [...ordered]

    updateOrdered(newOrdered)
    updateColumns(newColumns)
    
    console.log(newColumns)
    handleClose()
  }

  return (
    <Box 
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      boxShadow={2}
      height={'140px'}
      margin={1}
      width={'100'}
      borderRadius={2}
      sx={{borderWidth: 1, borderColor: '#7599FB', borderStyle: 'solid' }}
    >
      <Stack direction={'column'} padding={2} >
        <Stack direction={'row'} display={'flex'}  alignItems={'center'} >
          <Typography fontSize={11} flex={1} >{quote.content?.Key ?? ''}</Typography>
          <div>
            <IconButton onClick={handleMenu} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem sx={{fontSize: 12}} onClick={() => router.push(`/bundles/${quote.content.Key}`)} > <LaunchIcon style={{marginRight: 2, fontSize: 15}} />Manage bundle</MenuItem>
                <MenuItem sx={{fontSize: 12}} onClick={handleRemoveFromEntry} > <DeleteIcon style={{marginRight: 2, fontSize: 15}} />Remove from entry</MenuItem>
              </Menu>
          </div>
        </Stack>

        <Typography fontSize={14} fontWeight={600} >{quote.content?.Name_Lang1}</Typography>
        <Typography fontSize={12}>{quote.content?.Validity_Type}</Typography>

        <Stack direction={'row'} display={'flex'}  alignItems={'center'} >
          <Typography flex={1} >{quote.content?.Price} KZ</Typography>
          <Chip label={quote.content?.ServiceType} variant="outlined" />
        </Stack>  
      </Stack>
    </Box>
  );
}

export default React.memo(QuoteItem);


/**
 * <Container
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      isClone={isClone}
      colors={quote.author.colors}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={quote.id}
      data-index={index}
      aria-label={`${quote.author.name} quote ${quote.content}`}
    >
      <Avatar src={'/images/bmo-min.png'} alt={quote.author.name} />
      {isClone ? <CloneBadge>Clone</CloneBadge> : null}
      <Content>
        <h4>{quote.content}</h4>
        <Footer>
          <Author colors={quote.author.colors}>{quote.author.name}</Author>
          <QuoteId>
            id:
            {quote.id} item
          </QuoteId>
        </Footer>
      </Content>
    </Container>
 */