const SORT_OPTIONS = {
  default: { _sort: "id", _order: "asc" },
  newest: { _sort: "id", _order: "desc" },
  most_liked: { _sort: "likes", _order: "desc" },
};

const prepareQueryParam = (filters) => {
  const { sortBy, filterBy } = filters || {};
  const params = new URLSearchParams();
  if (filterBy === "saved") {
    params.append("isSaved_like", true);
  }
  const sortConfig = SORT_OPTIONS[sortBy];
  if (sortConfig) {
    Object.entries(sortConfig).forEach(([key, value]) =>
      params.append(key, value),
    );
  }
  const query = `${params}`;
  return query;
};

export default prepareQueryParam;
