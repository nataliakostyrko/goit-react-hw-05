import  axios from "axios"
    const fetchImages = async (query, page) => {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      query,
      page,
       per_page: 8,
      client_id: "VMhRy6RYve9-7My63BLa6uXAkq0EdaGDKvpfLxnUc7Q",
    },
  });
  return response.data
};

export default fetchImages;