import TripCard from './TripCard';

/**
 * TripList Component
 * Displays a list of tourist attraction cards
 */
const TripList = ({ trips, onTagClick }) => {
  if (!trips || trips.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">ไม่พบสถานที่ท่องเที่ยว</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {trips.map((trip) => (
        <TripCard key={trip.eid} trip={trip} onTagClick={onTagClick} />
      ))}
    </div>
  );
};

export default TripList;
