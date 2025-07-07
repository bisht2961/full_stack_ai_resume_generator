import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import AuthForm from './sign_in/auth_form'
import { Toaster } from '@/components/ui/sonner'


function SignInPage() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <Toaster />
      <AuthForm />
    </div>
  )
}

export default SignInPage