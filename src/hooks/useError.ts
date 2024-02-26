"use client"

import { error } from "console";
import { DotSquareIcon } from "lucide-react";
import { useState } from "react";

export interface Error
{
    ErrorMessage: string,
    ShowError: boolean,
    RenderError: (duration?: number) => void,
    UpdateError: (errorMesage: string, showError: boolean) => void
}

export function useError(errorMessage: string, showError: boolean): Error {
    
    const DefaultErrorMessage: string = errorMessage;

    const [ErrorMessage, setErrorMessage] = useState<string>(DefaultErrorMessage); 

    const [ShowError, setShowError] = useState<boolean>(showError);

    return {
        ErrorMessage,
        ShowError,
        
        RenderError(duration: number | undefined) 
        {
            setShowError(true);

            if (duration !== undefined)
                setTimeout(()=> { 
                    setShowError(false);  
                    setErrorMessage(DefaultErrorMessage);
                }, duration);
        },

        UpdateError(_errorMessage: string, _showError: boolean)
        {
            setErrorMessage(_errorMessage);
            setShowError(_showError);
        } 
    };
} 

export default { useError, Error };
