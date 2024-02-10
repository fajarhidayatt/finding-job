export const getCategories = async () => {
  const res = await fetch('http://localhost:3000/api/v1/jobs/categories');
  const data = res.json();

  return data;
};
