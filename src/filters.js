export default [
  {
    name: 'date-format',
    fn(value) {
      return value ? new Date(value).Format('yyyy-MM-dd') : "--";
    }
  }
]