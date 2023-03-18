import { CHATS_SET } from '../constants/constants';

export const setChats = data => dispatch =>
    dispatch({ data, type: CHATS_SET })