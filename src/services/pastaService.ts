import axios from "axios";

export const getAllPasta = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/pasta`);
    return response.data.data;
  } catch (error) {
    return console.log(error);
  }
};

export const getUserPasta = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/user/pasta`);
    return response.data.data;
  } catch (error) {
    return console.log(error);
  }
};

export const getSinglePasta = async (id: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/pasta?id=${id}`);
    return response.data.data;
  } catch (error) {
    return console.log(error);
  }
};

export const postPasta = async (data: {
  title: string;
  content: string;
  variables: {
    name: string;
  };
  type: string;
  tags: string[];
}) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_SITE_URL}/api/pasta`, data);
};

export const deletePasta = async (id: string) => {
  try {
    return await axios.delete(`${process.env.NEXT_PUBLIC_SITE_URL}/api/pasta?id=${id}`);
  } catch (error) {
    return console.log(error);
  }
};
