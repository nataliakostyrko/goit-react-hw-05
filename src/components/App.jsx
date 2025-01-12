import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import fetchImages from "../services/api";
import ErrorMessage  from "./ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";
import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageModal from "./ImageModal/ImageModal";


function App() {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [modal, setModal] = useState(false);
    


    useEffect(() => {
        if (!query) return;

        const getArticles = async () => {
            try {
                setLoading(true);
                setError(false);
                
                const response = await fetchImages(query, page);
                setImages((prev) =>
                    page === 1 ? response.results : [...prev, ...response.results]
                );
                setTotal(response.total_pages);
            

            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        getArticles();
       
    }, [query, page]);
    
    const handleSubmit = (query) => {
        setQuery(query);
        setImages([]);
        setPage(1);
  };

    function OpenModal(image) {
    setModal({ isOpen: true, modalData: image });
  }

  function CloseModal() {
    setModal({ isOpen: false, modalData: null });
  }




    return (
           <div>
            <SearchBar onSubmit={handleSubmit} />
            {loading && <Loader />}
            {error && <ErrorMessage />}
             <ImageGallery images={images} OpenModal={OpenModal} />
            {total > page && (
            <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} />
      )}
            <Toaster
                position="top-right" />
              <ImageModal
                CloseModal={CloseModal}
                modalData={modal.modalData}
                isOpen={modal.isOpen}
      />
            
            
</div>
    );
};


export default App;
