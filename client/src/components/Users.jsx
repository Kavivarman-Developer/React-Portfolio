import React from 'react'

const Users = () => {
  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      setUsers(data)
    } catch (err) {
      setError(err.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) return <div className="p-6 bg-white/5 rounded">Loading users…</div>
  if (error) return <div className="p-6 bg-white/5 rounded text-red-400">Error: {error}</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Users</h2>
        <button onClick={fetchUsers} className="px-3 py-1 text-sm bg-white/5 rounded">Refresh</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map(u => (
          <div key={u.id} className="p-4 rounded-lg bg-white/5 border border-white/6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">{u.name}</div>
                <div className="text-sm text-gray-300">{u.email}</div>
              </div>
              <div className="text-sm text-gray-400">{u.company?.name}</div>
            </div>
            <div className="mt-3 text-xs text-gray-400">{u.address?.city}, {u.address?.street}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Users
