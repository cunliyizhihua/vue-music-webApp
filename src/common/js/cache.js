import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

function insertArray(arr, val, compare, maxLen) {
  // 查找是否有相同的值
  const index = arr.findIndex(compare)
  // 如果有 而且在最前面 那就不用插入了
  if (index === 0) {
    return
  }
  // 如果不是在第一个位置 那么删除
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 插入
  arr.unshift(val)
  // 假设 我们只存储最多maxLen条数据 那么删除最后一条数据
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  // 刚开始没有值  返回一个'空数组'
  let searches = storage.get(SEARCH_KEY, [])
  console.log(searches)
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)

  // 设置存储
  storage.set(SEARCH_KEY, searches)
  console.log(localStorage)

  // 返回的是一个数组
  return searches
}

export function loadSearch() {
  console.log(storage.get(SEARCH_KEY, []))
  return storage.get(SEARCH_KEY, [])
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })

  // 操作万数组之后 记得保存
  storage.set(SEARCH_KEY, searches)

  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

// 播放历史-----------------------------------------start
const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}
// 播放历史-------------------------------------------end

// 收藏歌曲-----------------------------------------satrt
const FAVORITE_KEY = '_favorite_'
const FAVORITE_MAX_LENGTH = 200

export function saveFavorite(song) {
  // 先创建数组
  let songs = storage.get(FAVORITE_KEY, [])
  // 插入
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LENGTH)
  // 存储
  storage.set(FAVORITE_KEY, songs)

  return songs
}

export function deleteFavorite(song) {
  // 先创建数组
  let songs = storage.get(FAVORITE_KEY, [])
  console.log(songs)
  // 插入
  deleteFromArray(songs, (item) => {
    return song.id === item.id
  })
  // 存储
  storage.set(FAVORITE_KEY, songs)

  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
// 收藏歌曲-----------------------------------------------end