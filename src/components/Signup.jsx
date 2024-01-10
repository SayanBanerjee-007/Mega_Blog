import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')
  const create = async data => {
    console.log(data)
    setError('')
    try {
      const session = await authService.createAccount(data)
      console.log(session)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(login(userData))
        navigate('/')
      }
    } catch (error) {
      setError(error)
    }
  }
  const handleError = errors => {
    setError(Object.entries(errors)[0][1].message)
  }
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Create Account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Log In
          </Link>
        </p>
        {error && (
          <p className="text-red-600 mt-8 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register('name', {
                required: {
                  value: true,
                  message: 'Name is required',
                },
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="text"
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is required',
                },
                validate: {
                  matchPattern: value =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                      value
                    ) || 'Email address must be a valid address',
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              minLength="8"
              placeholder="Enter your password"
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required',
                },
                minLength: {
                  value: 8,
                  message:
                    'Password must be of at least 8 characters',
                },
              })}
            />
            <Button
              type="submit"
              className="w-full"
            >
              submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
