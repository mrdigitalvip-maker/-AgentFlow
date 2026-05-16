import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PricingPage from './pages/PricingPage'
import Dashboard from './pages/Dashboard'
import AgentsPage from './pages/AgentsPage'
import CreateAgent from './pages/CreateAgent'
import AgentChat from './pages/AgentChat'
import Settings from './pages/Settings'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/pricing" element={<PricingPage />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/agents" element={<ProtectedRoute><AgentsPage /></ProtectedRoute>} />
          <Route path="/agents/create" element={<ProtectedRoute><CreateAgent /></ProtectedRoute>} />
          <Route path="/agents/:id/chat" element={<ProtectedRoute><AgentChat /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import AgentsPage from './pages/AgentsPage'
import CreateAgent from './pages/CreateAgent'
import AgentChat from './pages/AgentChat'
import PricingPage from './pages/PricingPage'
import SettingsPage from './pages/SettingsPage'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/pricing" element={<PricingPage />} />

				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/agents"
					element={
						<ProtectedRoute>
							<AgentsPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/agents/create"
					element={
						<ProtectedRoute>
							<CreateAgent />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/agents/:id/chat"
					element={
						<ProtectedRoute>
							<AgentChat />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/settings"
					element={
						<ProtectedRoute>
							<SettingsPage />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}
