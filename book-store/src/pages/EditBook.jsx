import { useParams } from "react-router";
import EditBookForm from "../components/EditBookForm";
import { useEditBookQuery } from "../features/api/apiSlice";
import Message from "../components/Message";
import Error from "../components/Error";

const EditBook = () => {
  const { bookId } = useParams();
  const { data, isLoading, isError, error } = useEditBookQuery(bookId);
  let content = null;
  if (isLoading) {
    content = <Message message="Loading..." />;
  }
  if (!isLoading && isError) {
    content = <Error message={error?.error} />;
  }
  if (!isLoading && !isError && data?.id) {
    content = <EditBookForm data={data} />;
  }
  return (
    <main className="py-6 2xl:px-6">
      <div className="container">
        <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
          <h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>
          {content}
        </div>
      </div>
    </main>
  );
};
export default EditBook;
