
export interface IResponse<T> {
  status: "success" | "fail";
  data: T;
}

export interface IResponseList<T> {
  status: "success" | "fail";
  data: T[];
  meta: Meta;
}

export interface Meta {
  total_items: number
  total_pages: number
  page: number
  limit: number
}