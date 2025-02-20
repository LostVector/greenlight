import Application from './application'
import IpcConsoles from './ipc/consoles'
import IpcStore from './ipc/store'
import IpcStreaming from './ipc/streaming'
import IpcApp from './ipc/app'

import { ipcMain } from 'electron'

interface IpcChannels {
    streaming: IpcStreaming,
    store: IpcStore,
    consoles: IpcConsoles,
    app: IpcApp,
}

export default class Ipc {

    _application:Application

    _channels:IpcChannels

    constructor(application:Application){
        this._application = application

        this._channels = {
            streaming: new IpcStreaming(this._application),
            store: new IpcStore(this._application),
            consoles: new IpcConsoles(this._application),
            app: new IpcApp(this._application),
        }

        for(const channel in this._channels){
            ipcMain.on(channel, (event, args) => { this._channels[channel].onEvent(channel, event, args) })
        }
        
    }

    // sendIpc(name, value){
    //     this._application._mainWindow.webContents.send(name, value)
    // }
}