<template>
    <!-- <img :src="require('../assets/copy-icon.svg')" alt="Inshare logo" class="logo"> -->
    <!-- <h1>Down Load Page</h1> -->
    <section class="download">
        <img class="download__icon" :src="require('../assets/download-sd.svg')" alt="inshare-download">

        <h2>Your file is ready to download</h2>
        <p>Link expires in 24 hours</p>
        <div class="download__meta">
            <h4>{{file.name}}</h4>
            <small>{{(file.size/1000)}} KB</small>
        </div>
        <div class="send-btn-container">
            <a :href="downloadLink">Download file</a>
        </div>
    </section>
    
</template>

<script>
import { APIUrl } from '@/utils/constans';
import axios from 'axios'

export default {
    name:"DownloadFile",
    data(){
        return{
            uuid:this.$route.params.uuid,
            file:{},
            downloadLink:""
        }
    },
    created(){
        this.getFile()
    },
    methods:{
        async getFile(){
            try {
                const res = await axios.get(`${APIUrl}/files/${this.uuid}`);

                if(res.data.success){
                    this.file = res.data.file;
                    this.downloadLink = `${APIUrl}/files/download/${res.data.file.uuid}`
                }
                
            } catch (error) {
                console.log(error);
                alert(error.response.data?error.response.data.msg:error)
            }
        }, 
    }
}
</script>