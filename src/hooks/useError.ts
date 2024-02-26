"use client"

import { error } from "console";
import { DotSquareIcon } from "lucide-react";
import { useState } from "react";

export interface Error
{
    ErrorMessage: string,
    ShowError: boolean,
    UpdateError: (errorMesage: string, showError: boolean, duration?: number) => void
}

export function useError(errorMessage: string, showError: boolean): Error {
    
    const DefaultErrorMessage: string = errorMessage;

    const [ErrorMessage, setErrorMessage] = useState<string>(DefaultErrorMessage); 

    const [ShowError, setShowError] = useState<boolean>(showError);

    return {
        ErrorMessage,
        ShowError,
        
        UpdateError(_errorMessage: string, _showError: boolean, _duration: number | undefined)
        {
            setErrorMessage(_errorMessage);
            setShowError(_showError);

            if (_duration !== undefined)
                setTimeout(()=> { 
                    setShowError(false);  
                    setErrorMessage(DefaultErrorMessage);
                }, _duration);
        } 
    };
} 

export default { useError, Error };
