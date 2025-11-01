'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Play, ThumbsUp, Eye, Bookmark } from 'lucide-react'

// Game data type
interface Game {
  id: number
  title: string
  description: string
  image: string
  likes: number
  plays: number
  bookmarks: number
  author: string
  publishedAt: string
}

// Dummy data generation function (should fetch from API in production)
function generateGames(count: number, offset: number = 0): Game[] {
  const gameTemplates = [
    {
      title: 'Dark Room',
      description: 'You are trapped in a dark room. There is an old door ahead and a bookshelf to your right. The choice is yours.',
      image: '/game1.png',
      author: 'textescape'
    },
    {
      title: 'Maze Escape',
      description: 'You must find your way through a complex maze. Each choice determines your fate. Time is running out.',
      image: '/game2.png',
      author: 'textescape'
    },
    {
      title: 'Space Base',
      description: 'Escape from an alien base. The spaceship systems are malfunctioning. Make choices for survival.',
      image: '/game3.png',
      author: 'textescape'
    },
    {
      title: 'Ancient Temple',
      description: 'An evil spirit that was sleeping deep in the ancient temple has awakened. You must escape the temple.',
      image: '/game4.png',
      author: 'textescape'
    },
    {
      title: 'Middle of the Ocean',
      description: 'The ship has wrecked and you are stranded on a small island. Water and food are scarce. Make choices for survival.',
      image: '/game5.png',
      author: 'textescape'
    },
    {
      title: 'Future City',
      description: 'You are being chased by someone in the cyberpunk city of 2077. You must find a place to hide.',
      image: '/game6.png',
      author: 'textescape'
    },
    {
      title: 'Inescapable House',
      description: 'The moment you entered the strange house, the door disappeared. Each room has a different puzzle hidden.',
      image: '/game7.png',
      author: 'textescape'
    },
    {
      title: 'Time Loop',
      description: 'The same day repeats. You must change past decisions to break the loop.',
      image: '/game8.png',
      author: 'textescape'
    },
    {
      title: 'Lost Memory',
      description: 'You wake up with no memory. You must collect clues around you to find your identity.',
      image: '/game9.png',
      author: 'textescape'
    },
    {
      title: 'Underground Prison',
      description: 'Escape from a deep underground prison. You must get help from other prisoners.',
      image: '/game10.png',
      author: 'textescape'
    },
    {
      title: 'Magic School',
      description: 'You entered the forbidden tower of the magic school. You must survive in the cursed classroom.',
      image: '/game11.png',
      author: 'textescape'
    },
    {
      title: 'Glacier Cave',
      description: 'You are trapped in a cave in the middle of a glacier. The temperature is dropping. Escape quickly.',
      image: '/game12.png',
      author: 'textescape'
    },
    {
      title: 'Digital World',
      description: 'You are trapped in a virtual reality game. Escape the system by avoiding bugs and viruses.',
      image: '/game13.png',
      author: 'textescape'
    },
    {
      title: 'Haunted Hotel',
      description: 'You stayed at an abandoned hotel. Strange phenomena occur as night falls.',
      image: '/game14.png',
      author: 'textescape'
    },
    {
      title: 'Desert Oasis',
      description: 'You arrived at an oasis in the middle of the desert, but this might be a trap.',
      image: '/game15.png',
      author: 'textescape'
    },
    {
      title: 'Space Station',
      description: 'The AI of the space station has lost control. Escape with the survivors.',
      image: '/game16.png',
      author: 'textescape'
    },
    {
      title: 'Cyber Slave',
      description: 'You have become a slave in a corporate city of the future. You must find freedom with a hacker group.',
      image: '/game17.png',
      author: 'textescape'
    },
    {
      title: 'Werewolf',
      description: 'You are lost in a dark forest. There are creatures that transform when the full moon rises.',
      image: '/game18.png',
      author: 'textescape'
    },
    {
      title: 'Undersea City',
      description: 'Your submarine broke down and you crash-landed in an undersea city. Oxygen is running low.',
      image: '/game19.png',
      author: 'textescape'
    },
    {
      title: 'Minimalist Room',
      description: 'You wake up in an all-white room. There is only one door.',
      image: '/game20.png',
      author: 'textescape'
    },
    {
      title: 'Countdown Village',
      description: 'You entered a village with a time bomb installed. Find and defuse the bomb before it explodes.',
      image: '/game21.png',
      author: 'textescape'
    },
    {
      title: 'AI Trap',
      description: 'A superintelligent AI is using you for experiments. Escape from the simulation.',
      image: '/game22.png',
      author: 'textescape'
    },
    {
      title: 'Casino Hell',
      description: 'You must get all your money back and escape from a casino where you lost everything gambling.',
      image: '/game23.png',
      author: 'textescape'
    },
    {
      title: 'Zombie Apocalypse',
      description: 'Survive in a city where a virus has spread and make it to the safe zone.',
      image: '/game24.png',
      author: 'textescape'
    },
    {
      title: 'Vampire Castle',
      description: 'You were invited to an ancient vampire castle. You must escape before dawn.',
      image: '/game25.png',
      author: 'textescape'
    },
    {
      title: 'Machine City',
      description: 'You must survive in a machine city where humans have disappeared, avoiding robot control.',
      image: '/game26.png',
      author: 'textescape'
    },
    {
      title: 'Amazon Jungle',
      description: 'You are lost in the middle of the jungle. Avoid toxic plants and wild animals.',
      image: '/game27.png',
      author: 'textescape'
    },
    {
      title: 'Devil Contract',
      description: 'You made a contract with a devil but regret it. You must retrieve the contract.',
      image: '/game28.png',
      author: 'textescape'
    },
    {
      title: 'Time Traveler Mistake',
      description: 'You changed the past during time travel and history is twisted. You must restore it.',
      image: '/game29.png',
      author: 'textescape'
    },
    {
      title: 'Moon Base',
      description: 'The life support system of the moon base has malfunctioned. You must return to Earth.',
      image: '/game30.png',
      author: 'textescape'
    },
    {
      title: 'Thief Last Day',
      description: 'You must break through the best security system and steal the treasure. You only have one chance.',
      image: '/game31.png',
      author: 'textescape'
    },
    {
      title: 'Project Metro',
      description: 'The subway tunnel has collapsed. You must survive until rescue arrives.',
      image: '/game32.png',
      author: 'textescape'
    },
    {
      title: 'Horror Museum',
      description: 'You are trapped in a museum. As night falls, the exhibits come to life.',
      image: '/game33.png',
      author: 'textescape'
    },
    {
      title: 'Minecraft Hell',
      description: 'You are trapped inside a video game. Real death is game over.',
      image: '/game34.png',
      author: 'textescape'
    },
    {
      title: 'Underground Mine',
      description: 'You are trapped in a collapsed mine. Oxygen is running low and you must send a rescue signal.',
      image: '/game35.png',
      author: 'textescape'
    },
    {
      title: 'Necromancer Lab',
      description: 'You are trapped in a necromancer laboratory trying to resurrect the dead.',
      image: '/game36.png',
      author: 'textescape'
    },
    {
      title: 'Mirror World',
      description: 'You were pulled into a mirror. You must return from the opposite world to the original world.',
      image: '/game37.png',
      author: 'textescape'
    },
    {
      title: 'Zombie Lab',
      description: 'An accident occurred in a virus research lab. Escape before you get infected.',
      image: '/game38.png',
      author: 'textescape'
    },
    {
      title: 'Golden Temple',
      description: 'You entered a temple full of treasure, but traps are everywhere.',
      image: '/game39.png',
      author: 'textescape'
    },
    {
      title: 'Alaska Chase',
      description: 'You are running away in the polar region. A storm is approaching.',
      image: '/game40.png',
      author: 'textescape'
    },
    {
      title: 'With a Psychopath',
      description: 'You must live in the same house with a psychopath. Pretend not to suspect him.',
      image: '/game41.png',
      author: 'textescape'
    },
    {
      title: 'Dimension Break',
      description: 'The dimension has shattered. Reality is collapsing as multiple parallel universes mix.',
      image: '/game42.png',
      author: 'textescape'
    },
    {
      title: 'Autopsy Room',
      description: 'You wake up in an anatomy lab. Something is watching you.',
      image: '/game43.png',
      author: 'textescape'
    },
    {
      title: 'Doll House',
      description: 'You are trapped in a giant doll house. Everything is larger than you.',
      image: '/game44.png',
      author: 'textescape'
    },
    {
      title: 'Electric Prison',
      description: 'Escape from a prison with an electrified floor. One mistake is fatal.',
      image: '/game45.png',
      author: 'textescape'
    },
    {
      title: 'Night Without Stars',
      description: 'On a night when all stars disappeared, aliens invaded Earth.',
      image: '/game46.png',
      author: 'textescape'
    },
    {
      title: 'Deserted Island Survival',
      description: 'You are stranded on a deserted island. You must send a rescue signal and find survival resources.',
      image: '/game47.png',
      author: 'textescape'
    },
    {
      title: 'Ancient Evil Spirit',
      description: 'An ancient evil spirit has awakened. You must find the sealing spell again.',
      image: '/game48.png',
      author: 'textescape'
    },
    {
      title: 'Las Vegas Darkness',
      description: 'You must win big money in an underground casino in Las Vegas. But there is a trap.',
      image: '/game49.png',
      author: 'textescape'
    },
    {
      title: 'Metro 2033',
      description: 'People surviving in the subway after nuclear war. You must go to the surface.',
      image: '/game50.png',
      author: 'textescape'
    },
    {
      title: 'Neverland Trap',
      description: 'You entered Peter Pan Neverland, but this place is dark and dangerous.',
      image: '/game51.png',
      author: 'textescape'
    },
    {
      title: 'AI Robot Revolution',
      description: 'Robots have rebelled. You must find and help a human-friendly AI.',
      image: '/game52.png',
      author: 'textescape'
    },
    {
      title: 'Near Black Hole',
      description: 'Your spaceship is being pulled into a black hole. Where will you be ejected?',
      image: '/game53.png',
      author: 'textescape'
    },
    {
      title: 'Tokyo Ghost',
      description: 'Tokyo 2030. Ghosts have connected the digital world with reality.',
      image: '/game54.png',
      author: 'textescape'
    },
    {
      title: 'Witch Hunt',
      description: 'You must survive by hiding magic in the age of witch hunts.',
      image: '/game55.png',
      author: 'textescape'
    },
    {
      title: 'Elevator Hell',
      description: 'An elevator that goes up endlessly. Each floor has a different test.',
      image: '/game56.png',
      author: 'textescape'
    },
    {
      title: 'Joker Game',
      description: 'You must play a death game with the Joker. Breaking the rules means death.',
      image: '/game57.png',
      author: 'textescape'
    },
    {
      title: 'Medusa Cave',
      description: 'You entered Medusa cave. Escape before you turn to stone.',
      image: '/game58.png',
      author: 'textescape'
    },
    {
      title: 'Steampunk City',
      description: 'A city where steam engines rule everything. You must stop the machines.',
      image: '/game59.png',
      author: 'textescape'
    },
    {
      title: 'Tron World',
      description: 'You entered the world inside a computer. You must crash the system and get out.',
      image: '/game60.png',
      author: 'textescape'
    }
  ]

  return Array.from({ length: count }, (_, i) => {
    const template = gameTemplates[(i + offset) % gameTemplates.length]
    const baseId = offset + i + 1
    return {
      id: baseId,
      ...template,
      likes: Math.floor(Math.random() * 2000) + 100,
      plays: Math.floor(Math.random() * 1000000) + 10000,
      bookmarks: Math.floor(Math.random() * 5000) + 500,
      publishedAt: ['Just now', '1 hour ago', '1 day ago', '1 week ago', '1 month ago', '1 year ago'][Math.floor(Math.random() * 6)]
    }
  })
}

export default function GamePage() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Should be API call in production
    // const response = await fetch(`/api/games?limit=60`)
    // const data = await response.json()
    
    // Delay for simulation
    setTimeout(() => {
      const allGames = generateGames(60, 0)
      setGames(allGames)
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Games</h1>
          <p className="text-lg text-muted-foreground">
            Explore the world of infinite adventures
          </p>
        </div>
      </section>

      {/* Games Grid */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="w-full py-8 flex justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Loading games...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-200 hover:shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden">
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
          )}
        </div>
      </section>
    </div>
  )
}
