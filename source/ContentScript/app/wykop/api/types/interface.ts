export interface wykopApiInterface {
  notifications: {
    status: () => Promise<any>;
  };
  links: {
    upvotes: {
      up: (id: string) => Promise<any>;
      down: (id: string) => Promise<any>;
    };
  };
}
