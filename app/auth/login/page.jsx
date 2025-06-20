"use client"
import dynamic from 'next/dynamic'
// import LoginForm from '../../../components/auth/login-form';

const LoginForm = dynamic(() => import('../../../components/auth/login-form'), {
  ssr: false, 
});

const LoginPage = () => {
  return (
    <LoginForm />
  )
}

export default LoginPage