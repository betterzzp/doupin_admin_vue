<template> 
  <div class="app-container">
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
        <el-table-column label="banner名称" width="100" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="商品图片" width="960" align="center">
          <template slot-scope="scope"><img style="height:210px" :src="scope.row.pic"></template>
        </el-table-column>
        <el-table-column label="链接url" align="center">
          <template slot-scope="scope">
           {{scope.row.url}}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleAdd()"
        type="primary"
        size="small">
        添加
      </el-button>
    </div>
    <!--
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
    -->
    <p>{{banner.name}}</p>
    <el-dialog
      title="添加"
      :visible.sync="editSkuInfo.dialogVisible"
      width="70%">
      <el-form :model="banner"
               label-width="150px">
      <el-row>
         <el-form-item label="banner名称:" prop="name">
              <el-input v-model="banner.name"></el-input>
         </el-form-item>
      </el-row>

      <el-row>
          <el-form-item label="banner图片:" prop="name">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="banner.pic" :src="banner.pic" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
         </el-form-item>
      </el-row>

      <el-row>
         <el-form-item label="链接地址:" prop="url">
              <el-input v-model="banner.url"></el-input>
         </el-form-item>
      </el-row>


      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSkuInfo.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {uploadImage,addData,getDataByPage,deleteBanner} from '@/api/banner'
const defaultListQuery = {
  keyword: null,
  pageNum: 1,
  pageSize: 5,
  publishStatus: null,
  verifyStatus: null,
  productSn: null,
  productCategoryId: null,
  brandId: null
};
  export default {
    name: "productList",
    data() {
      return {
        editSkuInfo:{
          dialogVisible:false,
        },
        banner:{
            id:"",
            name:"",
            pic:"",
            //status:"",
            url:""
        },
        operates: [
          {
            label: "商品上架",
            value: "publishOn"
          },
          {
            label: "商品下架",
            value: "publishOff"
          },
          {
            label: "设为推荐",
            value: "recommendOn"
          },
          {
            label: "取消推荐",
            value: "recommendOff"
          },
          {
            label: "设为新品",
            value: "newOn"
          },
          {
            label: "取消新品",
            value: "newOff"
          },
          {
            label: "转移到分类",
            value: "transferCategory"
          },
          {
            label: "移入回收站",
            value: "recycle"
          }
        ],
        operateType: null,
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        selectProductCateValue: null,
        multipleSelection: [],
        productCateOptions: [],
        brandOptions: [],
        publishStatusOptions: [{
          value: 1,
          label: '上架'
        }, {
          value: 0,
          label: '下架'
        }],
        verifyStatusOptions: [{
          value: 1,
          label: '审核通过'
        }, {
          value: 0,
          label: '未审核'
        }]
      }
    },
    created() {
      this.getList();
    },
    watch: {
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length == 2) {
          this.listQuery.productCategoryId = newValue[1];
        } else {
          this.listQuery.productCategoryId = null;
        }
      }
    },
    filters: {
      verifyStatusFilter(value) {
        if (value === 1) {
          return '审核通过';
        } else {
          return '未审核';
        }
      }
    },
    methods: {
      getList() {
        this.listLoading = true;
        getDataByPage(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.data.total;
        });
      },
      handleAdd(){
          this.editSkuInfo.dialogVisible = true;
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },    
      addDate(){
        addData(this.banner).then(response => {
            console.log("hello world");
        });
      },
      handleAvatarSuccess(res, file) {
        this.banner.pic = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        let formData = new FormData();
        formData.append("file", file);
        uploadImage(formData).then(response => {
            console.log("hello world");
            this.banner.pic = response.msg;
        });
      },

      handleDelete(index, row) {
        this.$confirm('是否要删除该品牌', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteBanner(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },


    }
  }
</script>
<style scoped>
.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 60%;
}
.el-form-item__content{
    line-height: 40px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width:  814px;
    height: 178px;
    display: block;
  }
</style>>


