import { useSelector } from "react-redux";
import { useGetBooksQuery } from "../features/api/apiSlice";
import Book from "./Book";
import BookSkeleton from "./BookSkeleton";
import Error from "./Error";
import Message from "./Message";

const Books = () => {
  const { data: books, isLoading, isError, error } = useGetBooksQuery();
  const filters = useSelector((state) => state.filters);

  let content = null;

  if (isLoading) {
    content = [...Array(4)].map((_, index) => <BookSkeleton key={index} />);
  }

  if (!isLoading && isError) {
    content = <Error message={error?.error} />;
  }

  if (!isLoading && !isError && books?.length === 0) {
    content = <Message message="No Data Found" />;
  }

  if (!isLoading && !isError && books?.length > 0) {
    content = books
      .filter((book) => {
        const matchesFeatured =
          filters.type === "Featured" ? book.featured : true;
        const matchesSearch =
          !filters.search ||
          book.name.toLowerCase().includes(filters.search.toLowerCase());

        return matchesFeatured && matchesSearch;
      })
      .map((book) => <Book key={book.id} book={book} />);
  }

  return (
    <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
      {content}
    </div>
  );
};
export default Books;
