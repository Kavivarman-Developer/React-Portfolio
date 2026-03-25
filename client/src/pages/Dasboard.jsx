import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Users from '../components/Users'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'users', label: 'Users' },
  { id: 'errors', label: 'Errors' },
]

const Dasboard = () => {
  const navigate = useNavigate()
  const [active, setActive] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
      <div className="flex">
        {/* Left aside menu (glass) */}
        <aside className="hidden md:flex flex-col w-64 h-screen p-6 gap-6 bg-white/5 backdrop-blur-md border-r border-white/10 sticky top-0">
          <div className="text-2xl font-semibold tracking-tight">MyPanel</div>

          <nav className="flex-1 flex flex-col gap-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`text-left w-full px-3 py-2 rounded-md transition-colors ${active === item.id ? 'bg-white/10 text-white' : 'text-gray-200 hover:bg-white/5'}`}>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto">
            <button onClick={() => navigate('/')} className="w-full px-3 py-2 rounded-md bg-red-600 text-white">Exit</button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto max-h-screen">
          <div className="max-w-6xl mx-auto">
            <header className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-semibold">Dashboard</h1>
                <p className="text-sm text-gray-300">Created by Kavivarman S</p>
              </div>
            </header>

            {active === 'dashboard' && (
              <>
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="text-xs text-gray-300">Total Users</div>
                    <div className="text-2xl font-semibold mt-2">12.4K</div>
                  </div>

                  <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="text-xs text-gray-300">Active Now</div>
                    <div className="text-2xl font-semibold mt-2">312</div>
                  </div>

                  <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="text-xs text-gray-300">Errors</div>
                    <div className="text-2xl font-semibold mt-2 text-red-400">3</div>
                  </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                    <h2 className="text-lg font-medium mb-4">Traffic Overview</h2>
                    <div className="h-52 rounded bg-white/3 border border-dashed border-white/6 flex items-center justify-center text-gray-300">Chart placeholder</div>
                  </div>

                  <aside className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                    <h3 className="font-medium mb-3">Recent Activity</h3>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex justify-between"><div>Ava — Created project</div><div className="text-xs text-gray-400">2m</div></li>
                      <li className="flex justify-between"><div>Liam — Deployed</div><div className="text-xs text-gray-400">5m</div></li>
                      <li className="flex justify-between"><div>Noah — Commented</div><div className="text-xs text-gray-400">12m</div></li>
                    </ul>

                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-2">To‑Do</h4>
                      <div className="p-3 rounded border border-dashed border-white/6 text-sm text-gray-300">Add your tasks here later.</div>
                    </div>
                  </aside>
                </section>
              </>
            )}

            {active === 'users' && (
              <section className="mb-6">
                <Users />
              </section>
            )}

            {active === 'errors' && (
              <div className="p-6 rounded-lg bg-white/5 border border-white/10">Errors panel placeholder</div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dasboard
