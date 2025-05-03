import React, { createContext } from 'react'

export const UserDataContext = createContext();

function UserContext({children}) {
    return (
        <div>
            <UserDataContext.Provider>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext
