import {
    ACTION1,
    RESET,
    NEW_SESSION,
    HOME
    } from './actionTypes';


// ui-only actions (client-side view state)
export const setText = text => ({type:ACTION1, text});
export const reset = () => ({type:RESET});
export const setBaseState = state => ({type:state});
