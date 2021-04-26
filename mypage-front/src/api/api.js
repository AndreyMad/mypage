import axios from "axios";

// const ip = 'https://jwebdev.pro'
const ip = "http://localhost:80";

export function getDots() {
  return axios.post(`${ip}/boyar/api/getDots`);
}

export const createDot = (data) => {
   return axios.post(`${ip}/boyar/api/addDot`, { data })
  };
  
export const deleteDot = (id) => {
 return axios.post(`${ip}/boyar/api/deleteDot`, { id })
};


export const editDot = (dot) => {
 return axios.post(`${ip}/boyar/api/editDot`, { dot })
  }
export const boyarAuthorization = (user)=>{
  return axios.post(`${ip}/boyar/api/authorization`, {user})
}

export const boyarCheckSession = (token)=>{
  return axios.post(`${ip}/boyar/api/checksessiontoken`, {token})
}