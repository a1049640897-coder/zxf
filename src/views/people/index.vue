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
            label="酒店"
            prop="hotelId"
            width="300"
          />
          <el-table-column
            label="评论人"
            prop="name"
            width="300"
          />
          <el-table-column
            label="评论内容"
            prop="content"
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
  </div>
</template>

<script>
import { getList, deletList, getUser } from '@/api/comments/index';
export default {
  name: 'Index',
  components: {

  },
  data() {
    return {
      uploadIsShow: true,
      sizeForm: {},
      dialogImageUrl: '',
      dialogVisible: false,
      tableData: [],
      addTitle: '网红民宿增加',
      param: {
        type: 3,
        pageNo: 1,
        pageSize: 6
      },
      pageCount: 1,
      loading: true,
      title: '网红民宿编辑',
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

    async  fetchData() {
      this.loading = true;
      await getList(this.param).then(res => {
        const { pageCount, data } = res;
        this.pageCount = pageCount;
        this.dealData(data);
      });
    },

    async dealData(data) {
      try {
        for (const item of data) {
          await getUser({ id: item.userId }).then(res => {
            item.name = res.data.name;
          });
        }
        this.tableData = data;
        this.loading = false;
      } catch (e) {
        console.error(e);
      }
    },

    pageChange(e) {
      this.param.pageNo = e;
    },

    handleDelete(index, row) {
      this.$confirm('你确定要删' + row.id + '嘛?')
        .then(_ => {
          deletList({ id: row.id }).then(res => {
            this.dialogIsShow = false;
            this.fetchData();
            this.$message({
              message: '删除成功啦!',
              type: 'success'
            });
          });
        })
        .catch(_ => {

        });
    },

    closeEdit() {
      this.dialogIsShow = false;
      this.addIsShow = false;
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
