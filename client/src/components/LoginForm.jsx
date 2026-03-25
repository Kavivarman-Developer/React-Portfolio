import React from 'react'
import toast from "react-hot-toast";


const LoginForm = ({ onSubmit, onClose }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (onSubmit) {
        await onSubmit({ email, password })
        toast.success('Signed in successfully')
      } else {
        console.log('Login:', { email, password })
        toast.success('Signed in (demo)')
      }
    } catch (err) {
      const msg = err?.message || 'Sign in failed'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-6">
        {onClose && (
          <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 -mt-3 -mr-3 bg-white/6 text--500 rounded p-2">✕</button>
        )}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
          <p className="text-sm text-gray-300 mt-1">Sign in to continue to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/6 border border-white/8 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/6 border border-white/8 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-indigo-500" /> Remember me
            </label>
            <button type="button" className="text-indigo-300 hover:underline">Forgot?</button>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-medium disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-5">
          <div className="flex items-center gap-3">
            <hr className="flex-1 border-white/6" />
            <span className="text-xs text-gray-400">Or continue with</span>
            <hr className="flex-1 border-white/6" />
          </div>

          <div className="mt-4 flex gap-3">
            <button className="flex-1 py-2 rounded-md bg-white/6 text-white hover:bg-white/10">Google</button>
            <button className="flex-1 py-2 rounded-md bg-white/6 text-white hover:bg-white/10">GitHub</button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">Don’t have an account? <button className="text-indigo-300 hover:underline">Sign up</button></p>
      </div>
    </div>
  )
}

export default LoginForm
