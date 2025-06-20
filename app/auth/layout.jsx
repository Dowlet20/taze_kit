import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <section className='w-full overflow-hidden'>
        <div className='h-[90vh] flex items-center justify-center'>
            {children}
        </div>
    </section>
  )
}

export default AuthLayout