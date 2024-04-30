// pages/api/proxy.js

export default async function handler(req, res) {
    const response = await fetch('http://localhost:8080/api/pkmn/search');
    const data = await response.json();
    
    res.status(200).json(data);
  }
  