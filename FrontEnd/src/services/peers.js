import { toastifySuccess, toastifyError } from './toastify'

const peers = {

    getPeers(){
        return fetch('/api/peers' )
            .then((answer) => {
                if (!answer.ok) { throw answer }
                return (answer.json())
            })
            .catch((error) => {
                toastifyError(error)
                return []
            })
    },

    getPeersExpand(){
        return fetch('/api/peers?expand' )
            .then((answer) => {
                if (!answer.ok) { throw answer }
                return (answer.json())
            })
            .catch((error) => {
                toastifyError(error)
            })
    },

    updatePeer(name, parameters){

        const updatePeerOption = {
            method: 'PUT', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify(parameters)
        }

        return fetch('/api/peers/'+ name, updatePeerOption ).then((answer) => {
            if (!answer.ok) { throw answer }
            return (answer.json())
        }).catch((error) => {
            toastifyError(error)
        })
    },

    deletePeer(name){

        const deletePeerOption = {
            method: 'DELETE'
        }

        return fetch('/api/peers/' + name, deletePeerOption ).then((answer) => {
            if (!answer.ok) {throw answer}
            return (answer.json())
        }).catch((error) => {
            toastifyError(error)
        })
    },

    echoPeer(peerName){
        fetch ('/api/peers/' + peerName + '/system' ).then(response => {
            if (response.ok) return response.json()
            else throw response
        }).then((response) => {
            toastifySuccess('Version ' + peerName + ' = ' + response.Version)
        }).catch(error => toastifyError('Echo ' + peerName + ' Error'))
    }, 

    storePeer(name, orthancIDsArray){

        const storePeerOption = {
            method: 'POST', 
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Synchronous : false,
                Resources : orthancIDsArray
            })
        }

        return fetch ('/api/peers/' + name + '/store', storePeerOption ).then((answer) => {
            if (!answer.ok) {throw answer}
            return (answer.json())
        }).catch(error => {
            toastifyError(error)
        })
    }
}

export default peers