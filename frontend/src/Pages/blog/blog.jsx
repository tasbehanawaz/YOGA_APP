import PropTypes from 'prop-types';
import './blog.css';

const YogaArticle = ({ title, summary, imageUrl, link }) => (
  <div className="yoga-article">
    <img src={imageUrl} alt={title} className="article-image" />
    <div className="article-content">
      <h3>{title}</h3>
      <p>{summary}</p>
      <a href={link} className="read-more">
        Read more
      </a>
    </div>
  </div>
);

YogaArticle.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const YogaInstructorSpotlight = ({ name, specialty, bio, imageUrl }) => (
  <div className="instructor-spotlight">
    <img src={imageUrl} alt={name} className="instructor-image" />
    <div className="instructor-info">
      <h3>{name}</h3>
      <p>
        <strong>Specialty:</strong> {specialty}
      </p>
      <p>{bio}</p>
    </div>
  </div>
);

YogaInstructorSpotlight.propTypes = {
  name: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

const YogaBlog = () => {
  const articles = [
    {
      id: 1,
      title: 'The Benefits of Daily Yoga Practice',
      summary:
        'Discover how daily yoga can enhance your physical, mental, and emotional well-being.',
      imageUrl: '/images/yoga-benefits.jpg',
      link: '/article/benefits-of-daily-yoga',
    },
    {
      id: 2,
      title: 'Beginner’s Guide to Vinyasa Flow',
      summary:
        'Learn the basics of Vinyasa Flow and how to incorporate it into your routine.',
      imageUrl: '/images/vinyasa-flow.jpg',
      link: '/article/beginners-guide-vinyasa',
    },
    {
      id: 3,
      title: 'Yoga for Stress Relief: Top Poses',
      summary:
        'Explore the best yoga poses for alleviating stress and promoting relaxation.',
      imageUrl: '/images/yoga-stress-relief.jpg',
      link: '/article/yoga-for-stress-relief',
    },
  ];

  const instructors = [
    {
      id: 1,
      name: 'Sophia Patel',
      specialty: 'Vinyasa Flow and Mindfulness',
      bio: 'Sophia brings over 10 years of experience in Vinyasa Flow, focusing on mindfulness and breathwork. Her classes are designed to create a balance between physical movement and mental clarity.',
      imageUrl: '/images/sophia.jpg',
    },
    {
      id: 2,
      name: 'Ethan Lee',
      specialty: 'Hatha Yoga and Strength Training',
      bio: 'With a background in strength training, Ethan combines traditional Hatha Yoga with modern fitness techniques to build strength and flexibility in his students.',
      imageUrl: '/images/ethan.jpg',
    },
  ];

  const categories = [
    'Mindfulness',
    'Yoga for Beginners',
    'Yoga Philosophy',
    'Healthy Living',
    'Yoga Poses',
  ];

  return (
    <div className="blog-container">
      {/* Hero Section */}
      <header className="hero-section">
        <h1 className="hero-title">Yoga Blog</h1>
        <p className="hero-subtitle">
          Your daily dose of yoga inspiration, tips, and guides.
        </p>
      </header>

      {/* Featured Articles */}
      <section className="featured-articles">
        <h2>Featured Articles</h2>
        <div className="articles-grid">
          {articles.map((article) => (
            <YogaArticle key={article.id} {...article} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <h2>Popular Categories</h2>
        <ul className="categories-list">
          {categories.map((category, index) => (
            <li key={index}>
              <a
                href={`/category/${category
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Instructor Spotlight */}
      <section className="instructor-spotlight-section">
        <h2>Instructor Spotlight</h2>
        <div className="spotlight-grid">
          {instructors.map((instructor) => (
            <YogaInstructorSpotlight key={instructor.id} {...instructor} />
          ))}
        </div>
      </section>

      {/* Community Call-to-Action */}
      <section className="community-section">
        <h2>Join Our Yoga Community</h2>
        <p>
          Connect with like-minded individuals, attend virtual yoga classes, and
          deepen your practice with our supportive community.
        </p>
        <a href="/community" className="join-community-button">
          Join the Community
        </a>
      </section>
    </div>
  );
};

export default YogaBlog;
