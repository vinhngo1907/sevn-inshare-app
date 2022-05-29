<template>
    <div class="progress-container" 
        v-bind:style="startUpload ? 'display: block;' : 'display: none;'"
    >
        <div class="bg-progress" 
        v-bind:style="{ transform: 'scaleX('+ percentage/100 + ')' }"
        ></div>

        <div class="inner-container">
            <div class="status">
                <!-- {(percentage && percentage / 100 !== 1) ? "Uploading..." : "Uploaded"} -->
                <!-- {{percentage && percentage/100 !==1? "Uploading..." : "Uploaded"}} -->
                {{ percentage }} {{ percentage/100!==1 ? 'Uploading...' : 'Uploaded'}}

            </div>
            <div class="percent-container">
                <span class="percentage" id="progressPercent">
                    {{percentage+'%'}}
                </span>
            </div>
            <div class="progress-bar" v-bind:style="{ transform: 'scaleX('+ percentage/100 + ')' }" ></div>
        </div>
    </div>
</template>

<script>

// style="transform:scaleX(1)"
export default {
    name: 'ProgressBar',
    props: ['percentage','startUpload'],
}
</script>