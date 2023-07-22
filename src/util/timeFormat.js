import moment from 'moment'
moment.locale('zh-cn')

const timeFormat = {
  dateFormat: (value) => {
    return moment(value).format('YYYY/MM/DD HH:mm:ss')
  }
}

export default timeFormat
