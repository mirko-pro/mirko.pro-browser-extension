export interface linkVoters {
  created_at: string;
  reason: string;
  user: {
    username: string;
  };
}

const reasonsLocalePL: any = {
  spam: 'Spam',
  duplicate: 'Duplikat',
  invalid: 'Nie nadaje się',
  wrong: 'Treść nieodpowiednia',
  fake: 'Informacja nieprawdziwa',
};

export const linkVotersTransformer = (data: any) => {
  return data.map((item: any) => {
    return {
      created_at: item.created_at,
      reason: reasonsLocalePL[item.reason],
      user: {
        username: item.user.username,
      },
    };
  });
};
