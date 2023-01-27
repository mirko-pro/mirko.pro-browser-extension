import {
  wykopApiInterface,
  // wykopApiUserInterface
} from './types';

import { linkVotersTransformer } from '../transformers/links-transformer';

const apiUrl = `https://wykop.pl/api/v3/`;

const fetchApi = async (endpoint: string, options?: RequestInit) => {
  const bearerToken = window.localStorage.getItem('token');
  const response = await fetch(`${apiUrl}${endpoint}`, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return response.json();
};

const wykop = {
  // ### Notifications ###
  // https://wykop.pl/api/v3/notifications/status
  notifications: {
    status: async function (): Promise<
      wykopApiInterface['notifications']['status']
    > {
      return await fetchApi('notifications/status');
    },
  },

  // ###  Znaleziska / Links ###
  // Wykopujący - https://wykop.pl/api/v3/links/6992989/upvotes/up
  // Zakopujący - https://wykop.pl/api/v3/links/6992989/upvotes/down
  links: {
    upvotes: {
      up: async function (id: string): Promise<any> {
        const upvoters = await fetchApi(`links/${id}/upvotes/up`);
        return linkVotersTransformer(upvoters.data);
      },
      down: async function (id: string): Promise<any> {
        const downvoters = await fetchApi(`links/${id}/upvotes/down`);
        return linkVotersTransformer(downvoters.data);
      },
    },
  },
};

export default wykop;
