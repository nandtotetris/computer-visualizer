export const getColumnTitles = header => {
  const key = getHeaderKey(header)
  const columns = [
    {
      title: header,
      dataIndex: key,
      key,
      children: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: 'Kind',
          dataIndex: 'kind',
          key: 'kind'
        },
        {
          title: 'Index',
          dataIndex: 'index',
          key: 'index'
        }
      ]
    }
  ]

  return columns
}

export const getTableEntries = entries => {
  const arr = []
  if (!entries) return arr

  Object.keys(entries).forEach((key, i) => {
    arr.push({
      key: i,
      name: key,
      ...entries[key]
    })
  })

  return arr
}

const getHeaderKey = header => header.replaceAll(' ', '').toLowerCase()
