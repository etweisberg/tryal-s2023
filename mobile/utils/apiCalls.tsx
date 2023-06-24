import { Trial, User } from "./types";

// Function to get trial from id
export const getTrialFromId = async (id: string) => {
    try {
        const response = await fetch('http://localhost:4000/api/researcher/'+id, {
        method: 'GET',
        });
        const result = await response.json();
        // If response is OK, return trial
        if (response.status === 200) {
            const trial: Trial = result;
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
            const user: User = result;
        return user;
        } else if (response.status === 400) {
            console.log('response status 400');
            console.log(result.message);
            return null;
        }
    }
    catch (error: any) {
        console.log(error)
        return null;
    }
}