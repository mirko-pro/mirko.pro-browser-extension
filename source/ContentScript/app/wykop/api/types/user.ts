export interface userInterface {
  username: string;
  gender: string;
  company: boolean;
  avatar: string;
  status: string;
  color: string;
  verified: boolean;
  rank: {
    position: number | null;
    trend: number;
  };
  blacklist: boolean;
  follow: boolean;
  note: boolean;
  online: boolean;
}

// [
//   {
//       "user": {
//           "username": "nieudany",
//           "gender": "m",
//           "company": false,
//           "avatar": "https://wykop.pl/cdn/c0834752/77339bb01ee4a9f4fa5d2c8f64bc4a2377d34ed5891bfa88d5e8133a3b823f04.jpg",
//           "status": "active",
//           "color": "orange",
//           "verified": false,
//           "rank": {
//               "position": null,
//               "trend": 0
//           },
//           "blacklist": false,
//           "follow": false,
//           "note": false,
//           "online": false
//       },
//       "created_at": "2023-01-23 19:07:34",
//       "reason": "spam"
//   },
// ]
