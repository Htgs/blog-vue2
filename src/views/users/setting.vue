<template>
	<div class="setting mlr-auto">
		<h3 class="txt-c mt-10 mb-10">个人设置</h3>
		<el-form label-width="80px" :model="setting" ref="setting">
			<el-form-item 
				label="性别" 
				prop="gender">
				<el-radio-group v-model="setting.gender">
					<el-radio :label="0">保密</el-radio>
					<el-radio :label="1">男</el-radio>
					<el-radio :label="2">女</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item 
				label="头像上传" 
				prop="avater" 
				>
				<input type="file" placeholder="请输入介绍">
				<!-- <el-upload
					class="avatar-uploader"
					:action="'/static/uploads'"
					:show-file-list="false"
					:auto-upload="false">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload> -->
			</el-form-item>
			<el-form-item 
				label="自我介绍" 
				prop="bio"
				:rules="[
					{ validator: bioValidate, trigger: 'change blur' }
				]">
				<el-input type="textarea" resize="none" :rows="8" v-model="setting.bio" placeholder="请输入介绍"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" class="w100" @click="submitForm('setting')">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import validate from '../../util/validate.js'
	export default {
		name: 'setting',
		data () {
			return {
				setting: {
					// gender: this.global_user.gender,
					gender: 0,
					avater: null,
					bio: ''
				}
			}
		},
		computed: {
			...mapGetters([
				'global_user'
			])
		},
		methods: {
			submitForm (formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log('success submit!!')
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
			resetForm (formName) {
				this.$refs[formName].resetFields()
			},
			bioValidate: validate.bio
		}
	}
</script>
<style lang="less" scoped>
	.setting {
		width: 480px;
		h3 {
			position: relative;
			font: normal 18px/3 bold;
			border-radius: 3px;
		}
		.avatar-uploader .el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
		}
		.avatar-uploader .el-upload:hover {
			border-color: #20a0ff;
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
			width: 178px;
			height: 178px;
			display: block;
		}
	}
</style>
