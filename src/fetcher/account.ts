const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

export const jobseekerApplyAPI = async (data: object) => {
  const request = await fetch(`${BASE_URL}/api/profile/jobseeker/apply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const response = await request.json();

  return response;
};
