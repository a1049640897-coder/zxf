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
            width="50"
          />
          <el-table-column
            label="标题"
            prop="title"
            width="50"
          />
          <el-table-column
            label="标题头像"
            width="180"
          >
            <template slot-scope="scope">
              <el-image
                fit="fill"
                :src="scope.row.titleImg"
                :preview-src-list="scope.row.titleImgList"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="内容"
            prop="content"
            width="50"
          />
          <el-table-column
            label="内容图片"
            width="180"
          >
            <template slot-scope="scope">
              <el-image
                fit="fill"
                :src="scope.row.contentImg"
                :preview-src-list="scope.row.contentImgLis"
              />
            </template>
          </el-table-column>
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
      sds
    </Edit>
  </div>
</template>

<script>
import { getList } from '@/api/dormitory/index';
import Edit from '@/components/Edit/index';
export default {
  name: 'HotDormitory',
  components: {
    Edit
  },
  data() {
    return {
      tableData: [],
      param: {
        type: 2,
        pageNo: 1,
        pageSize: 6
      },
      pageCount: 1,
      loading: true,
      title: '网红民宿编辑',
      dialogIsShow: false
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
    fetchData() {
      this.loading = true;
      getList(this.param).then(res => {
        console.info('网红民宿', res);
        const { pageCount, data } = res;
        this.handleData(data);
        this.pageCount = pageCount;
        this.loading = false;
      });
    },

    handleData(data) {
      data.forEach((v, i) => {
        const newObj = v;
        for (const key in newObj) {
          if (!newObj[key]) {
            newObj[key] = '';
          }
        }
      });

      data.forEach((v, i) => {
        const contentImgList = [];
        const titleImgList = [];
        contentImgList.push(v.contentImg);
        titleImgList.push(v.titleImg);
        v.contentImgLis = contentImgList;
        v.titleImgList = titleImgList;
      });
      this.tableData = data;
      console.info('处理后的数据', data);
    },

    pageChange(e) {
      this.param.pageNo = e;
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style lang="scss" scoped>
  .box-card {
    margin: 10px;
    .footer-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
  }
</style>
