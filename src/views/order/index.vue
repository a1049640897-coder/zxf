<template>
  <div class="order-container">
    <el-card class="box-card">
      <el-table
        v-loading="loading"
        :data="search?filterTableData:tableData"
        style="width: 100%"
        :border="true"
      >
        <el-table-column
          label="id"
          prop="id"
        />
        <el-table-column
          label="订单id"
          prop="orderId"
        />
        <el-table-column
          label="付款"
          prop="totalPay"
        />
        <el-table-column
          label="用户"
          prop="name"
        />
        <el-table-column
          label="入房时间"
          prop="enterTime"
        />
        <el-table-column
          label="入房人数"
          prop="enterCount"
        />
        <el-table-column
          label="退房时间"
          prop="leaveTime"
        />
        <el-table-column
          label="订单评价"
          prop="leaveMessage"
        />
        <el-table-column
          label="创建时间"
          prop="createTime"
        />
        <el-table-column
          align="right"
        >
          /* eslint-disable */
          <template slot="header">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          /* eslint-enable */
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
      </el-table>
      <Edit :dialog-visible="dialogIsShow" :title="title" @closeEdit="closeEdit" @updateList="updateList">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          :label-position="labelPosition"
          label-width="80px"
          style="text-align: center"
        >
          <el-form-item label="id">
            <el-input v-model="formInline.id" disabled />
          </el-form-item>
          <el-form-item label="订单id">
            <el-input v-model="formInline.orderId" />
          </el-form-item>
          <el-form-item label="用户id">
            <el-input v-model="formInline.userId" disabled />
          </el-form-item>
          <el-form-item label="订单总价">
            <el-input v-model="formInline.totalPay" />
          </el-form-item>
          <el-form-item label="入住人数">
            <el-input v-model="formInline.enterCount" />
          </el-form-item>
          <el-form-item label="入住时间">
            <el-date-picker
              v-model="formInline.enterTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-M-d"
            />
          </el-form-item>
          <el-form-item label="退房时间">
            <el-date-picker
              v-model="formInline.leaveTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-M-d"
            />
          </el-form-item>
          <el-form-item label="订单评价">
            <el-input v-model="formInline.leaveMessage" />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="formInline.createTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-M-d"
            />
          </el-form-item>
        </el-form>
      </Edit>
    </el-card>
  </div>
</template>

<script>
import { getList, updateList, deletOrder, getUser } from '@/api/order/index';
import Edit from '@/components/Edit/index';
export default {
  name: 'Index',
  components: {
    Edit
  },
  data() {
    return {
      tableData: [],
      filterTableData: [],
      loading: true,
      search: '',
      dialogIsShow: false,
      title: '订单编辑',
      formInline: {},
      labelPosition: 'top',
      labelWidth: '400px'
    };
  },
  watch: {
    search(newVal, oldVal) {
      if (newVal) {
        const demo = this.tableData.filter(data => {
          for (const key in data) {
            if (data[key] && data[key].toString().includes(newVal)) {
              return true;
            }
          }
        });
        this.filterTableData = demo;
        console.info('测试', demo, newVal);
      }
    }
  },
  created() {
    this.fetchData();
  },
  mounted() {

  },
  methods: {
    // 编辑
    handleEdit(index, row) {
      this.dialogIsShow = true;
      this.formInline = row;
    },

    closeEdit() {
      this.fetchData();
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

    handleDelete(index, row) {
      const param = { id: row.id };
      this.$confirm('你确定要删' + row.id + '嘛?')
        .then(_ => {
          deletOrder(param).then(res => {
            this.$message({
              message: '删除成功啦!',
              type: 'success'
            });
            this.tableData.forEach((v, i) => {
              if (v.id === row.id) {
                this.tableData.splice(i, 1);
              }
            });
          });
        })
        .catch(_ => {

        });
    },

    fetchData() {
      getList().then(response => {
        const { data } = response;
        this.initData(data);
      });
    },

    async initData(data) {
      try {
        // 循环遍历 等待
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
    }
  }
};
</script>

<style  lang="scss" scoped>
  .order-container {
    margin: 10px;
  }
</style>
