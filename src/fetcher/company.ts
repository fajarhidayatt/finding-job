export const getCompanyOverview = async (companyId: string) => {
  const res = await fetch(
    `http://localhost:3000/api/v1/company/${companyId}/overview`
  );
  const data = res.json();

  return data; /// data.data
};
