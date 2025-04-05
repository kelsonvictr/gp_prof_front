import axios from 'axios'

// 👉 Base URL da API centralizada
export const API_BASE_URL = 'https://gp-prof-api.onrender.com'

// 👉 Exemplo com API local (ideal para desenvolvimento local):
// export const API_BASE_URL = 'http://localhost:8080'

/**
 * “Interceptor é como um ‘porteiro’ que intercepta todas as requisições que o front envia para o backend. Se você tiver um token, ele automaticamente coloca esse token no cabeçalho da requisição. Isso evita que a gente tenha que escrever esse código manualmente toda vez.”
 * INTERCEPTOR DE REQUISIÇÃO
 * 
 * Antes de qualquer requisição ser enviada para o backend,
 * esse interceptor é executado automaticamente.
 * 
 * Aqui, estamos pegando o token salvo no localStorage (caso exista)
 * e adicionando ele no cabeçalho da requisição (Authorization).
 * 
 * Isso é essencial para acessar rotas protegidas no backend com segurança.
 */
const instance = axios.create({
  baseURL: API_BASE_URL
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // Recupera o token salvo
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // Adiciona o token no header
    }
    return config // Retorna a configuração modificada da requisição
  },
  (error) => Promise.reject(error) // Caso haja erro ao configurar a requisição
)

export default instance
