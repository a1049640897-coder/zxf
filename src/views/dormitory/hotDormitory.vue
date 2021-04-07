<template>
  <div class="main-wrapper">
    <el-card class="box-card">
      <div class="table-wrapper">
        <div class="add-btn-wrapper">
          <el-button type="primary" icon="el-icon-plus" />
        </div>
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
      <div class="edit-contanier">
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
          <el-form-item label="id">
            <el-input v-model="sizeForm.id" disabled />
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="sizeForm.title" />
          </el-form-item>
          <el-form-item label="标题图片">
            <el-upload
              action="http://121.5.234.80:8899/upload/image"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :limit="1"
              :on-success="handleTitleAvatarSuccess"
              :on-exceed="handleExcceed"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="主内容">
            <el-input v-model="sizeForm.content" type="textarea" />
          </el-form-item>
          <el-form-item label="主图片">
            <el-upload
              action="http://121.5.234.80:8899/upload/image"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :limit="1"
              :on-success="handleContentAvatarSuccess"
              :on-exceed="handleExcceed"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
    </Edit>
  </div>
</template>

<script>
import { getList, updateList, deletList } from '@/api/dormitory/index';
import Edit from '@/components/Edit/index';
export default {
  name: 'HotDormitory',
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

    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.uploadIsShow = true;
    },

    handleExcceed() {
      this.$message({
        message: '单次只能上传一个文件',
        type: 'warning'
      });
    },

    handleTitleAvatarSuccess(res, file) {
      const { data } = res;
      this.sizeForm.titleImg = data;
      this.$message({
        message: '文件上传成功!',
        type: 'success'
      });
    },

    handleContentAvatarSuccess(res, file) {
      const { data } = res;
      this.sizeForm.contentImg = data;
      this.$message({
        message: '文件上传成功!',
        type: 'success'
      });
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    fetchData() {
      this.loading = true;
      getList(this.param).then(res => {
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
    },

    pageChange(e) {
      this.param.pageNo = e;
    },

    updateList() {
      updateList(this.sizeForm).then(res => {
        this.fetchData();
        this.dialogIsShow = false;
      });
    },

    onExcceed() {
      console.info('文件数量超出了');
    },

    handleEdit(index, row) {
      this.dialogIsShow = true;
      this.sizeForm = JSON.parse(JSON.stringify(row));
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
