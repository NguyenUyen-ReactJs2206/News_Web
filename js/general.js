const API = axios.create({
  baseURL: "https://apiforlearning.zendvn.com/api/v2/",
});

dayjs.locale("vi");
dayjs.extend(window.dayjs_plugin_relativeTime);
