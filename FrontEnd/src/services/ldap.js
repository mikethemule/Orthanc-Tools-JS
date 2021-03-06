import { toastifyError, toastifySuccess } from './toastify'

const ldap = {

    async setLdapSettings(LdapSettings){
      const setLdapSettingsOption = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(LdapSettings)
      };

        return fetch("/api/ldap/settings/", setLdapSettingsOption ).then((answer) => {
            if (!answer.ok) { throw answer }
            toastifySuccess('Settings updated')
            return (answer.json())
          }).catch(error => toastifyError(error))
    },

    async getLdapSettings() {

      const getLdapSettingsOption =  {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }

        return fetch("/api/ldap/settings/", getLdapSettingsOption ).then((answer) => {
            if (!answer.ok) { throw answer }
            return (answer.json())
          }).catch(error => toastifyError(error))
    },

    async testLdapSettings() {

      const testLdapSettingsOption =  {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }

        return fetch("/api/ldap/test", testLdapSettingsOption ).then(async (answer) => {
            if (!answer.ok) { throw answer }
            let ans = await answer.json()
            if(ans) {
              toastifySuccess('Connexion established')
            } else {
              toastifyError('connexion failed')
            }
            return
          }).catch(error => toastifyError('connexion failed'))
    },

    async createMatch(Match){

        const createMatchOption = {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([Match])
        };
  
          return fetch("/api/ldap/matches/", createMatchOption ).then((answer) => {
              if (!answer.ok) { throw answer }
              toastifySuccess('Correspodence create with success')
              return (answer.json())
            }).catch(async error => {
              let errorText = await error.text()
              toastifyError(errorText)
            })
      },
      
    async deleteMatch(Match){
      const deleteMatchOption = {
            method: 'DELETE',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({correspodence:Match})
        };
    
            return fetch("/api/ldap/matches/", deleteMatchOption ).then((answer) => {
                if (!answer.ok) { throw answer }
                    toastifySuccess('Match deleted with success')
                    return (answer.json())
            }).catch(error => toastifyError(error))
        }, 
        
    async getAllCorrespodences() {

      const getAllCorrespodencesOption =  {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }

        return fetch("/api/ldap/matches/", getAllCorrespodencesOption ).then(async (answer) => {
            if (!answer.ok) { throw answer }
            return await (answer.json())
          }).catch(error => toastifyError(error))
    },

    async getAllGroupName() {
      const getAllCorrespodencesOption =  {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }

        return fetch("/api/ldap/groupname/", getAllCorrespodencesOption ).then(async (answer) => {
            if (!answer.ok) { throw answer }
            let ans = await answer.json()
            return (ans)
          }).catch(error => toastifyError(error))
    }
}

export default ldap