/**
 * Truncates description to maximum length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
const truncateDescription = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Copies text to clipboard
 * @param {string} text - Text to copy
 */
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert('คัดลอกลิ้งค์เรียบร้อยแล้ว');
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

/**
 * TripCard Component
 * Displays a single tourist attraction card with all required information
 */
const TripCard = ({ trip, onTagClick }) => {
  if (!trip) return null;

  const {
    title,
    description,
    photos = [],
    tags = [],
    url
  } = trip;

  const mainImage = photos[0] || '';
  const smallImages = photos.slice(1, 4); // Get next 3 images
  const truncatedDescription = truncateDescription(description, 100);

  const handleTagClick = (tag) => {
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  const handleReadMore = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleCopyLink = () => {
    if (url) {
      copyToClipboard(url);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden mb-6">
      <div className="flex gap-4 p-4">
        {/* Large Image - Left Side */}
        <div className="w-1/3 h-64 shrink-0">
          <img
            src={mainImage}
            alt={title}
            className="w-full h-full object-cover rounded-4xl"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
            }}
          />
        </div>

        {/* Content Section - Right Side */}
        <div className="flex-1 flex flex-col">
          <div className="flex mb-2"> 
            <div className="flex-1">
              {/* Title as Link */}
              <h2 className="text-lg font-bold mb-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {title}
                </a>
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {truncatedDescription}
              </p>

              {/* Read More Link */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  handleReadMore();
                }}
                className="text-[#4396C5] underline text-sm mb-2 inline-block"
              >
                อ่านต่อ
              </a>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-600 text-xs">หมวด</span>
                {tags.map((tag, index) => (
                  <span key={index} className="flex items-center">
                    {index === tags.length - 1 && tags.length > 1 && (
                      <span className="text-gray-600 text-xs mr-1">และ</span>
                    )}
                    <button
                      onClick={() => handleTagClick(tag)}
                      className="text-gray-600 underline text-xs hover:no-underline transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Copy Link Icon */}
            <div className="flex items-start pt-1 ml-2 shrink-0">
              <button
                onClick={handleCopyLink}
                className="text-[#4396C5] hover:opacity-80 transition-colors p-1"
                title="Copy ลิ้งค์"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Small Images */}
          <div className="flex gap-5 mt-2">
            {smallImages.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${title} - ${index + 2}`}
                className="w-20 h-20 object-cover rounded"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                }}
              />
            ))}
            {/* Fill empty slots */}
            {Array.from({ length: Math.max(0, 3 - smallImages.length) }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center"
              >
                <span className="text-gray-400 text-xs">ไม่มีรูป</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripCard;
