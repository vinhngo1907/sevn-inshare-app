import DropZone from './components/DropZone'
import DonwloadFile from './components/DownloadFile'
export const routes = [
    { path: '/', name: 'DropZone', component: DropZone },
    { path: '/files/file/:uuid', name: 'DownloadFile', component: DonwloadFile }
]