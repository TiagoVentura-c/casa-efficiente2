import { Divider, Stack } from "@mui/material";
import { Tab } from "./tab";

export type Item = {
  text: string;
  slug?: string;
  segment?: string;
};

export const TabGroup = ({ path, items }: { path: string; items: Item[] }) => {
  return (
    <>
      <Stack direction={'row'} spacing={2}>
        {items.map((item) => (
          <Tab key={path + item.slug} item={item} path={path} />
        ))}
      </Stack>
      <Divider />
    </>
  );
};
