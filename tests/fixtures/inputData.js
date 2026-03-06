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

export const validSummaryCases = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    gender: 'Male',
    mobile: '0812345678',
    state: 'NCR',
    city: 'Delhi',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
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
