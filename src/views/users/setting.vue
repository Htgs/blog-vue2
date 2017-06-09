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
			<el-form-item label="头像上传">
				<img v-if="imgUrl" :src="imgUrl" class="avatar">
				<el-button v-if="imgUrl" type="primary" @click="clearFile">删除图片</el-button>
				<label v-else for="avatar" class="el-icon-plus avatar-uploader"></label>
				<input type="file" id="avatar" @change="fileChange" class="hidden inp-file" accept="image/jpeg,image/jpg,image/png">
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
	import util from '../../util/util.js'
	export default {
		name: 'setting',
		computed: {
			...mapGetters([
				'global_user'
			])
		},
		data () {
			return {
				setting: {
					gender: 0,
					avatar: null,
					bio: ''
				},
				imgUrl: null
			}
		},
		beforeRouteEnter (to, from, next) {
			axios.get(to.path)
				.then(res => {
					next(vm => {
						vm.setting.gender = res.data.gender
						vm.setting.bio = res.data.bio
						vm.imgUrl = util.$img(res.data.avatar)
					})
				})
				.catch(err => {
					next(vm => {
						console.log(err)
					})
				})
		},
		methods: {
			fileChange () {
				let file = document.querySelector('#avatar').files[0]
				if (file.size / 1024 > 200) {
					this.$store.dispatch('toggleGlobalMessage', {data: { msg: '图片太大' }, code: '', type: 'warning'})
					return
				}
				if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
					this.$store.dispatch('toggleGlobalMessage', {data: { msg: '图片格式只支持png和jpg' }, code: '', type: 'warning'})
					return
				}
				let fr = new FileReader()
				fr.onload = (e) => {
					this.imgUrl = e.target.result
					this.setting.avatar = file
				}
				fr.readAsDataURL(file)
			},
			clearFile () {
				this.imgUrl = null
				this.setting.avatar = null
			},
			submitForm (formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let fd = new FormData()
						fd.append('gender', this.setting.gender)
						fd.append('avatar', this.setting.avatar)
						fd.append('bio', this.setting.bio)
						axios.post('/user/' + this.global_user.name + '/setting', fd, {headers: {'Content-Type': 'multipart/form-data'}})
							.then(res => {
								this.$store.dispatch('toggleGlobalMessage', res)
								this.$router.push('/home')
								this.$store.commit('GLOBAL_ACTIVENAV', '/home')
								this.$store.commit('GLOBAL_UPDATE_USERINFO', res.data.res)
							})
							.catch(err => {
								this.$store.dispatch('toggleGlobalMessage', err)
							})
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
		.avatar-uploader:hover {0 
			border-color: #20a0ff;
		}
		.avatar-uploader {
			font-size: 28px;
			color: #8c939d;
			width: 200px;
			height: 200px;
			line-height: 200px;
			text-align: center;
			border: 1px dashed #d9d9d9;
		}
		.avatar {
			width: 200px;
			height: 200px;
			display: block;
		}
	}
</style>
