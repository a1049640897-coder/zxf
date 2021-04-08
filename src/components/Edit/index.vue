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
        <el-button v-if="type" type="primary" @click="confirmEdit">确 定</el-button>
        <el-button v-else type="primary" @click="confirmAdd">确 定</el-button>
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
    },
    type: {
      type: Boolean,
      default: true
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

    confirmAdd() {
      this.$emit('addList');
    },
    handleClose(done) {
      this.$emit('closeEdit');
    }
  }
};
</script>

<style scoped>

</style>
