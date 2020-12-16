<template>
    <div>
        <i v-if="isShowLoading" class="fa fa-spinner fa-spin text-info"></i>
        <slot v-if="!isShowLoading">
            <div v-html="content">
            </div>
        </slot>
    </div>
</template>
<script>
    export default {
        props: {
            content: String,
            timeout: {type: Number, default: 5000},
            watch: {validator: v => true}
        },
        computed: {
            hasContent () {
                return this.content;
            },
            isShowLoading () {
                if (this.isTimeout) {
                    return false;
                }
                if (this.hasContent) {
                    return false;
                }
                if (this.watch) {
                    return false;
                }
                return true;
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
