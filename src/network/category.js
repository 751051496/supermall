import { request } from "./request";

export function getCategory() {
  return request({
    url: "/category"
  });
}

export function getCategoryInfo(miniWallkey) {
  return request({
    url: "/subcategory/detail",
    params: {
      miniWallkey
    }
  });
}
