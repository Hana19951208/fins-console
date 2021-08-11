<template>
  <div v-loading="imageLoading" element-loading-text="请稍等，图片上传中" class="edit_container" style="position: relatice">
    <quill-editor :disabled="disabled" :options="quillOption" ref="myQuillEditor" :content="content" @change="onEditorChange($event)" />
    <span class="activity-desc" v-if="numberOfWords > 0">{{ wordLength }}/{{ numberOfWords }}</span>

    <!-- 文件上传input 将它隐藏-->
    <el-upload
      style="display: none"
      :action="imageUploadAction"
      :show-file-list="false"
      :data="uploadData"
      name="attachMentFile"
      accept=".jpg,.jpeg,.png,.gif,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP"
      :before-upload="beforeFileUpload"
      :on-success="fileUploadSuccess"
      ref="uniqueId"
      id="uniqueId"
    >
    </el-upload>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { Quill, quillEditor } from 'vue-quill-editor'
import { addQuillTitle } from './quill-title.js'
import quillConfig from './quill-config.js'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      content: '',
      wordLength: 0,
      quillOption: quillConfig,
      imageLoading: false,
    }
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    numberOfWords: {
      type: Number,
      default: () => 0,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  watch: {
    value: function (val) {
      this.content = val
    },
    // disabled: function (val) {
    //   this.$nextTick(() => {
    //     this.$refs.myQuillEditor.enable(!val)
    //   })
    // }
  },
  computed: {
    // 获取token
    uploadData() {
      return { token: getToken() }
    },
    // 公共上传文件路径配置，可根据项目配置公共文件接口路径
    imageUploadAction() {
      return process.env.PREFIX_URL + '/common/uploadFile'
    },
  },
  mounted() {
    quillConfig.register(Quill)
    quillConfig.initButton() // 自定义源代码编辑方法
    // 上传图片实例
    var imgHandler = async function (state) {
      if (state) {
        var fileInput = document.querySelector('#uniqueId input') //隐藏的file元素
        fileInput.click() //触发事件
      }
    }
    // 加入上传图片实例
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', imgHandler)
    this.$nextTick(() => {
      addQuillTitle() // 标题配置及提示
      if (this.placeholder) {
        this.$set(this.quillOption, 'placeholder', this.placeholder)
        this.$forceUpdate()
      }
    })
  },
  methods: {
    // 文本改变时赋值
    onEditorChange({ editor, html, text }) {
      this.content = html
      // 控制输入长度
      if (this.numberOfWords > 0) {
        this.$refs.myQuillEditor.quill.deleteText(this.numberOfWords, 4)
        if (!this.content) {
          this.wordLength = 0
        } else {
          this.wordLength = this.$refs.myQuillEditor.quill.getLength() - 1
        }
      }
      this.$emit('change', this.content)
    },
    // 根据光标位置插入内容--授权书模板处用
    cursorPositioningInsert(val) {
      let quill = this.$refs.myQuillEditor.quill
      let length = this.$refs.myQuillEditor.quill.selection.savedRange.index
      quill.insertEmbed(length, val)
      quill.setSelection(length + val.length)
    },
    // 上传图片前开启loading
    beforeFileUpload() {
      this.imageLoading = true
    },
    // 插入图片
    fileUploadSuccess(res) {
      if (res.errCode && res.errCode == '-1') {
        let data = res.data
        // 获取光标
        let addImgRange = this.$refs.myQuillEditor.quill.getSelection()
        // 根据光标位置插入图片
        this.$refs.myQuillEditor.quill.insertEmbed(addImgRange != null ? addImgRange.index : 0, 'image', data.url, Quill.sources.USER)
        // 调整光标到最后
        this.$refs.myQuillEditor.quill.setSelection(addImgRange.index + 1)
      }
      this.imageLoading = false
    },
  },
}
</script>
<style>
.ql-editor {
  height: 400px;
}
</style>
<style scoped>
.activity-desc {
  position: absolute;
  right: 20px;
  bottom: 0;
}
</style>
