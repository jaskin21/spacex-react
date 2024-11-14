import React, { useState } from 'react';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

const ProductCard = ({ data }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };
  const {
    launch_success,
    launch_date_utc,
    mission_name,
    links: { video_link, article_link, flickr_images },
    details,
  } = data;

  // Format the launch date
  const date = parseISO(launch_date_utc);

  console.log(flickr_images[0]);

  return (
    <div
      style={{
        width: '500px',
        padding: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        position: 'relative',
        margin: '10px 0px',
      }}
    >
      {/* Title, and Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#333',
            margin: '0',
          }}
        >
          {mission_name}
        </h3>
        <span
          style={{
            backgroundColor:
              launch_success === true
                ? '#4CAF50'
                : launch_success === false
                ? '#f44336'
                : '#ff9800',
            color: '#fff',
            padding: '2px 8px',
            margin: '0px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: '500',
          }}
        >
          {launch_success === true
            ? 'Success'
            : launch_success === false
            ? 'Failure'
            : 'Upcoming'}
        </span>
      </div>

      {/* Time Status, Video Link, and Article Link */}
      {showMore && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.875rem',
            color: '#555',
          }}
        >
          <span style={{ marginRight: '2px' }}>
            {formatDistanceToNowStrict(date, { addSuffix: true })}
          </span>

          {video_link && (
            <>
              <span style={{ margin: '0 2px' }}>|</span>
              <a
                href={video_link}
                target='blank'
                style={{ color: '#007BFF', textDecoration: 'none' }}
              >
                Video
              </a>
            </>
          )}

          {article_link && (
            <>
              <span style={{ marginRight: '2px' }}>|</span>
              <a
                href={article_link}
                target='blank'
                style={{ color: '#007BFF', textDecoration: 'none' }}
              >
                Article
              </a>
            </>
          )}
        </div>
      )}

      {showMore && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            padding: '16px',
          }}
        >
          {/* Image taking 25% of the width */}
          {flickr_images[0] ? (
            <img
              src={flickr_images[0]}
              alt='SpaceX launch rocket in the sky' // Provide a meaningful description
              style={{
                width: '25%',
                height: '25%',
                objectFit: 'cover',
                borderRadius: '6px',
                marginRight: '16px',
                margin: '10px 0px',
                border: '1px solid greeen',
              }}
            />
          ) : (
            <p
              style={{
                color: '#555',
                margin: '10px',
                fontSize: '14px',
                textAlign: 'justify',
              }}
            >
              No image yet
            </p>
          )}

          {/* Details taking 75% of the width */}
          <div style={{ width: '75%' }}>
            {details ? (
              <p
                style={{
                  color: '#555',
                  margin: '0px 10px',
                  fontSize: '14px',
                  textAlign: 'justify',
                }}
              >
                {details}
              </p>
            ) : (
              <p
                style={{
                  color: '#555',
                  margin: '10px',
                  fontSize: '14px',
                  textAlign: 'justify',
                }}
              >
                'No Details yet'
              </p>
            )}
          </div>
        </div>
      )}

      {/* Show More/Show Less Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start', // Align to the start (left)
        }}
      >
        <button
          onClick={handleShowMore}
          style={{
            backgroundColor: '#007BFF',
            color: '#fff',
            padding: '10px 10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '70px',
            fontSize: '14px',
            fontWeight: 'normal',
            marginTop: '16px',
          }}
        >
          {showMore ? 'HIDE' : 'VIEW'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
