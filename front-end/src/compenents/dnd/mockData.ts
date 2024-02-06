import { colors } from "@atlaskit/theme";
import bmoImg from "./static/bmo-min.png";
import jakeImg from "./static/jake-min.png";
import { BundleApi, CatalogueEntry, EntryPerVersionAndPlan, MCatalogues } from "@/_types";

const jake = {
  id: "1",
  name: "Jake",
  url: "http://adventuretime.wikia.com/wiki/Jake",
  avatarUrl: jakeImg,
  colors: {
    soft: colors.Y50,
    hard: colors.N400A
  }
};

const BMO = {
  id: "2",
  name: "BMO",
  url: "http://adventuretime.wikia.com/wiki/BMO",
  avatarUrl: bmoImg,
  colors: {
    soft: colors.G50,
    hard: colors.N400A
  }
};


export const authors = [jake, BMO, ];

export const quotes = [
  {
    id: "1",
    content: "Sometimes life is scary and dark",
    author: BMO
  },
  {
    id: "2",
    content:
      "Sucking at something is the first step towards being sorta good at something.",
    author: jake
  },
  {
    id: "3",
    content: "You got to focus on what's real, man",
    author: jake
  },
]

const data = ''

// So we do not have any clashes with our hardcoded ones
let idCount = quotes.length + 1;

export const getQuotes = (entries: CatalogueEntry, bundles?: BundleApi[]) => {
    const quotes = entries.Bundles.map(bundleKey => ({ id: bundleKey+entries.Description, content: bundles?.find(bundle => bundle.Key == bundleKey) }))
    return quotes
}


export const generateQuoteMap = (entries: CatalogueEntry[] | undefined, bundles?: BundleApi[]) =>
  entries?.reduce(
    (previous, entrie) => ({
      ...previous,
      [entrie.Description]: getQuotes(entrie, bundles)
    }),
    {}
)
 