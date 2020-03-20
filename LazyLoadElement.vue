<template>
    <div>
        <i v-if="isShowLoading" class="fa fa-spinner fa-spin text-info"></i>
        <div v-html="content"></div>
    </div>
</template>
<script>
    export default {
        props: {
            content: String,
            timeout: {type: Number, default: 5000},
        },
        computed: {
            hasContent () {
                return this.content;
            },
            isShowLoading () {
                return !this.hasContent && !this.isTimeout;
            }
        },
        data() {
            return {
                isTimeout: false,
            };
        },
        mounted() {
            setTimeout(() => {
                if (!this.hasContent) {
                    this.isTimeout = true;
                }
            }, this.timeout);
        },
    }
</script>
