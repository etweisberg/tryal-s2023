import { Trial, User } from "./types";
import { loginSchema } from "./validation";

export const serverUrl = 'https://evening-sierra-44597-c9d720e3bf04.herokuapp.com';

// Function to get trial from id
export const getTrialFromId = async (id: string) => {
  try {
    const route = serverUrl + '/api/trial/'+id;
    console.log(route)
    const response = await fetch(route, {
      method: 'GET',
    });
    const result = await response.json();
    console.log(response.status)
    // If response is OK, return trial
    if (response.status === 200) {
      const trial: Trial = {
        _id: result._id,
        name: result.name,
        description: result.description,
        researchers: result.researchers,
        participantRequests: result.participantRequests,
        participantAccepted: result.participantAccepted,
        acceptingParticipants: result.acceptingParticipants,
        date: result.date,
        location: result.location,
        eligibleConditions: result.eligibleConditions,
      };
    return trial;
    } else {
      console.log(response.status)
      return null
    }
  } catch (error: any) {
      console.log(error)
      return null;
  }
}

// Function to get user from id
export const getUserFromId = async (id: string) => {
    try {
        const response = await fetch('https://evening-sierra-44597-c9d720e3bf04.herokuapp.com/api/user/'+id, {
        method: 'GET',
        });
        const result = await response.json();
        // If response is OK, return user
        if (response.status === 200) {
            const user: User = {
                _id: result._id,
                prefix: result.prefix,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                password: result.password,
                verified: result.verified,
                verificationToken: result.verificationToken,
                resetPasswordToken: result.resetPasswordToken,
                resetPasswordTokenExpiryDate: result.resetPasswordTokenExpiryDate,
                trials: result.trials,
                trialsOwned: result.trialsOwned,
                clickedOnTrials: result.clickedOnTrials,
                requestedTrials: result.requestedTrials,
                savedTrials: result.savedTrials,
                age: result.age,
                medConditions: result.medConditions,
                homeAddress: result.homeAddress,
                seekingCompensation: result.seekingCompensation,
                researcher: result.researcher,
                institution: result.institution,
                admin: result.admin,
            };
            return user;
        } else if (response.status === 400) {
            console.log('response status 400');
            console.log(result.message);
            return null;
        } else {
            return null
        }
    }
    catch (error: any) {
        console.log(error)
        return null;
    }
}

