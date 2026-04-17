const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export interface ContactPayload {
  name: string
  email: string
  phone?: string
  subject: string
  budget?: string
  message: string
}

export async function submitContact(payload: ContactPayload): Promise<{ id: string; message: string }> {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Request failed: ${res.status}`)
  }

  return res.json()
}
