<template lang="pug">
div
  div#privacy-page
    div#privacy-content
      h3 隱私權聲明
        p 公告日期 2018-09-25
        p 感謝您使用鄉民風水師，為了讓您安心使用此應用程式，在此向您說明鄉民風水師的隱私權保護政策。
      h3 隱私權保護政策
        h4 定義
          ul
            li 個人資料為足以識別個人身分的資料，如姓名、地址、電子郵件地址、電話號碼、身分證字號等。
            li 鄉民風水師 Android 版本為 Google Play 服務所提供的應用程式，其他來源所取得的版本不在定義範圍。
            li 鄉民風水師 Web 版本為 https://geomancer.tacosync.com 網址所提供的應用程式，其他來源所取得的版本不在定義範圍。
            li Google Play 的評論功能不屬於鄉民風水師 Android 版本的一部分，如用戶在評論中自行透漏個人資料，這些資料將不會受到保護。
        h4 關於個人資料
          p 鄉民風水師 Web 版本不儲存用戶個人資料，鄉民風水師 Android 版本在應用程式異常終止時，會蒐集應用程式錯誤原因與手機型號，確保應用程式能有效率得進行改善，在沒有評論應用程式的前提下，這些資訊不致於識別個人身分。
        h4 Android 版本的資源存取用途
          p
            | GPS 權限僅用於取得用戶當下所在的座標與方位角，不進行任何資料蒐集行為。
            | 網際網路權限用於資料更新、閃退自動回報。
            | 內部儲存空間用於儲存地圖檔案與人文地理資料，以及地圖渲染的快取資料。
        h4 Web 版本的資源存取用途
          p
            | Cookie 用於記憶上次的操作狀態，提升用戶體驗。
            | Local Storage 用於記憶上次的操作狀態，提升用戶體驗。
        h4 隱私權政策修訂
          p 隱私權政策如有修改，會公告於鄉民風水師 Web 版網站上。
</template>

<style scoped>
#privacy-page {
  width: 100%;
  height: 100%;
  /* border: 1px solid #000; */
  overflow-y: scroll;
  background: #d9d0bc;
}

#privacy-content {
  width: 600px;
  padding: 5px 20px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #000;
  border-radius: 10px;
}

li, p {
  font-size: 11pt;
  font-weight: normal;
  color: #333;
}

h3 {
  font-size: 14pt;
  font-weight: weight;
}

h4 {
  font-size: 12pt;
  font-weight: weight;
}
</style>
