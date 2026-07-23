import { useEffect, useState } from "react";
import { useAddBookMutation } from "../features/api/apiSlice";
import Error from "./Error";
import { useNavigate } from "react-router";

const intialFormData = {
  name: "",
  author: "",
  thumbnail: "",
  price: "",
  rating: "",
  featured: false,
};
const AddBookForm = () => {
  const [addBook, { isLoading, isError, error, isSuccess }] =
    useAddBookMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(intialFormData);
  const handleFormInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(formData);
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);
  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="lws-bookName">Book Name</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-bookName"
          name="name"
          value={formData.name}
          onChange={handleFormInput}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="lws-author">Author</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-author"
          name="author"
          value={formData.author}
          onChange={handleFormInput}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="lws-thumbnail">Image Url</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-thumbnail"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleFormInput}
        />
      </div>

      <div className="grid grid-cols-2 gap-8 pb-4">
        <div className="space-y-2">
          <label htmlFor="lws-price">Price</label>
          <input
            required
            className="text-input"
            type="number"
            id="lws-price"
            name="price"
            value={formData.price}
            onChange={handleFormInput}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lws-rating">Rating</label>
          <input
            required
            className="text-input"
            type="number"
            id="lws-rating"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleFormInput}
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="lws-featured"
          type="checkbox"
          name="featured"
          className="w-4 h-4"
          checked={formData.featured}
          onChange={handleFormInput}
        />
        <label htmlFor="lws-featured" className="ml-2 text-sm">
          {" "}
          This is a featured book{" "}
        </label>
      </div>
      <button
        type="submit"
        className="submit"
        id="lws-submit"
        disabled={isLoading}
      >
        Add Book
      </button>
      {isError && <Error message={error?.error} />}
    </form>
  );
};
export default AddBookForm;
