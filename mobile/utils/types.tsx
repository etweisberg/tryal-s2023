export type User = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    verified: boolean;
    verificationToken: string | null | undefined;
    resetPasswordToken: string | null | undefined;
    resetPasswordTokenExpiryDate: Date | null | undefined;
    trials: Array<string>;
    trialsOwned: Array<string>;
    age: number | null;
    medConditions: Array<string>;
    homeAddress: string;
    seekingCompensation: boolean;
    researcher: boolean;
    institution: string;
    admin: boolean;
}

export type Trial = {
    _id: string;
    name: string;
    description: string;
    researchers: string[];
    participantRequests: string[];
    participantAccepted: string[];
    acceptingParticipants: boolean;
    date: Date;
    location: string;
    eligibleConditions: string[];
}

export type Message = {
    _id: string;
    sender: string;
    recipient: string;
    content: string;
    timestamp: Date;
    read: Date | null;
    deleted: boolean;
}