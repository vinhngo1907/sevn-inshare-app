<template>
    <div class="sharing-container" v-bind:style="send ? 'display: block;' : 'display: none;'">
        <p class="expire">Link expires in 24 hrs</p>
        <div class="input-container">
            <input type="text" id="fileURL" readOnly name="fileURL" :value="link" />
            <img :src="require('../assets/copy-icon.svg')" id="copyURLBtn" alt="copy to clipboard icon"
                @click="handleCopyLink" />
        </div>
        <p class="email-info">Or Send via Email</p>
        <div class="email-container">
            <form id="emailForm" @submit="handleSubmit">
                <div class="filed">
                    <label for="fromEmail">Your email</label>
                    <input type="text" autoComplete="email" name="fromEmail" id="fromEmail" v-model="fromEmail" />
                </div>

                <div class="filed">
                    <label for="toEmail">Receiver's email</label>
                    <input type="text" autoComplete='receiver' name="toEmail" id="toEmail" v-model="toEmail" />
                </div>
                <div class="send-btn-container">
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { APIUrl } from '@/utils/constans';
import axios from 'axios'
import { valid } from '../utils/fileUpload'
export default {

    name: 'SendForm',
    props: ['send', 'link', 'uuid'],
    data() {
        return {
            fromEmail: '',
            toEmail: '',
            downloadLink: ''
        }
    },

    methods: {
        handleCopyLink() {
            navigator.clipboard.writeText(`${this.link}`)
        },
        async handleSubmit(e) {
            e.preventDefault();
            const err = valid(this.fromEmail, this.toEmail);
            if (err) { return alert(err) }
            try {
                const res = await axios.post(`${APIUrl}/files/send`, {
                    uuid: this.uuid,
                    fromEmail: this.fromEmail,
                    toEmail: this.toEmail
                }, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    alert(res.data.msg);
                    // this.send = false;
                    this.fromEmail = '';
                    this.toEmail = '';
                }

            } catch (err) {
                console.log(err);
                // alert(err.response.data.msg)
                alert(err.response.data ? err.response.data.msg : err)
            }

        }
    },

}
</script>