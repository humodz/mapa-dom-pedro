import { useState } from 'react';
import { uniqueId } from '.';

export function useUniqueId(prefix) {
  return useState(() => uniqueId(prefix))[0];
}