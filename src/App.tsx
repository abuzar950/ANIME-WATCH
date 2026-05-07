import { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  Play, 
  Plus, 
  Check, 
  Star, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  Sword, 
  Heart, 
  Zap, 
  Ghost, 
  Laugh, 
  Trophy, 
  Calendar, 
  Users, 
  Mail, 
  Twitter, 
  Youtube, 
  Instagram,
  Monitor,
  Flame,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'motion/react';

// --- Types ---
interface Anime {
  id: number;
  title: string;
  genre: string[];
  score: number;
  eps: string;
  studio: string;
  year?: string;
  image: string;
  description?: string;
  rank?: number;
  time?: string;
}

// --- Mock Data ---
const TRENDING_ANIME: Anime[] = [
  { id: 1, title: "Attack on Titan", genre: ["Action", "Fantasy"], score: 9.0, eps: "87 eps", studio: "MAPPA", image: "https://picsum.photos/seed/aot/300/420" },
  { id: 2, title: "Demon Slayer", genre: ["Action", "Fantasy"], score: 8.7, eps: "44 eps", studio: "Ufotable", image: "https://picsum.photos/seed/ds/300/420" },
  { id: 3, title: "Jujutsu Kaisen", genre: ["Action", "Supernatural"], score: 8.6, eps: "47 eps", studio: "MAPPA", image: "https://picsum.photos/seed/jjk/300/420" },
  { id: 4, title: "Steins;Gate", genre: ["Sci-Fi", "Thriller"], score: 9.1, eps: "24 eps", studio: "White Fox", image: "https://picsum.photos/seed/sg/300/420" },
  { id: 5, title: "One Piece", genre: ["Adventure", "Comedy"], score: 8.9, eps: "1000+ eps", studio: "Toei", image: "https://picsum.photos/seed/op/300/420" },
  { id: 6, title: "Mob Psycho 100", genre: ["Action", "Comedy"], score: 8.8, eps: "37 eps", studio: "Bones", image: "https://picsum.photos/seed/mp100/300/420" },
  { id: 7, title: "Vinland Saga", genre: ["Historical", "Action"], score: 8.8, eps: "48 eps", studio: "MAPPA", image: "https://picsum.photos/seed/vs/300/420" },
  { id: 8, title: "FMAB", genre: ["Adventure", "Fantasy"], score: 9.1, eps: "64 eps", studio: "Bones", image: "https://picsum.photos/seed/fmab/300/420" },
];

const NEW_EPISODES: Anime[] = [
  { id: 11, title: "Chainsaw Man", genre: ["Action"], score: 8.5, eps: "Ep 12", studio: "MAPPA", image: "https://picsum.photos/seed/csm/300/420", time: "2 hours ago" },
  { id: 12, title: "Blue Lock", genre: ["Sports"], score: 8.3, eps: "Ep 24", studio: "8bit", image: "https://picsum.photos/seed/bl/300/420", time: "5 hours ago" },
  { id: 13, title: "Spy x Family", genre: ["Comedy"], score: 8.6, eps: "Ep 25", studio: "Wit/CloverWorks", image: "https://picsum.photos/seed/sxf/300/420", time: "8 hours ago" },
  { id: 14, title: "Bleach: TYBW", genre: ["Action"], score: 9.0, eps: "Ep 13", studio: "Pierrot", image: "https://picsum.photos/seed/bleach/300/420", time: "1 day ago" },
];

const TOP_RATED: Anime[] = [
  { id: 3, title: "Fullmetal Alchemist: Brotherhood", studio: "Bones", year: "2009", score: 9.1, rank: 1, image: "https://picsum.photos/seed/fmab2/40/60", genre: [] , eps: "" },
  { id: 5, title: "Steins;Gate", studio: "White Fox", year: "2011", score: 9.1, rank: 2, image: "https://picsum.photos/seed/sg2/40/60", genre: [] , eps: "" },
  { id: 1, title: "Attack on Titan", studio: "MAPPA", year: "2013", score: 9.0, rank: 3, image: "https://picsum.photos/seed/aot2/40/60", genre: [] , eps: "" },
  { id: 6, title: "One Piece", studio: "Toei Animation", year: "1999", score: 8.9, rank: 4, image: "https://picsum.photos/seed/op2/40/60", genre: [] , eps: "" },
  { id: 7, title: "Mob Psycho 100", studio: "Bones", year: "2016", score: 8.8, rank: 5, image: "https://picsum.photos/seed/mp2/40/60", genre: [] , eps: "" },
];

const GENRES = [
  { name: "Action", icon: "🔥", count: "1,240", hoverColor: "hover:bg-anime-red" },
  { name: "Romance", icon: "💖", count: "850", hoverColor: "hover:bg-pink-500" },
  { name: "Fantasy", icon: "⚔️", count: "2,100", hoverColor: "hover:bg-emerald-500" },
  { name: "Sci-Fi", icon: "🚀", count: "540", hoverColor: "hover:bg-sky-500" },
  { name: "Horror", icon: "👻", count: "320", hoverColor: "hover:bg-gray-700" },
  { name: "Comedy", icon: "😂", count: "1,890", hoverColor: "hover:bg-yellow-500" },
  { name: "Sports", icon: "🏆", count: "210", hoverColor: "hover:bg-green-600" },
  { name: "Isekai", icon: "🌀", count: "430", hoverColor: "hover:bg-indigo-500" },
];

// --- Components ---

function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 h-16 flex items-center ${isScrolled ? 'bg-anime-dark/95 backdrop-blur-md border-b border-anime-border shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex items-center justify-between">
        <div className="flex items-center gap-10">
          <a href="#" className="text-2xl font-black tracking-tighter flex items-center gap-2 text-white font-heading">
            <span className="text-anime-red">⚔️</span> AniVerse
          </a>
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-400">
            <a href="#home" className="text-white hover:text-anime-red transition-colors">Home</a>
            <a href="#trending" className="hover:text-white transition-colors">Browse</a>
            <a href="#top-rated" className="hover:text-white transition-colors">Top Rated</a>
            <a href="#new" className="hover:text-white transition-colors">New Releases</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search anime..." 
              className="bg-anime-surface border border-anime-border rounded-full py-1.5 px-4 text-xs w-48 focus:outline-none focus:border-anime-red transition-all"
            />
          </div>
          <button className="bg-anime-red hover:opacity-90 text-white px-5 py-2 rounded-full text-sm font-bold glow-accent transition-all transform hover:scale-105 active:scale-95">
            Sign Up Free
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-anime-surface border-b border-white/10 p-4 md:hidden flex flex-col gap-4 shadow-2xl"
          >
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Home</a>
            <a href="#trending" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Browse</a>
            <a href="#top-rated" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Top Rated</a>
            <a href="#community" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Community</a>
            <button className="w-full bg-anime-red py-3 rounded-xl font-black">Sign Up Free</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function StatCounter({ target, label }: { target: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const targetNum = parseInt(target.replace(/[^0-9]/g, ''));
      const duration = 2000;
      const increment = targetNum / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetNum) {
          setCount(targetNum);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  const displayValue = target.includes('M') ? `${count}M+` : target.includes('K') ? `${count}K+` : count;

  return (
    <div ref={ref} className="text-center p-6 rounded-3xl bg-anime-surface border border-anime-border">
      <div className="text-4xl md:text-5xl font-black text-anime-red mb-2">{displayValue}</div>
      <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">{label}</div>
    </div>
  );
}

function AnimeCard({ anime, onWatchlistToggle, isInWatchlist }: { anime: Anime; onWatchlistToggle: (id: number) => void; isInWatchlist: boolean; key?: any }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="flex-shrink-0 w-48 md:w-56 group relative bg-anime-surface border border-anime-border rounded-2xl p-3 hover:translate-y-[-4px] transition-transform"
    >
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-anime-red/10">
        <img 
          src={anime.image} 
          alt={anime.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 anime-card-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <button 
            onClick={() => onWatchlistToggle(anime.id)}
            className={`w-full py-2 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1 ${isInWatchlist ? 'bg-green-500 text-white' : 'bg-anime-red text-white glow-accent'}`}
          >
            {isInWatchlist ? <><Check className="w-3 h-3" /> Added</> : <><Plus className="w-3 h-3" /> Watchlist</>}
          </button>
        </div>
        <div className="absolute top-2 right-2 glass-morphism px-2 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span className="text-[10px] font-bold">{anime.score}</span>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-bold text-sm line-clamp-1 group-hover:text-anime-red transition-colors font-heading">{anime.title}</h3>
        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 font-bold uppercase">
          <span>{anime.studio}</span>
          <span>•</span>
          <span>{anime.eps}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [toast, setToast] = useState<string | null>(null);
  const trendingContainerRef = useRef<HTMLDivElement>(null);

  const toggleWatchlist = (id: number) => {
    setWatchlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredAnime = activeFilter === 'All' 
    ? TRENDING_ANIME 
    : TRENDING_ANIME.filter(a => a.genre.includes(activeFilter));

  const scrollTrending = (direction: 'left' | 'right') => {
    if (trendingContainerRef.current) {
      const scrollAmount = 300;
      trendingContainerRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setToast("Thanks! Check your inbox 📬");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen">
      <Nav />
      
      {/* --- HERO SECTION --- */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-anime-dark via-anime-dark/80 to-transparent z-10" />
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
          >
            <img 
              src="https://picsum.photos/seed/hero/1920/1080" 
              className="w-full h-full object-cover blur-sm opacity-40 scale-105" 
              alt="Hero Backdrop"
            />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-anime-red/10 border border-anime-red/20 text-anime-red text-xs font-bold mb-6 uppercase tracking-widest">
              <Flame className="w-4 h-4" /> Global Premiere Today
            </div>
            <h1 className="text-6xl md:text-8xl font-black font-heading leading-none tracking-tighter mb-6">
              Your Anime <br />
              <span className="text-anime-red">Universe</span> <br />
              Starts Here
            </h1>
            <p className="text-lg text-slate-300 max-w-lg mb-10 leading-relaxed font-medium">
              Discover 10,000+ anime series, track your watchlist, and join 2M+ fans worldwide on the most advanced platform ever built.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-anime-red hover:opacity-90 text-white px-8 py-4 rounded-full font-black text-lg transition-all flex items-center gap-2 glow-accent group">
                <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" /> Start Watching Free
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-black text-lg border border-white/20 hover:bg-white/20 transition-all">
                Browse Anime
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-anime-red/30 to-anime-purple/30 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
            <div className="relative glass-morphism rounded-3xl p-6 overflow-hidden">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 relative">
                <img src="https://picsum.photos/seed/featured/800/450" className="w-full h-full object-cover" alt="Featured" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div>
                    <h2 className="text-2xl font-black mb-1">Cyberpunk: Edgerunners</h2>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                      <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-current" /> 8.7</span>
                      <span>Studio Trigger</span>
                      <span>Sci-Fi</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-anime-surface overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-4 border-anime-surface bg-anime-surface flex items-center justify-center text-[10px] font-bold">
                    +15k
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-400">Watching Now</div>
                  <div className="text-sm font-black text-anime-red">2.4k Active</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">Scroll</span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-anime-red to-transparent" />
        </motion.div>
      </section>

      {/* --- TRENDING SECTION --- */}
      <section id="trending" className="py-24 max-w-7xl mx-auto px-4 md:px-8 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black font-heading mb-4 flex items-center gap-4">
              Trending <span className="bg-anime-red/10 text-anime-red px-3 py-1 rounded-xl text-xl">Seasonal</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {['All', 'Action', 'Fantasy', 'Adventure', 'Comedy', 'Sci-Fi'].map(pill => (
                <button 
                  key={pill}
                  onClick={() => setActiveFilter(pill)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${activeFilter === pill ? 'bg-anime-red border-anime-red text-white' : 'bg-transparent border-white/10 text-slate-400 hover:border-white/30'}`}
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scrollTrending('left')} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-anime-red hover:border-anime-red transition-all">
              <ChevronLeft />
            </button>
            <button onClick={() => scrollTrending('right')} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-anime-red hover:border-anime-red transition-all">
              <ChevronRight />
            </button>
          </div>
        </div>

        <div 
          ref={trendingContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredAnime.map(anime => (
              <AnimeCard 
                key={anime.id} 
                anime={anime} 
                onWatchlistToggle={toggleWatchlist}
                isInWatchlist={watchlist.includes(anime.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* --- SPOTLIGHT --- */}
      <section className="py-24 w-full bg-anime-surface/30 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-anime-red rounded-full blur-[180px] opacity-[0.03] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1.65fr_1fr] gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative h-full rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-black/40 border border-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-anime-dark via-anime-dark/40 to-transparent z-10"></div>
            <img 
              src="https://picsum.photos/seed/yourname/1200/800" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              alt="Spotlight Masterpiece"
            />
            <div className="absolute bottom-0 left-0 p-10 w-full z-20">
              <div className="inline-block bg-anime-red text-[10px] uppercase font-black tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 glow-accent">
                ⭐ Editor's Pick
              </div>
              <h2 className="text-5xl md:text-7xl font-black font-heading mb-6 tracking-tighter leading-none">Your Name <br /><span className="text-anime-red">(Kimi no Na wa)</span></h2>
              <div className="flex flex-wrap gap-6 mb-8 text-slate-300 font-bold text-sm">
                <span className="flex items-center gap-1 text-yellow-500"><Star className="w-4 h-4 fill-current" /> 9.1</span>
                <span>• 1h 46m</span>
                <span>• Studio: CoMix Wave</span>
                <span className="bg-white/10 px-3 py-1 rounded-lg text-xs uppercase tracking-widest">Romance</span>
                <span className="bg-white/10 px-3 py-1 rounded-lg text-xs uppercase tracking-widest">Masterpiece</span>
              </div>
              <p className="text-lg text-white/70 max-w-2xl mb-10 leading-relaxed font-medium line-clamp-2">
                Two high school students, a boy in Tokyo and a girl in a rural town, begin to swap bodies. As they search for each other, they realize their connection is deeper than they ever imagined.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-anime-red hover:opacity-90 text-white px-10 py-4 rounded-full font-black flex items-center gap-2 group transition-all glow-accent">
                  <Play className="w-5 h-5 fill-current" /> Play Now
                </button>
                <button className="bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-full font-black border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2">
                  <Plus className="w-5 h-5" /> Add to Watchlist
                </button>
              </div>
            </div>
          </motion.div>

          <aside className="flex flex-col gap-8 h-full">
            <div>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-xl font-black font-heading tracking-tight">Recent Activity</h2>
                <a href="#" className="text-xs text-slate-500 hover:text-anime-red font-bold transition-colors">View All</a>
              </div>
              <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {TRENDING_ANIME.slice(0, 4).map((anime) => (
                  <div key={anime.id} className="bg-anime-surface border border-anime-border p-3 rounded-[1.25rem] flex gap-4 hover:translate-x-1 transition-all cursor-pointer group">
                    <img src={anime.image} className="w-16 h-20 rounded-xl object-cover shrink-0" alt={anime.title} />
                    <div className="flex flex-col justify-center">
                      <h3 className="font-bold text-sm mb-1 group-hover:text-anime-red transition-colors font-heading truncate w-32">{anime.title}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-0.5 text-yellow-500"><Star className="w-3 h-3 fill-current" /> {anime.score}</span>
                        <span>• {anime.eps}</span>
                      </div>
                      <div className="mt-2 text-[9px] bg-anime-red/10 text-anime-red px-2 py-0.5 rounded-full self-start font-black uppercase tracking-tighter">
                        {anime.genre[0]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="bg-gradient-to-br from-anime-purple/20 to-anime-purple/5 border border-anime-purple/20 p-6 rounded-3xl relative overflow-hidden group">
                <Award className="absolute -top-4 -right-4 w-24 h-24 text-anime-purple/10 group-hover:rotate-12 transition-transform" />
                <h3 className="text-sm font-black uppercase tracking-widest text-anime-purple mb-2">Community Goal</h3>
                <div className="text-2xl font-black mb-4">Milestone: 10M Plays</div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-4/5 h-full bg-anime-purple glow-accent"></div>
                </div>
                <div className="mt-2 text-[10px] text-slate-400 font-bold uppercase">80% Reached • 2.1k online</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-black font-heading mb-12 text-center tracking-tighter">Browse <span className="text-anime-red">Genres</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {GENRES.map((genre, idx) => (
            <motion.div 
              key={genre.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative overflow-hidden group cursor-pointer p-6 rounded-2xl bg-anime-surface border border-anime-border flex flex-col items-center justify-center gap-2 transition-colors ${genre.hoverColor}`}
            >
              <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
                {genre.icon}
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-center">{genre.name}</h3>
              <p className="text-[10px] font-bold text-white/40 group-hover:text-white/80 transition-colors uppercase">{genre.count}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- TOP RATED & NEW RELEASES --- */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div id="top-rated" className="lg:col-span-4">
          <h2 className="text-3xl font-black font-heading mb-8 flex items-center gap-3">
            <Trophy className="text-yellow-500" /> All-Time Classics
          </h2>
          <div className="space-y-4">
            {TOP_RATED.map((anime) => (
              <div 
                key={anime.id} 
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-anime-surface/80 hover:border-anime-red/30 transition-all cursor-pointer"
              >
                <div className="text-2xl font-black text-slate-600 w-6 group-hover:text-anime-red transition-colors text-center">{anime.rank}</div>
                <img src={anime.image} alt={anime.title} className="w-12 h-16 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate group-hover:text-anime-red transition-colors">{anime.title}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase mt-1">
                    <span>{anime.studio}</span>
                    <span>•</span>
                    <span>{anime.year}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-anime-red">{anime.score}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="new" className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black font-heading flex items-center gap-3">
              <Flame className="text-anime-red" /> New Episodes
            </h2>
            <a href="#" className="text-sm font-bold text-anime-red hover:underline">View Schedule</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-x-auto pb-4 custom-scrollbar lg:overflow-visible">
            {NEW_EPISODES.map((anime) => (
              <motion.div 
                key={anime.id} 
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-anime-dark border border-anime-border p-2 rounded-2xl flex items-center gap-3 min-w-[220px]"
              >
                <div className="relative shrink-0">
                  <img src={anime.image} alt={anime.title} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="absolute -top-1 -left-1 bg-green-500 w-2.5 h-2.5 rounded-full border-2 border-anime-dark"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs line-clamp-1 group-hover:text-anime-red transition-colors font-heading tracking-tight">{anime.title}</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">{anime.eps}</span>
                    <span className="text-[9px] text-slate-600 font-bold">• {anime.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COMMUNITY --- */}
      <section id="community" className="py-24 bg-anime-surface/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black font-heading mb-6">Join the <span className="text-anime-red">AniVerse</span> Community</h2>
            <p className="text-slate-400 text-lg">Connect with millions of fans, participate in discussions, and get personalized recommendations from our AI and community experts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <StatCounter target="2.4M" label="Global Members" />
            <StatCounter target="12K" label="Anime Titles" />
            <StatCounter target="850K" label="Fan Reviews" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-anime-surface border border-anime-border p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 text-anime-red/5 group-hover:text-anime-red/10 transition-all">
                  <Users className="w-32 h-32" />
                </div>
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-anime-red">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                  <div>
                    <div className="font-black font-heading">OtakuMaster_{i}00</div>
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-yellow-500 fill-current" />)}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 italic relative z-10 font-medium">"AniVerse is hands down the best anime platform in 2025. The UI is insane and the community is super helpful!"</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button className="bg-anime-red hover:bg-anime-red/90 text-white px-12 py-5 rounded-full font-black text-xl transition-all shadow-xl shadow-anime-red/30">
              Join Free Today
            </button>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
          <div className="bg-anime-red rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden glow-accent">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-3xl" />
            
            <Mail className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-black font-heading mb-4">Weekly Picks in Your Inbox</h2>
            <p className="text-white/80 mb-10 text-lg font-medium">Join 150K+ subscribers and get the best seasonal picks, leaks, and news every Monday morning.</p>
            
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                required 
                placeholder="Enter your email" 
                className="flex-1 bg-black/20 border border-white/20 rounded-2xl px-6 py-4 placeholder:text-white/60 focus:outline-none focus:bg-black/30 transition-all font-bold text-white text-sm"
              />
              <button className="bg-white text-anime-red px-8 py-4 rounded-2xl font-black hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 text-sm shadow-xl shadow-black/10">
                Subscribe <ChevronRight className="w-5 h-5" />
              </button>
            </form>
            <p className="mt-6 text-[10px] text-white/50 font-black uppercase tracking-[0.2em]">No spam • Unsubscribe anytime</p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-anime-dark pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
            <div className="lg:col-span-2">
              <a href="#" className="text-3xl font-black tracking-tighter flex items-center gap-2 text-white mb-6">
                <span className="text-anime-red">Ani</span>Verse ⚔️
              </a>
              <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                The world's premium anime ecosystem. Built by fans, for fans. Discover, track, and share the art of anime.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-anime-red transition-all cursor-pointer"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-anime-red transition-all cursor-pointer"><Youtube className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-anime-red transition-all cursor-pointer"><Instagram className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-black mb-6 uppercase tracking-widest text-xs text-anime-red">Discover</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Anime Seasonal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Manga Library</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Top Characters</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Release Calendar</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-black mb-6 uppercase tracking-widest text-xs text-anime-red">Community</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Discord Server</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discussion Forums</a></li>
                <li><a href="#" className="hover:text-white transition-colors">User Reviews</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fan Art Gallery</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-black mb-6 uppercase tracking-widest text-xs text-anime-red">Support</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-slate-500 text-xs font-bold">
              © 2025 AniVerse Global Inc. All rights reserved. Built with ❤️ for the Otaku community.
            </div>
            <div className="flex items-center gap-6 text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" /> API Docs</span>
              <span>English (US)</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Decorative Glows */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-anime-red rounded-full blur-[160px] opacity-[0.05] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-anime-purple rounded-full blur-[200px] opacity-[0.05] pointer-events-none z-0"></div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-anime-dark px-8 py-4 rounded-2xl font-black shadow-2xl z-[100] flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
              <Check className="w-5 h-5" />
            </div>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
