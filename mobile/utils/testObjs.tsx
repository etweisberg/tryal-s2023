import { Trial, User } from "./types"

export const testTrial1: Trial = {
    _id: '1',
    name: "psych study",
    description: 'Labore sunt veniam amet est. Minim nisi dolor eu ad incididunt cillum elit ex ut. Dolore exercitation nulla tempor consequat aliquip occaecat. Nisi id ipsum irure aute. Deserunt sit aute irure quis nulla eu consequat fugiat Lorem sunt magna et consequat labore. Laboris incididunt id Lorem est duis deserunt nisi dolore eiusmod culpa exercitation consectetur.',
    researchers: ['1'],
    participantRequests: ['1','2'],
    date: new Date('6/1/2023'),
    location: "Philly",
    eligibleConditions: ["boobs", "butts", "farts"],
    participantAccepted: [],
    acceptingParticipants: true,
}

export const testTrial2: Trial = {
    _id: '2',
    name: "psych study 2",
    description: "testing brains", 
    researchers: ['2'],
    participantRequests: ['1','2'],
    date: new Date('6/1/2023'),
    location: "NYC",
    eligibleConditions: ["boobs", "butts", "farts"],
    participantAccepted: [],
    acceptingParticipants: true,
}

export const testTrial3: Trial = {
    _id: '3',
    name: "psych study 3",
    description: "testing brains", 
    researchers: ['1'],
    participantRequests: ['1','2'],
    date: new Date('6/1/2023'),
    location: "Philly",
    eligibleConditions: ["boobs", "butts", "farts"],
    participantAccepted: [],
    acceptingParticipants: true,
}

export const testTrials: Trial[] = [testTrial1, testTrial2, testTrial3]

export const testUser1: User = {
    _id: '1',
    firstName: 'Chris',
    lastName: 'Wun',
    email: 'wunc@seas.upenn.edu',
    password: 'password',
    verified: true,
    verificationToken: '123456',
    resetPasswordToken: '123456',
    resetPasswordTokenExpiryDate: new Date('6/1/2023'),
    trials: ['1','2'],
    trialsOwned: ['3'],
    age: 21,
    medConditions: ['deaf', 'idk'],
    researcher: true,
    institution: 'University of Pennsylvania',
    homeAddress: '1234 Walnut St',
    seekingCompensation: true, 
    admin: false,       
}

export const testUser2: User = {
    _id: '1',
    firstName: 'Ethan',
    lastName: 'Weisberg',
    email: 'eiweisberg@seas.upenn.edu',
    password: 'password',
    verified: true,
    verificationToken: '123456',
    resetPasswordToken: '123456',
    resetPasswordTokenExpiryDate: new Date('6/1/2023'),
    trials: ['2','3'],
    trialsOwned: ['1'],
    age: 21,
    medConditions: ['small', 'idk'],
    researcher: true,
    institution: 'University of Pennsylvania',
    homeAddress: '1234 Walnut St',
    seekingCompensation: true,  
    admin: false,         
}

export const testUser3: User = {
    _id: '1',
    firstName: 'Jasper',
    lastName: 'Zhu',
    email: 'jzhu25@seas.upenn.edu',
    password: 'password',
    verified: true,
    verificationToken: '123456',
    resetPasswordToken: '123456',
    resetPasswordTokenExpiryDate: new Date('6/1/2023'),
    trials: ['1','2'],
    trialsOwned: [],
    age: 21,
    medConditions: ['philosophy major', 'idk'],
    researcher: false,
    institution: 'University of Pennsylvania',
    homeAddress: '1234 Walnut St',
    seekingCompensation: true,     
    admin: false      
}