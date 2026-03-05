export const validStudent = {
  firstName: 'Supanat',
  lastName: 'Kampapan',
  email: 'supanat.kampapan@example.com',
  gender: 'Male',
  mobile: '0812345678',
  dateOfBirth: '15 Mar 2000',
  subject: 'Maths',
  hobbies: ['Sports', 'Music'],
  pictureFileName: 'profile.png',
  currentAddress: 'Bangkok, Thailand',
  state: 'NCR',
  city: 'Delhi',
};

export const invalidEmailCases = [
  {
    caseName: 'no address symbol',
    email: 'supanat.example.com',
  },
  {
    caseName: 'incomplete domain',
    email: 'supanat@',
  },
];

export const mobileBoundaryCases = [
  {
    caseName: 'below minimum boundary (9 digits)',
    mobile: '081234567',
    isValid: false,
  },
  {
    caseName: 'at boundary (10 digits)',
    mobile: '0812345678',
    isValid: true,
  },
  {
    caseName: 'above boundary (11 digits)',
    mobile: '08123456789',
    isValid: false,
  },
];
