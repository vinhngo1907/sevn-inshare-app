<template>
    <div class="wrapper">
        <header>File Uploader</header>
        <input class="file-input" id="dropzone-file" type="file" name="file" ref="dropzoneFile" @change="handleFiles"
            hidden 
            accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            >
        <section class='upload-container'>
            <div class="drop-zone" @dragenter.prevent="" @dragover.prevent="" @drop.prevent="handleFiles">
                <form>
                    <label for="dropzone-file">
                        <i class="fas fa-cloud-upload-alt"></i>

                        <p>Browse File to Upload</p>
                    </label>
                </form>
            </div>
            <ProgressBar :percentage="progress" :startUpload="startUpload" :link="downLoadLink"/>
        </section>
        <SendForm  v-if="startSend" :send="startSend" :link="downLoadLink" :uuid="uuid"/>
    </div>
</template>

<script>
import { checkFile } from '../utils/fileUpload'
import axios from 'axios';
import ProgressBar from './ProgressBar.vue';
import SendForm from './SendForm.vue';
import {APIUrl} from "../utils/constans"
export default {
    name: 'DropZone',
    props: ['modelValue'],
    emits: ['update:modelValue'],
    data() {
        return {
            files: [],
            progress: 0,
            startUpload: false,
            startSend: false,
            downLoadLink:'',
            uuid:''
        }
    },
    components: {
        ProgressBar,
        SendForm
    },
    methods: {
        async handleFiles(e) {
            if(this.files.length > 0) this.files = []
            const inputFiles = e.target.files || e.dataTransfer.files || this.$refs.dropzoneFile.files;
            this.files = inputFiles;
            this.$emit('update:modelValue', this.files);
            const err = checkFile(this.files[0]);
            if (err) { return alert(err); }
            else {
                await this.storeFiles(this.files[0])
            }
        },
        async storeFiles() {
            try {
                // e.preventDefault();
                this.startUpload = true;
                const formData = new FormData();
                formData.append('myFile', this.files[0]);
                const res = await axios.post(`${APIUrl}/files`, formData, {
                    onUploadProgress: (event) => {
                        this.progress = Math.round((100 * event.loaded) / event.total)
                    },
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });                
                console.log(res.data);
                if (res.data.success) {
                    this.files = [];
                    setTimeout(() => {
                        this.startUpload = false;
                        this.progress = 0;
                    }, 5000);
                    if (this.progress === 100) {
                        this.startSend = true;
                        this.downLoadLink = `http://localhost:8080/files/file/${res.data.file.uuid}` 
                        this.uuid = res.data.file.uuid
                    }
                }
            } catch (error) {
                console.log(error);
                alert(error.response.data?error.response.data.msg:error)
            }
        }
    }

}
</script>