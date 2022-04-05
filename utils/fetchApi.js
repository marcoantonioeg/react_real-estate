import axios from "axios";

 export const baseUrl = 'https://bayut.p.rapidapi.com'
 //funcitno para obtener los datos de la api 
 export const fetchApi = async (url)=>{
     const {data} = await axios.get((url), {
        headers: {
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
            'X-RapidAPI-Key': '76deeb9a15mshfe2ffecb169eb1ep1c49a3jsnc5a4df3ef8d3'
          }
     })
     return data;
 }