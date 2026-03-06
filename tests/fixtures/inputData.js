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

export const validSummaryCases = [
  {
    firstName: 'Supanat',
    lastName: 'Kampapan',
    email: 'supanat.kampapan@example.com',
    gender: 'Male',
    mobile: '0812345678',
    state: 'NCR',
    city: 'Delhi',
  },
  {
    firstName: 'Chanaphan',
    lastName: 'Prasomwong',
    email: 'chanaphan.prasomwong@example.com',
    gender: 'Female',
    mobile: '0898765432',
    state: 'Uttar Pradesh',
    city: 'Lucknow',
  },
];

export const stateCityCases = [
  {
    state: 'NCR',
    expectedCities: ['Delhi', 'Gurgaon', 'Noida'],
    unexpectedCity: 'Lucknow',
  },
  {
    state: 'Uttar Pradesh',
    expectedCities: ['Agra', 'Lucknow', 'Merrut'],
    unexpectedCity: 'Delhi',
  },
  {
    state: 'Haryana',
    expectedCities: ['Karnal', 'Panipat'],
    unexpectedCity: 'Jaipur',
  },
  {
    state: 'Rajasthan',
    expectedCities: ['Jaipur', 'Jaiselmer'],
    unexpectedCity: 'Karnal',
  },
];

export const validEmailCases = [
  'supanat.kampapan@example.com',
  'supanat@mail.example.com',
];
