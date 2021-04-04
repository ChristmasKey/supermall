import {request} from "./request"

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  });
}

export function getHomeGoods(type, page) {
  return request({
    url: 'http://192.168.1.104:8090/home/data',
    params: {
      type,
      page
    }
  })
}

