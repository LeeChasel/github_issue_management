'use client'

import { BsGithub } from 'react-icons/bs';

export default function LoginBtn()
{
    function callPopup()
    {
        const windowWidth : number = 500;
        const windowHeight : number = 700;
        const y = window.top!.outerHeight / 2 + window.top!.screenY - (windowHeight / 2);
        const x = window.top!.outerWidth / 2 + window.top!.screenX - (windowWidth / 2);
        const newWindow = window.open(
            "/authPopup",
            "",
            `top=${y}, left=${x}, width=${windowWidth}, height=${windowHeight}`
        )
        newWindow?.focus();
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <button className="btn btn-primary bg-amber-400 hover:bg-amber-500 gap-2 w-1/4 h-1/4 text-2xl" onClick={callPopup}>
                <BsGithub className='w-7 h-7'/>
                Login With Github
            </button>
        </div>
    )
}
