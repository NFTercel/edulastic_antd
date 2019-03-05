import API from "./utils/API";

const api = new API();

const receiveCurriculums = () => api.callApi({ url: "/curriculum" }).then(result => result.data.result);

const receiveStandards = ({ curriculumId, grades = [], search }) => {
  const data = { curriculumId, grades, search };
  return api
    .callApi({
      method: "post",
      url: "/search/standards",
      data
    })
    .then(result =>
      result.data.result.hits.hits.map(el => ({ _id: el._id, ...el._source })).filter(item => item.level === "ELO")
    );
};

export default {
  receiveCurriculums,
  receiveStandards
};
