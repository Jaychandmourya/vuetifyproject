import axios from "axios";

const state = {
  items: [],
};
const getters = {
  allitems: (state) => state.items,
};
const actions = {
  // Insert items Data
  async additems({ commit }, item) {
    const response = await axios.post("http://localhost:3000/items", item);
    // console.log(response);
    commit("newitems", response.data);
  },
  // View items Data
  async getitems({ commit }) {
    const response = await axios.get("http://localhost:3000/items");
    commit("setitems", response.data);
  },
  // Delete Categories Data
  async deleteitems({ commit }, id) {
    let response = await axios.delete(`http://localhost:3000/items/${id}`);
    if (response.status == 200 || response.status == 204) {
      commit("removeitems", id);
    }
  },
  async edititems({ commit }, item) {
    let response = await axios.put(
      `http://localhost:3000/items/${item.id}`,
      item
    );
    commit("editnewitems", response.data);
  },
};
const mutations = {
  newitems: (state, item) => state.items.unshift(item),
  setitems: (state, items) => (state.items = items),
  removeitems(state, id) {
    let index = state.items.findIndex((item) => item.id == id);
    state.items.splice(index, 1);
  },
  editnewitems: (state, item) =>
    (state.items = state.items.map((dataitem) => {
      if (dataitem.id === item.id) {
        return Object.assign({}, dataitem, item.data);
      }
      return dataitem;
    })),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
