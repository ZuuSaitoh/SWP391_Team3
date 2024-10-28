import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './BlogDetail.css';
// Import images
import blog1Main from "../../page/koi_photo/pond/koi_pond.jpg";
import blog1Image1 from "../../page/koi_photo/pond/pond1.jpg";
import blog1Image2 from "../../page/koi_photo/pond/pond2.jpg";
import blog2Main from "../../page/koi_photo/pond/koi_pond2.jpg";
import blog2Image1 from "../../page/koi_photo/pond/pond3.jpg";
import blog2Image2 from "../../page/koi_photo/pond/pond4.jpg";
import blog3Main from "../../page/koi_photo/pond/pond3.jpg";
import blog3Image1 from "../../page/koi_photo/pond/pond4.jpg";
import blog3Image2 from "../../page/koi_photo/pond/pond5.jpg";

const blogData = {
  1: {
    title: "The Benefits of Koi Ponds for Mental Health",
    image: blog1Main,
    contentImages: [
      {
        src: blog1Image1,
        caption: "A peaceful koi pond with water lilies"
      },
      {
        src: blog1Image2,
        caption: "Traditional Japanese garden with koi pond"
      }
    ],
    content: `
      <h2>The Therapeutic Power of Koi Ponds</h2>
      <p>In today's fast-paced world, finding moments of peace and tranquility has become increasingly important for maintaining good mental health. Koi ponds offer a unique and beautiful way to create a peaceful sanctuary right in your own backyard.</p>

      <div class="blog-image-wrapper">
        <img src="${blog1Image1}" alt="Peaceful koi pond" />
        <p class="image-caption">A serene koi pond environment perfect for meditation and relaxation</p>
      </div>

      <h3>1. Stress Reduction</h3>
      <p>The gentle sound of flowing water and the mesmerizing movement of koi fish have been proven to reduce stress levels and promote relaxation. Studies have shown that watching fish swim can lower blood pressure and reduce anxiety.</p>

      <h3>2. Mindfulness and Meditation</h3>
      <p>A koi pond provides the perfect setting for mindfulness practice and meditation. The rhythmic movement of the fish and the natural sounds create an ideal environment for focusing the mind and achieving a state of calm.</p>

      <div class="blog-image-wrapper">
        <img src="${blog1Image2}" alt="Japanese garden pond" />
        <p class="image-caption">Traditional Japanese garden design incorporating koi ponds for meditation</p>
      </div>

      <h3>3. Connection with Nature</h3>
      <p>In our increasingly digital world, maintaining a connection with nature is vital for mental well-being. A koi pond brings a living ecosystem to your doorstep, allowing you to observe and interact with nature daily.</p>

      <h3>4. Social Benefits</h3>
      <p>Koi ponds can become a focal point for social gatherings and family time, promoting positive social interactions and strengthening relationships. They provide a peaceful backdrop for conversations and shared experiences.</p>

      <h3>5. Therapeutic Routine</h3>
      <p>The regular maintenance and care of koi fish can provide a sense of purpose and routine, which is beneficial for mental health. The responsibility of caring for living creatures can be both rewarding and therapeutic.</p>
    `,
    author: "Dr. Sarah Johnson",
    date: "March 15, 2024",
    readTime: "8 min read"
  },
  2: {
    title: "Top 5 Koi Varieties for Beginners",
    image: blog2Main,
    contentImages: [
      {
        src: blog2Image1,
        caption: "Various koi varieties swimming together"
      },
      {
        src: blog2Image2,
        caption: "Beautiful koi pond setup for beginners"
      }
    ],
    content: `
      <h2>Starting Your Koi Journey</h2>
      <p>For those new to koi keeping, choosing the right varieties is crucial for success. Here are the top 5 koi varieties that are perfect for beginners.</p>

      <div class="blog-image-wrapper">
        <img src="${blog2Image1}" alt="Koi varieties" />
        <p class="image-caption">Different koi varieties displaying their unique patterns and colors</p>
      </div>

      <h3>1. Kohaku</h3>
      <p>The classic white-bodied koi with red patterns. Kohaku are hardy fish that adapt well to various conditions, making them perfect for beginners. Their simple yet elegant appearance makes them a popular choice.</p>

      <h3>2. Sanke</h3>
      <p>Similar to Kohaku but with additional black markings, Sanke are relatively easy to care for and provide a beautiful three-color display that's visually striking in any pond.</p>

      <div class="blog-image-wrapper">
        <img src="${blog2Image2}" alt="Beginner koi pond" />
        <p class="image-caption">A well-maintained beginner's koi pond with various fish varieties</p>
      </div>

      <h3>3. Chagoi</h3>
      <p>Known for their friendly nature, Chagoi are excellent starter koi. They're typically brown in color and are often the first to become hand-tame, helping build confidence in new koi keepers.</p>

      <h3>4. Kujaku</h3>
      <p>These metallic-scaled koi are hardy and disease-resistant, making them ideal for beginners. Their stunning appearance adds a sparkle to any pond.</p>

      <h3>5. Butterfly Koi</h3>
      <p>With their long, flowing fins, Butterfly Koi are both beautiful and resilient. They're generally hardier than standard koi and can tolerate a wider range of water conditions.</p>
    `,
    author: "Mike Chen",
    date: "March 10, 2024",
    readTime: "6 min read"
  },
  3: {
    title: "Seasonal Maintenance Tips for Your Koi Pond",
    image: blog3Main,
    contentImages: [
      {
        src: blog3Image1,
        caption: "Spring maintenance in progress"
      },
      {
        src: blog3Image2,
        caption: "Winter protection measures"
      }
    ],
    content: `
      <h2>Year-Round Koi Pond Maintenance</h2>
      <p>Proper maintenance is key to keeping your koi pond healthy and beautiful throughout the changing seasons. Here's a comprehensive guide to seasonal care.</p>

      <div class="blog-image-wrapper">
        <img src="${blog3Image1}" alt="Spring maintenance" />
        <p class="image-caption">Spring cleaning and maintenance of a koi pond</p>
      </div>

      <h3>Spring Maintenance</h3>
      <p>- Clean debris from winter
      <br>- Check and repair pump and filter systems
      <br>- Gradually restart feeding as water temperatures rise
      <br>- Test water parameters
      <br>- Inspect plants and divide if necessary</p>

      <h3>Summer Care</h3>
      <p>- Monitor water temperature regularly
      <br>- Maintain proper aeration levels
      <br>- Control algae growth
      <br>- Regular feeding schedule
      <br>- Weekly water testing</p>

      <div class="blog-image-wrapper">
        <img src="${blog3Image2}" alt="Winter protection" />
        <p class="image-caption">Winter preparation and protection measures for koi ponds</p>
      </div>

      <h3>Fall Preparation</h3>
      <p>- Remove falling leaves regularly
      <br>- Reduce feeding as temperatures drop
      <br>- Trim aquatic plants
      <br>- Install pond netting
      <br>- Clean filters thoroughly</p>

      <h3>Winter Protection</h3>
      <p>- Install de-icer if needed
      <br>- Maintain hole in ice for gas exchange
      <br>- Stop feeding below 50°F
      <br>- Remove snow from ice
      <br>- Monitor water quality</p>
    `,
    author: "Lisa Wong",
    date: "March 5, 2024",
    readTime: "7 min read"
  }
};

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogData[id];

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  return (
    <div className="blog-detail-page">
      <Header />
      <div className="blog-hero">
        <div className="blog-hero-image" style={{ backgroundImage: `url(${blog.image})` }}></div>
        <div className="blog-hero-content">
          <h1>{blog.title}</h1>
          <div className="blog-meta">
            <span className="author">{blog.author}</span>
            <span className="date">{blog.date}</span>
            <span className="read-time">{blog.readTime}</span>
          </div>
        </div>
      </div>
      <div className="blog-detail-container">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <article className="blog-detail">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </div>
      <Footer />
    </div>
  );
}

export default BlogDetail;
