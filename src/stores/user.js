import { defineStore } from "pinia";
import axios from "axios";
import { mapMarkers } from "../components/js/map";

export default defineStore("userStore", {
  state: () => ({

    // select options
    dis: [],
    level: [],

    // 各種 lightbox 的顯示
    searchBoxShow: true,
    searchResultShow: false,
    detailResultShow: false,

    // 孔洞查詢條件
    holeSearchValue: { dis: [], date: null, dtype: [], page: 1 },

    // 孔洞查詢結果
    resultObj: () => ({}),

    // 孔洞結果總頁數
    totalPages: 0,

    // 單筆查詢條件
    details: { ID: "", DTYPE: "" },

    // 單筆查詢結果
    detailResult: () => ({}),

    // 警告彈窗
    alertShow: { title: "", show: false },
  }),
  getters: {

    // 行政區 getter
    getDis: (state) => {
      const temp = [];
      for (const key in state.dis) {
        temp[key] = { value: state.dis[key], label: state.dis[key] };
      }
      return temp;
    },

    // 破壞程度 getter
    getLevel: (state) => {
      const temp = [];
      const repeat = [];
      state.level.map((val, idx) => {
        let str = "";
        if (val.includes("S")) {
          str = "S";
          repeat[idx] = idx;
        } else {
          str = val;
        }
        temp[idx] = { value: str, label: str };
      });
      temp.splice(repeat[0], repeat.length - 1);
      return temp;
    },
  },
  actions: {

    // 孔洞查詢
    holeSearch() {

      // 取值
      const { dis, date, dtype, page } = this.holeSearchValue;

      // 建立 FormData
      const body = new FormData();
      if (dis.length > 0) body.append("dis", ...dis);
      if (date !== null) {
        body.append("dts", date[0]);
        body.append("dte", date[1]);
      }
      if (dtype.length > 0) {
        let temp = [];
        if (dtype.includes("S")) temp.push(...["S1", "S2"]);
        dtype.map((val) => {
          val.includes("S") ? undefined : temp.push(val);
        });
        temp.map((val, idx) => body.append(`dtype[${idx}]`, val));
      }
      body.append("page", page);

      // 打 api
      axios
        .post("http://211.72.231.157/Kcg_Wrb_SP/api/v1/search_SP_List", body)
        .then((res) => {
          this.resultObj = res.data.data.data;
          this.totalPages = res.data.data.total_page;
        })
        .then((res) => {
          if (!this.resultObj) {
            this.alertShowing();
          }
          mapMarkers(this.resultObj, this.detailSearch, this.openDetail); // callback 導出 action 給 map.js 順便繪出 markersLayer
        })
        .catch((error) => console.log("error", error));
    },

    // 單筆查詢
    detailSearch(body = this.details) {
      axios
        .post(
          "http://211.72.231.157/Kcg_Wrb_SP/api/v1/get_SP_detail?ID=100",
          body
        )
        .then((res) => (this.detailResult = res.data.data[0]))
        .catch((error) => console.log("error", error));
    },

    // 開啟單筆資料結果 *for map.js
    openDetail() {
      this.detailResultShow = true;
    },

    // 警告彈出
    alertShowing(show = true, title = "查無資料") {
      this.alertShow.title = title;
      this.alertShow.show = show;
    },
  },
});
