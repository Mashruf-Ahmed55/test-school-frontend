'use client';

import type React from 'react';

import { store } from '@/store/store';
import { Provider } from 'react-redux';

export default function Providers({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
