import { defineStore } from "pinia";
import axios from "axios";
import { mapMarkers } from "../js/map";

export default defineStore("userStore", {
  state: () => ({
    dis: [],
    level: [],
    searchBoxShow: true,
    searchResultShow: false,
    detailResultShow: true,
    holeSearchValue: { dis: [], date: null, dtype: [], page: 1 },
    resultObj: () => ({}),
    totalPages: 0,
    details: { ID: "", DTYPE: "" },
    detailResult: () => ({}),
  }),
  getters: {
    getDis: (state) => {
      const temp = [];
      for (const key in state.dis) {
        temp[key] = { value: state.dis[key], label: state.dis[key] };
      }
      return temp;
    },
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
      temp;
      return temp;
    },
  },
  actions: {
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
        dtype.map((val, idx, arr) => {
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
        .then((res) => mapMarkers(this.resultObj))
        .catch((error) => console.log("error", error));
    },
    detailSearch() {
      axios
        .post(
          "http://211.72.231.157/Kcg_Wrb_SP/api/v1/get_SP_detail?ID=100",
          this.details
        )
        .then((res) => this.detailResult = res.data.data[0])
        .then(res => console.log(this.detailResult))
        .catch((error) => console.log("error", error));
    },
  },
});
