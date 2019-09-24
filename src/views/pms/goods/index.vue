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
    <el-dialog
      title="添加"
      :visible.sync="editSkuInfo.dialogVisible"
      top="1vh"
      width="70%">
      <el-form :model="banner"
               label-width="150px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="banner名称:" prop="name">
              <el-input v-model="banner.name"></el-input>
         </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="链接地址:" prop="url">
              <el-input v-model="banner.url"></el-input>
         </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="商品图片:" prop="name">
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
        </el-col>


        <el-col :span="12">
          <el-form-item label="banner图片:" prop="name">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUploadbannerpic">
                <img v-if="banner.pic" :src="banner.bannerpic" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
         </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="活动价格:" prop="promotionprice">
              <el-input v-model="banner.promotionprice"></el-input>
         </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="标签:" prop="tag">
              <el-input v-model="banner.tag"></el-input>
         </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="价格:" prop="price">
              <el-input v-model="banner.price"></el-input>
         </el-form-item>
        </el-col>
        <el-col :span="12">
         <el-form-item label="描述:" prop="promotionprice">
              <el-input v-model="banner.descption"></el-input>
         </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="是否BANNER" prop="price">
           <el-select v-model="banner.isbanner" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
           <el-form-item label="大图:" prop="name">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUploadbigpic">
                <img v-if="banner.pic" :src="banner.bigpic" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
         </el-form-item>
        </el-col>     
      </el-row>

      <el-row>
        <el-col :span="6" :offset="1">
           <el-button type="primary" @click="addDetail(1)">添加详情</el-button>
        </el-col>
        <el-col :span="6">
           <el-button type="primary" @click="addDetail(2)">添加参数</el-button>
        </el-col>
        <el-col :span="6">
           <el-button type="primary" @click="addDetail(3)">添加测评</el-button>
        </el-col>      
      </el-row>

    <el-row>
      <p>详情</p>     
    </el-row>
    <el-table ref="detailList"
        :data="detailList"
        style="width: 100%"
        v-loading="listLoading"
        border>
        <el-table-column label="排序号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="图片" width="960" align="center">
          <template slot-scope="scope"><img style="height:210px" :src="scope.row.url"></template>
        </el-table-column>
      </el-table>

     <el-row>
      <p>参数</p>     
    </el-row>
      <el-table ref="paramList"
        :data="paramList"
        style="width: 100%"
        v-loading="listLoading"
        border>
        <el-table-column label="排序号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="图片" width="960" align="center">
          <template slot-scope="scope"><img style="height:210px" :src="scope.row.url"></template>
        </el-table-column>
      </el-table>
     <el-row>
      <p>测评</p>     
    </el-row>
      <el-table ref="measurementList"
        :data="measurementList"
        style="width: 100%"
        v-loading="listLoading"
        border>
        <el-table-column label="排序号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="图片" width="960" align="center">
          <template slot-scope="scope"><img style="height:210px" :src="scope.row.url"></template>
        </el-table-column>
      </el-table>

    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSkuInfo.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDate">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="添加"
        :visible.sync="goodDetail"
        top="1vh"
        width="70%">
        <el-form :model="detailInfo"
                label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="排序号" prop="url">
                <el-input v-model="detailInfo.sort"></el-input>
          </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="图片:" prop="name">
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUploadDetailTings">
                  <img v-if="banner.pic" :src="detailInfo.url" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
          </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="goodDetail = false">取 消</el-button>
        <el-button type="primary" @click="addDetailToBbject">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import {uploadImage,addData,getDataByPage,deleteGoods} from '@/api/goods'
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
            url:"",
            bannerpic:'',
            isbanner:'',
            bigpic:'',
            descption:"",
            price:"",
            promotionprice:"",
            tag:"",
            listdetail:[],
            listparam:[],
            listmeasurement:[]
        },
        detailInfo:{
           url:'',
           sort:''
        },
        goodDetail:false,
        options: [{
          value: '0',
          label: '否'
        }, {
          value: '1',
          label: '是'
        }],
        detailList:[],
        paramList:[],
        measurementList:[],
        operateType: null,
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        addType:'',
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
      addDetail(param){
        this.goodDetail = true
        this.addType = param
      },
      addDetailToBbject(addType){
        debugger
        let detailInfox = {
           url:'',
           sort:''
        }
        detailInfox.url = this.detailInfo.url
        detailInfox.sort = this.detailInfo.sort
        if(this.addType == 1){
          this.detailList.push(detailInfox)
        }else if(this.addType == 2){
          this.paramList.push(detailInfox)
        }else{
          this.measurementList.push(detailInfox)
        }
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
        debugger
      const param = {
              id:this.banner.id,
              pic:this.banner.pic,
              name:this.banner.name,
              url:this.banner.url,
              descption:this.banner.descption,
              price:this.banner.price,
              promotionprice:this.banner.promotionprice,
              tag:this.banner.tag,
              banner:this.banner.bannerpic,
              isbanner:this.banner.isbanner,
              goodDetail:this.detailList,
              goodParam:this.paramList,
              bigpic:this.banner.bigpic,
              goodsMeasurement:this.measurementList,
          }
          console.log(JSON.stringify(param));
        addData(param).then(response => {
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

       beforeAvatarUploadbannerpic(file) {
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
            this.banner.bannerpic = response.msg;
        });
      },

      beforeAvatarUploadDetailTings(file) {
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
            this.detailInfo.url = response.msg;
        });
      },

      beforeAvatarUploadbigpic(file) {
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
            this.banner.bigpic = response.msg;
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
    width:  300px;
    height: 300px;
    display: block;
  }
</style>>


