axios.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		// console.log('config')
		// console.log(config)
		return config
	},
	function (error) {
		// Do something with request error
		// console.log('request error')
		// console.log(error)
		Object.assign(error.request, {type: 'error'})
		return error.request
	}
)

// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		// Do something with response data
		// console.log('response')
		// console.log(response)
		if (response.status === 200) {
			Object.assign(response, {type: 'success'})
			return response
		}
	},
	function (error) {
		// Do something with response error
		// console.log('response error')
		// console.log(error)
		Object.assign(error.response, {type: 'error'})
		return error.response
	}
)
