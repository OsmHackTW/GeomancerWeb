export default {

  urlToName (url) {
    let name = '未知的報社'

    if (url) {
      const namesTable = [
        { key: 'ltn.com.tw', name: '自由時報' },
        { key: 'appledaily.com.tw', name: '蘋果日報' },
        { key: 'chinatimes.com', name: '中國時報' },
        { key: 'udn.com', name: '聯合新聞網' },
        { key: 'yahoo.com', name: 'Yahoo!新聞' },
        { key: 'judicial.gov.tw', name: '司法院' },
        { key: 'moj.gov.tw', name: '法務部' }
      ]
      namesTable.forEach((m) => {
        if (url.indexOf(m.key) > -1) name = m.name
      })
    } else {
      name = ''
    }

    return name
  },

  toUnluckyHouseURL (id) {
    return 'https://unluckyhouse.com/showthread.php?t={THREAD}'
      .replace('{THREAD}', id)
  }

}
