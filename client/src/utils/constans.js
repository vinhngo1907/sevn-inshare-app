export const APIUrl = process.env.NODE_ENV !== "productions" ?
    "http://localhost:5001" :
    "someDeployURL"