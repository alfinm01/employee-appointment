/**
 * Response creator
 */

module.exports = (data, status_code) => {
	let response = {
		"data": data
	}
	if (status_code === 400) {
		response = {
			"error": {
				"code": status_code,
				"message": data
			}
		}
	}
	return response;
}