export const todoBaseURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/todo`
export const usersBaseURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/users`
export const config = {
  headers: {
    "Authorization": `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`
  }
}

