import axios from "axios";
// 创建实例时配置默认值
const isDev = process.env.NODE_ENV === "development";
const myAxios = axios.create({
  baseURL: isDev ? "http://localhost:8080/api" : "http://friend.dangzg.cn/api",
});

// 处理  类型“AxiosResponse<any, any>”上不存在属性“errorinfo”。ts(2339) 脑壳疼！关键一步。
declare module "axios" {
  interface AxiosResponse<T = any> {
    code: null;
    // 这里追加你的参数
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

// 添加请求拦截器
//GET传参序列化
myAxios.interceptors.request.use(
  (config) => {
    // console.log("收到请求");
    // 不知道为啥不管用
    // if (config.method === "get") {
    //   // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2,不转换会显示为arr[]=1&arr[]=2
    //   config.paramsSerializer = function (params) {
    //     return qs.stringify(params, { arrayFormat: "repeat" });
    //   };
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
myAxios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log("收到响应");
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

myAxios.defaults.withCredentials = true; // 允许携带 cookie

export default myAxios;
