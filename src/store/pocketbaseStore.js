const pb_url = import.meta.env.VITE_POCKETBASE_URL

import PocketBase from 'pocketbase';

export const pb = new PocketBase(pb_url);