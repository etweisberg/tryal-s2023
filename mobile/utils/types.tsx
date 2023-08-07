export type User = {
    _id: string;
    prefix: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    verified: boolean;
    verificationToken: string | null | undefined;
    resetPasswordToken: string | null | undefined;
    resetPasswordTokenExpiryDate: string | null | undefined;
    trials: Array<string>;
    trialsOwned: Array<string>;
    clickedOnTrials: Array<string>;
    requestedTrials: Array<string>;
    savedTrials: Map<string, Array<string>>;
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
    date: [string, string];
    location: string;
    eligibleConditions: string[];
}

export type Message = {
    _id: string;
    sender: string;
    recipient: string;
    content: string;
    timestamp: string;
    read: string | null;
    deletedForSender: boolean;
    deletedForRecipient: boolean;
}

export type ChatRoom = {
    _id: string;
    participants: string[];
    messages: Message[];
}