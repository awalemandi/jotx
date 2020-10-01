import React, { useState, createContext } from 'react';
import CurrentRead from '../Components/ContentPages/CurrentRead';


export const JotContext = createContext();

export const JotDistributor = props => {
    const [content, setContent] = useState(<CurrentRead />);
    
    const [jotInfo, setJotInfo] = useState([
        {
            title: '',
            author: '',
            commenceDate: '',
            jots: '',
            completed: false,
            archived: false,
        }
    ]);
    return (
        <JotContext.Provider value={{content: [content, setContent], info: [jotInfo, setJotInfo]}}>
            {props.children}
        </JotContext.Provider>
    );
}