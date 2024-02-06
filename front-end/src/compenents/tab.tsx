'use client';

import { Typography } from '@mui/material';
import type { Item } from './tab-group';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export const Tab = ({ path, item }: { path: string; item: Item }) => {
  const segment = useSelectedLayoutSegment();
  const href = item.slug ? path + '/' + item.slug : path;
  const isActive =
    // Example home pages e.g. `/layouts`
    (!item.slug && segment === null) ||
    segment === item.segment ||
    // Nested pages e.g. `/layouts/electronics`
    segment === item.slug;

  return (
    <Link
        style={{textDecoration: 'none', fontWeight: 'Semi-Bold' }}
        href={href}
        >
            <Typography sx={{ color: isActive ? '#ffc107': 'black' }} >
              {item.text}
            </Typography>
      </Link>
  );
};
