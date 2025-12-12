import { Link } from "react-router";
import { TbCurrencyTaka } from "react-icons/tb";

const BookCard = ({ book }) => {
    return (
        <div className="group card bg-base-100 shadow-md hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300 relative">

            {/* Image */}
            <figure className="h-48 w-full overflow-hidden">
                <img
                    src={book.image}
                    alt={book.title}
                    className="object-cover h-full w-full group-hover:scale-110 transition duration-500"
                />
            </figure>

            {/* Info */}
            <div className="card-body text-center">
                <h3 className="font-semibold text-lg truncate" title={book.title}>
                    {book.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm truncate" title={book.author}>
                    by {book.author}
                </p>

                {/* Category */}
                <div className="flex justify-center">
                    <p className="badge badge-soft badge-primary dark:badge-secondary text-xs text-center">{book.category}</p>
                </div>

                {/* Price */}
                <p className="font-bold text-primary dark:text-secondary flex justify-center items-center gap-1"><TbCurrencyTaka /> {book.price}</p>

                {/* Quick View */}
                <div className="card-actions justify-center mt-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition duration-300">
                    <Link to={`/books/${book._id}`} className="btn btn-primary btn-sm">
                        Quick View
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default BookCard;
