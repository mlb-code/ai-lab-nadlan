// Google Apps Script Web App endpoint used to verify enrolled emails
// against the Google Sheet allowlist.
//
// Deploy: see apps-script/README.md
// After deploying, paste the /exec URL below.
export const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT || ''

export const STORAGE_KEY = 'ai-lab-nadlan-auth'
