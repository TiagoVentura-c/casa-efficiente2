import reorder, { reorderQuoteMap } from '@/compenents/dnd/reorder'
import { create } from 'zustand'

type CatalogueMap = {
    onInitMap: (initial: any) => any,
    columns: any,
    ordered: string[],
    onDragEnd: (result: any) => any,
    updateColumns: (columns: any) => any,
    updateOrdered: (ordered: string[]) => any
}

export const useCatalogueMap = create<CatalogueMap>(
    (set) => ({
        columns: undefined,
        ordered: [],
        updateColumns: (columns) => set(() => ({ columns: columns })),
        updateOrdered: (ordered) => set(() => ({ ordered: ordered })),
        onInitMap: (initial) => {
            set((state) => ({
                columns: initial,
                ordered: Object.keys(initial)
            }))
        },
        onDragEnd: (result) => {
            set((state) => {
                if (result.combine) {
                    if (result.type === "COLUMN") {
                      const shallow = [...state.ordered];
                      shallow.splice(result.source.index, 1);
                      return({ ordered: shallow })
                    }
              
                    const column = state.columns[result.source.droppableId];
                    const withQuoteRemoved = [...column];
              
                    withQuoteRemoved.splice(result.source.index, 1);
              
                    const orderedColumns = {
                      ...state.columns,
                      [result.source.droppableId]: withQuoteRemoved
                    };
                    return({ columns: orderedColumns })
                  }
              
                  // dropped nowhere
                  if (!result.destination) {
                    return ({})
                  }
              
                  const source = result.source;
                  const destination = result.destination;
              
                  // did not move anywhere - can bail early
                  if (
                    source.droppableId === destination.droppableId &&
                    source.index === destination.index
                  ) {
                    return ({})
                  }
              
                  // reordering column
                  if (result.type === "COLUMN") {
                    const reorderedorder: any = reorder(state.ordered, source.index, destination.index);
                    return({ ordered: reorderedorder })
                  }
              
                  const data = reorderQuoteMap({
                    quoteMap: state.columns,
                    source,
                    destination
                  });
                  return({ columns: data.quoteMap })
            })
        }
    })
)