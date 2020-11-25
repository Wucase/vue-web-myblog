import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const ReginonId = 'regionid'

export function setToken(token){
  Cookies.set(TokenKey, token)
} 

export function getToken(){
  return Cookies.get(TokenKey)
}