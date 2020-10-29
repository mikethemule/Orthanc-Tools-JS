
const { toastifyError } = require("./toastify")

const certificates = {
    getCertificatesExpend(){
        return fetch('/api/certificates')
        .then((answer) => {
          if (!answer.ok) { throw answer }
          return (answer.json())
        })
        .catch((error) => {
          toastifyError(error)
        })
    },
    
    deleteCertificate(id){
        return fetch('api/certificates/', {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:id})
          } ).then((answer) => {
            if (!answer.ok) { throw answer }
            return (answer.json())
          })
            .catch((error) => {
              toastifyError(error)
            })
    },

    createCertificate(postData){
        return fetch('api/certificates/create', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
          } ).then((answer) => {
            if (!answer.ok) { throw answer }
            return (answer.json())
          })
            .catch((error) => {
              toastifyError(error)
            })
    },

    async uploadCertificate(id, file){
        console.log(file);
        let fileText = await file.text()
        return fetch('api/certificates/upload/'+id, {
            method: 'POST',
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'text/plain'
            },
            body: fileText
        }).then((answer) => {
            if (!answer.ok) { throw answer }
        }).catch((error) => {
            toastifyError(error)
        })
    }
}

export default certificates