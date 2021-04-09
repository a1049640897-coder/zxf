<template>
  <div class="main-wrapper">
    <el-card class="box-card">
      <div class="table-wrapper">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          :border="true"
        >
          <el-table-column
            label="id"
            prop="id"
            width="100"
          />
          <el-table-column
            label="姓名"
            prop="name"
            width="300"
          />
          <el-table-column
            label="电话"
            prop="phone"
            width="300"
          />
          <el-table-column
            label="用户名"
            prop="userName"
            width="200"
          />
          <el-table-column
            label="评论时间"
            prop="createTime"
          />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
          <div />
        </el-table>
      </div>
      <div class="footer-wrapper">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="pageCount"
          :current-page="1"
          @current-change="pageChange"
          @next-click="pageChange"
          @prev-click="pageChange"
        />
      </div>
    </el-card>
    <Edit :dialog-visible="dialogIsShow" :title="title" @closeEdit="closeEdit" @updateList="updateList">
      ddsa
    </Edit>
  </div>
</template>

<script>
import { getList, deletList, updateList } from '@/api/users/index';
import Edit from '@/components/Edit/index';
export default {
  name: 'Index',
  components: {
    Edit
  },
  data() {
    return {
      uploadIsShow: true,
      sizeForm: {},
      dialogImageUrl: '',
      dialogVisible: false,
      tableData: [],
      title: '用户编辑',
      param: {
        type: 3,
        pageNo: 1,
        pageSize: 6
      },
      pageCount: 1,
      loading: true,
      dialogIsShow: false,
      addIsShow: false,
      addForm: {
        type: 3
      }
    };
  },
  watch: {
    param: {
      handler(newVal, oldVal) {
        this.fetchData();
      },
      deep: true
    }
  },
  created() {
    this.fetchData();
  },
  methods: {

    closeEdit() {
      this.dialogIsShow = false;
    },

    updateList() {
      updateList(this.formInline).then(res => {
        console.info('res', res);
        const { code } = res;
        if (code === 200) {
          this.dialogIsShow = false;
        }
      });
    },

    async  fetchData() {
      this.loading = true;
      try {
        await getList(this.param).then(res => {
          const { data } = res;
          this.tableData = data;
          this.loading = false;
        });
      } catch (e) {
        console.error(e);
      }
    },

    pageChange(e) {
      this.param.pageNo = e;
    },

    handleEdit(index, row) {
      console.info('编辑', row);
      this.dialogIsShow = true;
    },

    handleDelete(index, row) {
      this.$confirm('你确定要删' + row.id + '嘛?')
        .then(_ => {
          deletList({ id: row.id }).then(res => {
            this.$message({
              message: '删除成功啦!',
              type: 'success'
            });
            this.fetchData();
          });
        })
        .catch(_ => {
        });
    }
  }
};
</script>

<style lang="scss" scoped>
  .main-wrapper {
    .box-card {
      margin: 10px;
      .add-btn-wrapper {
        display: flex;
        justify-content: flex-end;
        margin: 0px 0px 10px 0px;
      }
      .footer-wrapper {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
      }
    }
    .edit-contanier {
      /*background-color: red;*/
    }
  }

</style>
