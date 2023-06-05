import api from '~/utils/ajax'

export default api
export const postAjax = data => api.post('/post', data)
export const deleteAjax = data => api.delete('/delete', data)
export const putAjax = data => api.put('/put', data)
export const getAjax = () => api.get('/get')
