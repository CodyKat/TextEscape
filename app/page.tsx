'use client'

import Link from 'next/link'
import { Play, ThumbsUp, Eye, Bookmark } from 'lucide-react'

export default function Home() {
  const featuredGames = [
    {
      id: 1,
      title: 'Dark Room',
      description: 'You are trapped in a dark room. There is an old door ahead and a bookshelf to your right. The choice is yours.',
      image: '/game1.png',
      likes: 187,
      plays: 29000,
      bookmarks: 1700,
      author: 'textescape',
      publishedAt: '1 year ago'
    },
    {
      id: 2,
      title: 'Maze Escape',
      description: 'You must find your way through a complex maze. Each choice determines your fate. Time is running out.',
      image: '/game2.png',
      likes: 1900,
      plays: 1200000,
      bookmarks: 6200,
      author: 'textescape',
      publishedAt: '1 year ago'
    },
    {
      id: 3,
      title: 'Space Base',
      description: 'Escape from an alien base. The spaceship systems are malfunctioning. Make choices for survival.',
      image: '/game3.png',
      likes: 596,
      plays: 126000,
      bookmarks: 2700,
      author: 'textescape',
      publishedAt: '1 year ago'
    }
  ]

  const gameCategories = [
    {
      title: 'Popular Games',
      games: featuredGames
    },
    {
      title: 'Recommended Games',
      games: featuredGames
    },
    {
      title: 'New Games',
      games: featuredGames
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            Start Your First Adventure
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10">
            Infinite possibilities await you
          </p>
          <Link
            href="/game"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
          >
            <Play className="w-5 h-5" />
            Get Started
          </Link>
        </div>
      </section>

      {/* Featured Games Section */}
      {gameCategories.map((category, categoryIndex) => (
        <section key={categoryIndex} className="w-full py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold">{category.title}</h2>
              <div className="flex-1 h-px bg-border" />
              {/* <Link
                href="/discover"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                View All
                <span>→</span>
              </Link> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.games.map((game) => (
                <div
                  key={game.id}
                  className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-200 hover:shadow-lg"
                >
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 overflow-hidden">
                  <img
                      src={`/game_images/${game.image}`}
                      alt={game.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/50 transition-colors" />
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-white/90 z-10">
                      <span className="font-medium">{game.author}</span>
                      <span className="text-white/50">•</span>
                      <span className="text-white/50">{game.publishedAt}</span>
                    </div>
                    <button className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors z-10 text-white/90">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-6">
                    <Link
                      href={`/game/${game.id}`}
                      className="block mb-3 group-hover:text-primary transition-colors"
                    >
                      <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {game.description}
                      </p>
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4 pb-4 border-b border-border">
                      <div className="flex items-center gap-1.5">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{game.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        <span>{game.plays.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bookmark className="w-4 h-4" />
                        <span>{game.bookmarks.toLocaleString()}</span>
                      </div>
                    </div>
                    <Link
                      href={`/game/${game.id}`}
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all hover:scale-[1.02]"
                    >
                      <Play className="w-4 h-4" />
                      Play
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}