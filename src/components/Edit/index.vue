<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <div>
        <slot />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    };
  },
  methods: {

    cancelEdit() {
      this.$emit('closeEdit');
    },
    confirmEdit(done) {
      this.$confirm('确认要修改吗？')
        .then(_ => {
          this.$emit('updateList');
        })
        .catch(_ => {
        });
    },
    handleClose(done) {
      this.$emit('closeEdit');
    }
  }
};
</script>

<style scoped>

</style>
