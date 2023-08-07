// Testing apiCalls.tsx

import { getTrialFromId } from "./apiCalls";

// Path: mobile\utils\apiCalls.tsx

// Test getTrialFromId:
getTrialFromId('645fe1f71c7164d317189256').then((trial) => {
    console.log(trial);
});