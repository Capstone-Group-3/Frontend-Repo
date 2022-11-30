import React from "react";
import { useOutletContext } from "react-router";

const AdminPanel=()=>{
    const {usernameState} = useOutletContext()
    const {idState} = useOutletContext()
    const {adminState} = useOutletContext() 
    const [isAdmin, setIsAdmin] = adminState

    return (
        <div>
            {isAdmin?
            <div>

            </div>
            :
            <div>
                <p>Ah ah ah, you didn't say the magic word</p>
                <img src='https://thumbs.gfycat.com/CapitalRigidGull.webp'></img>
            </div>
            }
        </div>
    )
}

export default AdminPanel