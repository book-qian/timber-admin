/*
 * @Author: yangyongqian
 * @Date: 2023-07-16 13:16:55
 * @Description:上传逻辑封装
 */
import axios from 'axios'
export const uploadAvatar = (userForm, api) => {
  let params = new FormData()

  for (let k in userForm) {
    params.append(k, userForm[k])
  }

  return axios
    .post(api, params, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    })
    .then((res) => res.data)
}
