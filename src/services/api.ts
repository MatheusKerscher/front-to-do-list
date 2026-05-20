import axios from 'axios'

const envUrl: string = import.meta.env.VITE_API_URL ?? ''
// Se for URL absoluta, usa string vazia para o proxy do Vite interceptar
const baseURL = envUrl.startsWith('http') ? '' : envUrl

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

export default api
