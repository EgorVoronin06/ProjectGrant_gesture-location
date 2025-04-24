import type { AttributesDto } from '@ddsgt_mono/lib';
import { writable, type Writable } from 'svelte/store';

export const attributesStore: Writable<AttributesDto[]> = writable();
