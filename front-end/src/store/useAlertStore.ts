import reorder, { reorderQuoteMap } from '@/compenents/dnd/reorder'
import { create } from 'zustand'

type CatalogueMap = {
    onInitMap: (initial: any) => any,
    columns: any,
    ordered: string[],
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
      })
       
)