// Function to login user
export const userLoginCall = async (email: string, password: string) => {
    try {
        await loginSchema.validate({ email, password }, { abortEarly: true });
        const route = 'https://evening-sierra-44597-c9d720e3bf04.herokuapp.com/api/auth/login'
        console.log(route)
        const response = await fetch(route, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        const result = await response.json();
        console.log(result)
        if (response.status === 200) {
          if (result !== null) {
            const user : User = {
                _id: result._id,
                prefix: result.prefix,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                password: result.password,
                verified: result.verified,
                verificationToken: result.verificationToken,
                resetPasswordToken: result.resetPasswordToken,
                resetPasswordTokenExpiryDate: result.resetPasswordTokenExpiryDate,
                trials: result.trials,
                trialsOwned: result.trialsOwned,
                clickedOnTrials: result.clickedOnTrials,
                requestedTrials: result.requestedTrials,
                savedTrials: result.savedTrials,
                age: result.age,
                medConditions: result.medConditions,
                homeAddress: result.homeAddress,
                seekingCompensation: result.seekingCompensation,
                researcher: result.researcher,
                institution: result.institution,
                admin: result.admin,
            };
            return user
          }
        } else {
          alert(result.message)
          return null;
        }
      } catch (errors: any) {
        console.error(errors);
        return null;
      }
}

// Function to logout user
export const userLogoutCall = async () => {
  try {
    const route = serverUrl + '/api/auth/logout'
    console.log(route)
    const response = await fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return response;
  } catch (error) {
    console.log(error)
    return null;
  }
}
// import { Trial, User } from "./types";
// import { loginSchema } from "./validation";
// import axios, {isCancel, AxiosError} from 'axios';

// export const serverUrl = 'https://evening-sierra-44597-c9d720e3bf04.herokuapp.com';

// // Function to get trial from id
// export const getTrialFromId = async (id: string) => {
//   // init return variable trial
//   var trial : Trial | null = null;
//   // define route
//   const route = serverUrl + "/api/researcher/" + id;
//   console.log(route);

//   try {
//     await axios.get(route).then(res => {
//       if (res.status == 200) {
//         const result = res.data;
//         trial = {
//           _id: result._id,
//           name: result.name,
//           description: result.description,
//           researchers: result.researchers,
//           participantRequests: result.participantRequests,
//           participantAccepted: result.participantAccepted,
//           acceptingParticipants: result.acceptingParticipants,
//           date: result.date,
//           location: result.location,
//           eligibleConditions: result.eligibleConditions,
//         };
//       } else {
//         alert("Error: " + res.status + " " + res.statusText);
//         console.log(res);
//       }
//     })
//   } catch (e) {
    
//   }

//   return trial;
// }

// // Function to get user from id
// export const getUserFromId = async (id: string) => {
//   // init return variable trial
//   var user : User | null = null;
//   // define route
//   const route = serverUrl + "/api/user/" + id
//   console.log(route)

//   try { 
//     await axios.get(route).then(res => {
//       if (res.status == 200) {
//         const result = res.data;
//         user = {
//           _id: result._id,
//           prefix: result.prefix,
//           firstName: result.firstName,
//           lastName: result.lastName,
//           email: result.email,
//           password: result.password,
//           verified: result.verified,
//           verificationToken: result.verificationToken,
//           resetPasswordToken: result.resetPasswordToken,
//           resetPasswordTokenExpiryDate: result.resetPasswordTokenExpiryDate,
//           trials: result.trials,
//           trialsOwned: result.trialsOwned,
//           clickedOnTrials: result.clickedOnTrials,
//           requestedTrials: result.requestedTrials,
//           savedTrials: result.savedTrials,
//           age: result.age,
//           medConditions: result.medConditions,
//           homeAddress: result.homeAddress,
//           seekingCompensation: result.seekingCompensation,
//           researcher: result.researcher,
//           institution: result.institution,
//           admin: result.admin,
//         };
//       } else {
//         alert("Error: " + res.status + " " + res.statusText);
//         console.log(res);
//       }
//     })
//   } catch (e) {
    
//   }

//   return user;
// }

// // Function to login user
// export const userLoginCall = async (email: string, password: string) => {
//   // init return variable user
//   var user : User | null = null;
//   // validate input
//   await loginSchema.validate({ email, password }, { abortEarly: true });

//   // define route
//   const route = serverUrl + '/api/auth/login'
//   console.log(route)
  
//   try {
//     await axios.post(route, { email, password }).then(res => {
//       if (res.status === 200) {
//         const result = res.data;
//         user = {
//           _id: result._id,
//           prefix: result.prefix,
//           firstName: result.firstName,
//           lastName: result.lastName,
//           email: result.email,
//           password: result.password,
//           verified: result.verified,
//           verificationToken: result.verificationToken,
//           resetPasswordToken: result.resetPasswordToken,
//           resetPasswordTokenExpiryDate: result.resetPasswordTokenExpiryDate,
//           trials: result.trials,
//           trialsOwned: result.trialsOwned,
//           clickedOnTrials: result.clickedOnTrials,
//           requestedTrials: result.requestedTrials,
//           savedTrials: result.savedTrials,
//           age: result.age,
//           medConditions: result.medConditions,
//           homeAddress: result.homeAddress,
//           seekingCompensation: result.seekingCompensation,
//           researcher: result.researcher,
//           institution: result.institution,
//           admin: result.admin,
//         };
//       } else {
//         alert("Error: " + res.status + " " + res.statusText);
//         // console.log(res);
//       }
//     }).catch((err: AxiosError) => {
//       alert("Error: " + err.response?.status + " " + err.response?.statusText);
//       // console.log(err.response);
//     })
//   } catch (e) {

//   }
//   return user;
// }

// // Function to logout user
// export const userLogoutCall = async () => {
//   const route = serverUrl + '/api/auth/logout'
//   await axios.post(route).then(res => {
//     if (res.status == 200) {
//       return res
//     } else {
//       alert("Error: " + res.status + " " + res.statusText);
//       console.log(res);
//       return null
//     }
//   })
// }

