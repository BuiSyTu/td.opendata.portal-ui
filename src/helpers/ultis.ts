import _ from 'lodash'

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
export const isUrl = (path: string) => reg.test(path)

export const handleImage = (values: any, URL: any) => {
  const arr = _.without(_.split(values, '##'), '')
  let res: any[] = []
  arr.forEach((i) => {
    res.push({
      url: !(i.includes('https://') || i.includes('http://')) ? URL + i : i,
      path: i,
    })
  })
  return res
}

export const convertImage = (array: any) => {
  var temp: any[] = []
  array.forEach((element: any) => {
    temp = _.concat(temp, element?.response?.data[0]?.url ?? element.path)
  })
  var res = _.uniq(temp).join('##')
  return res
}

export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
