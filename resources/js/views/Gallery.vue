<template>
    <div>
        <div class="card">
            <div class="card-header">
                Gallery
            </div>
            <div class="card-body">
                <div class="row mb-2 p-3">
                    <div id="dropzone-element" class="dropzone col-12"></div>
                </div>
                <div class="row p-3">
                    <div v-for="(file, i) in droppedFiles" :key="i" class="image-block col-4">
                        <img class="image-preview" v-if="file.succeeded" :src="'/' + file.path" />
                        <strong v-else-if="file.isError" class="text-danger"> <span class="error-msg">{{ file.errorMsg }}</span></strong>
                        <strong v-else class="text-success"> {{ file.percentCompleted }}% </strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserAPI from '../services/apis/user'

    export default {
        mounted() {
            this.initDropzone()
            this.fetchImages()
        },
        data() {
            return {
                droppedFiles: [],
            }
        },
        methods: {
            fetchImages() {
                UserAPI.getImages().then(response => {
                    response.data.images.map(image => {
                        this.addDroppedFile(null, image.id, true)
                        this.updateDroppedFiles(image.id, {
                            path: image.path,
                            percentCompleted: 100,
                            succeeded: true
                        })
                    })
                })
            },
            initDropzone() {
                const myDropzone = new Dropzone("#dropzone-element", { 
                    url: "/file/post",
                    autoProcessQueue: false
                });
                const vm = this
                myDropzone.on('addedfile', function (file) {
                    this.removeFile(file)
                    const id = vm.addDroppedFile(file)

                    const { formData, config } = vm.configUploadForm(vm, id, file)
                    UserAPI.uploadImages(formData, config)
                        .then(vm.showSuccessUploaddedImage(vm, id))
                        .catch(vm.showUploadErrorMsg(vm, id))
                })
            },
            updateDroppedFiles(id, updateProps) {
                this.droppedFiles = this.droppedFiles.map(droppedFile => {
                    if (droppedFile.id === id) {
                        return {
                            ...droppedFile,
                            ...updateProps
                        }
                    }
                    return droppedFile
                })
            },
            addDroppedFile(file, id = null) {
                const uniqId = id ? id : Math.floor(Math.random() * 100)
                this.droppedFiles = [...this.droppedFiles, {
                    id: uniqId,
                    file,
                    percentCompleted: 100,
                    path: null,
                    isError: false,
                    succeeded: false,
                    errorMsg: null
                }]

                return uniqId
            },
            showSuccessUploaddedImage(vm, id) {
                return function (response) {
                    vm.updateDroppedFiles(id, {
                        path: response.data.path,
                        succeeded: true
                    })
                }
            },
            showUploadErrorMsg(vm, id) {
                return function (error) {
                    const { response } = error
                    if (response.status === 400 || response.status === 422) {
                        vm.updateDroppedFiles(id, {
                            isError: true,
                            errorMsg: response.data.errorMsg
                        })
                    }
                }
            },
            configUploadForm(vm, id, file) {
                let formData = new FormData()
                formData.append('uploadfile', file)
                const config = {
                    onUploadProgress: function(progressEvent) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        vm.updateDroppedFiles(id, {
                            percentCompleted
                        })
                    }
                }

                return { formData, config}
            }
        },
    }
</script>

<style>
.dz-preview, .dz-file-preview {
    display: none;
}
.image-block {
    height: 240px;
    line-height: 240px;
    text-align: center;
    vertical-align: middle;
    padding: 5px 5px 5px 5px;
}
.image-preview {
    width: 100%;
    height: 100%;
}
.error-msg {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}
</style>
