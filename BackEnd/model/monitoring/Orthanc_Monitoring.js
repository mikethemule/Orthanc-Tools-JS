const Orthanc = require('../Orthanc')
const EventEmitter = require('events').EventEmitter;

class Orthanc_Monitoring extends EventEmitter {
    
    constructor () {
        super()
        this.orthanc = new Orthanc()
        this.done = false
        this.last = 0
    }

    monitoringService = {
        cdBurner: false
    }

    async startMonitoringifNeeded () {
        //If already started skip
        if(this.monitoringRunning) return

        let startedServiceArray = Object.keys(this.monitoringService).filter(service=> (this.monitoringService[service] ===true) )

        if(startedServiceArray.length >0 ){
            this.monitoringRunning = true
            //Get last change number at monitoring startup (monitoring will start at this index)
            let changes = await this.orthanc.getChangesLast()
            this.last = changes.Last
            this.monitoringInterval = setInterval(()=>{this.makeMonitor()}, 2000)

        }
        
    }

    startMonitoringService(serviceName){
        this.monitoringService[serviceName] = true
        this.startMonitoringifNeeded()
    }

    stopMonitoringService(serviceName){
        this.monitoringService[serviceName] = false
        this.stopMonitoringIfNeeded()
    }

    stopMonitoringIfNeeded (){
        if(!this.monitoringRunning) return

        let startedServiceArray = Object.keys(this.monitoringService).filter(service=> (this.monitoringService[service] ===true) )
        if(startedServiceArray.length === 0 ){
            this.monitoringRunning = false
            clearInterval(this.monitoringInterval)
        }

    }

    async makeMonitor() {
        console.log(this.last)
        do {
            await this._parseOutput(this.last);
        }
        while(!this.done);
        
    }

    async _parseOutput(last) {
        
        let changes
        try {
            changes = await this.orthanc.getChanges(last)
        } catch (err) {
            console.log(err)
        }
        
        let changesArray=changes.Changes;

        changesArray.forEach( (changeEvent) => {
            let orthancID = changeEvent.ID
            let changeType = changeEvent.ChangeType
            this.emit(changeType, orthancID)
        }) 
        
        this.last = changes.Last
        this.done = changes.Done
    }
        
}

const MONITORING_SERVICE_CDBURNER = "CdBurner"

module.exports = Orthanc_Monitoring