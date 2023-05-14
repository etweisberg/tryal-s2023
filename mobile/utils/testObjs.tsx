import { ChatRoom, Message, Trial, User } from "./types"

export const testTrial1: Trial = {
    _id: '1',
    name: "psych study",
    description: 'Labore sunt veniam amet est. Minim nisi dolor eu ad incididunt cillum elit ex ut. Dolore exercitation nulla tempor consequat aliquip occaecat. Nisi id ipsum irure aute. Deserunt sit aute irure quis nulla eu consequat fugiat Lorem sunt magna et consequat labore. Laboris incididunt id Lorem est duis deserunt nisi dolore eiusmod culpa exercitation consectetur.',
    researchers: ['1'],
    participantRequests: ['1','2'],
    date: '2023-05-01',
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
    date: '2023-05-01',
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
    date: '2023-05-01',
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
    resetPasswordTokenExpiryDate: '2023-05-01',
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
    resetPasswordTokenExpiryDate: '2023-05-01',
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
    resetPasswordTokenExpiryDate: '2023-05-01',
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

export const testMessages: Message[] = [
    {
        _id: '1',
        sender: '1',
        recipient: '2',
        content: 'hello',
        timestamp: '2023-05-01',
        read: null,
        deleted: false,
    },
    {
        _id: '2',
        sender: '2',
        recipient: '1',
        content: 'hi',
        timestamp: '2023-05-01',
        read: null,
        deleted: false,
    },
    {
        _id: '3',
        sender: '1',
        recipient: '2',
        content: 'how are you?',
        timestamp: '2023-05-01',
        read: null,
        deleted: false,
    },
    {
        _id: '4',
        sender: '2',
        recipient: '1',
        content: 'good',
        timestamp: '2023-05-01',
        read: null,
        deleted: false,
    },
    {
        _id: '8',
        sender: '1',
        recipient: '2',
        content: 'hello \n \n \n hi',
        timestamp: '2023-05-01',
        read: null,
        deleted: false,
    },
    {
        _id: '5',
        sender: '2',
        recipient: '1',
        content: 'hi \n \n \n hi',
        timestamp: '2023-05-01',
        read: null,
        deleted: false,
    },
    {
        _id: '6',
        sender: '1',
        recipient: '2',
        content: 'how are you? \n \n \n hi',
        timestamp: '2023-05-01',
        read: null,
        deleted: false,
    },
    {
        _id: '7',
        sender: '2',
        recipient: '1',
        content: 'good \n \n \n hi',
        timestamp: '2023-05-01',
        read: null,
        deleted: false,
    },
]

export const testChatRoom1: ChatRoom = {
    _id: '1',
    participants: ['1','2'],
    messages: testMessages,
}

export const testChatRoom2: ChatRoom = {
    _id: '2',
    participants: ['1','3'],
    messages: testMessages,
}

export const testChatRoom3: ChatRoom = {
    _id: '3',
    participants: ['1','2'],
    messages: testMessages,
}