import { Trial, User } from "./types";
import { loginSchema } from "./validation";

// Function to get trial from id
export const getTrialFromId = async (id: string) => {
    try {
        const response = await fetch('http://localhost:4000/api/researcher/'+id, {
        method: 'GET',
        });
        const result = await response.json();
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
        } else if (response.status === 400) {
            console.log('response status 400');
            console.log(result.message);
            return null;
        }
    } catch (error: any) {
        console.log(error)
        return null;
    }
}

// Function to get user from id
export const getUserFromId = async (id: string) => {
    try {
        const response = await fetch('http://localhost:4000/api/user/'+id, {
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
        await loginSchema.validate({ email, password }, { abortEarly: false });
  
        const response = await fetch('http://localhost:4000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        const result = await response.json();
        // console.log(result);
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
        } else if (response.status === 401) {
          return(['Invalid username or password']);
        } else if (response.status === 500) {
          return(['Server error']);
        }
      } catch (errors: any) {
        console.error(errors);
        return(errors.errors);
      }
}