import axios from "axios";

const state = {
  categories: [],
};
const getters = {
  allcategories: (state) => state.categories,
};
const actions = {
  // Insert Categories Data
  async addcategories({ commit }, categorie) {
    const response = await axios.post(
      "http://localhost:3000/categories",
      categorie
    );
    // console.log(response);
    commit("newcategories", response.data);
  },
  // View Categories Data
  async getCategories({ commit }) {
    const response = await axios.get("http://localhost:3000/categories");
    commit("setcategories", response.data);
  },
  // Delete Categories Data
  async deleteCategories({ commit }, id) {
    let response = await axios.delete(`http://localhost:3000/categories/${id}`);
    if (response.status == 200 || response.status == 204) {
      commit("removeCategories", id);
    }
  },
  async editcategories({ commit }, categorie) {
    let response = await axios.put(
      `http://localhost:3000/categories/${categorie.id}`,
      categorie
    );
    commit("editnewcategories", response.data);
  },
};
const mutations = {
  newcategories: (state, categorie) => state.categories.unshift(categorie),
  setcategories: (state, categories) => (state.categories = categories),
  removeCategories(state, id) {
    let index = state.categories.findIndex((categorie) => categorie.id == id);
    state.categories.splice(index, 1);
  },
  editnewcategories: (state, categorie) =>
    (state.categories = state.categories.map((category) => {
      if (category.id === categorie.id) {
        return Object.assign({}, category, categorie.data);
      }
      return category;
    })),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
