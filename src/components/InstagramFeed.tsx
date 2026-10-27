import { posts } from 'virtual:instagram-feed'
import { Icon } from './Icon.tsx'
import gridSvg from '../assets/icons/grid.svg?raw'
import instagramSvg from '../assets/icons/instagram.svg?raw'

export function InstagramFeed() {
  if (posts.length === 0) return null

  return (
    <div className="insta">
      <div className="insta-head">
        <span className="lbl">
          <Icon svg={instagramSvg} />
          @swimdcac
        </span>
        <a href="https://instagram.com/swimdcac" target="_blank" rel="noopener noreferrer">
          Follow us →
        </a>
      </div>
      <div className="insta-grid">
        {posts.map(post => (
          <a
            key={post.id}
            className="insta-post"
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={post.caption?.slice(0, 100) ?? 'View on Instagram'}
          >
            <img src={post.local_image} alt="" loading="lazy" />
            {post.media_type === 'VIDEO' && (
              <span className="insta-badge" aria-hidden="true">▶</span>
            )}
            {post.media_type === 'CAROUSEL_ALBUM' && (
              <span className="insta-badge" aria-hidden="true">
                <Icon svg={gridSvg} />
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}
