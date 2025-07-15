import { Star } from "lucide-react"; // optional: icon library

function ReviewsSection() {
    interface Review {
  name: string;
  rating: number; // e.g. 4
  comment: string;
  date: string; // ISO or formatted date
}

  const reviews: Review[] = [
    {
      name: "Ali Wajdan",
      rating: 5,
      comment: "Amazing product! Great quality and fast delivery.",
      date: "2025-07-13",
    },
    {
      name: "Sarah Khan",
      rating: 4,
      comment: "Loved it overall, but the packaging could be better.",
      date: "2025-07-10",
    },
  ];

  return (
    <div className="my-10 w-[95%] mx-auto">
      <h2 className="md:text-[28px] text-[24px] font-bold mb-4">Customer Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border rounded-xl p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{review.name}</h3>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <div className="flex items-center mt-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill={i < review.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <p className="text-gray-500 md:text-[16px] text-[14px]">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsSection;
