//example api request: replace with your API request here in folder API

export const getUser = () => {
    try {
      return Promise.resolve({
        status: 'success',
        data: [{ 
            firstName: 'Chris',
            lastName: 'Wun',
            email: 'wunc@seas.upenn.edu',
            password: '123456',
            verified: true,
            verificationToken: '123456',
            resetPasswordToken: '123456',
            resetPasswordTokenExpiryDate: '6/1/2023',
            trials: Array(1).fill('Brain Study'),
            age: 21,
            medConditions: Array(1).fill('Deafness'),
            homeAddress: '1234 Walnut St',
            seekingCompensation: true,            
          }],
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };