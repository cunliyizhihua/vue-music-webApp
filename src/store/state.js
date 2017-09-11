import {playMode} from 'common/js/config.js'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},
  playing: false, // 默认不播放
  fullScreen: false, // 非全屏播放
  playlist: [], // 播放列表
  sequenceList: [],
  mode: playMode.sequence, // 默认单曲循环
  currentIndex: -1, // 当前播放歌曲序列号
  disk: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state