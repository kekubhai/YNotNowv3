import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, ThumbsUp } from 'lucide-react';

interface Tweet {
  id: number;
  avatar: string;
  name: string;
  username: string;
  verified: boolean;
  content: string;
  time: string
  likes: number;
  replies: number ;
}

export const FlowingTweets: React.FC = () => {
  // Use state to track which images have failed to load
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  
  const tweets: Tweet[] = [
    {
      id: 1,
      avatar: "https://pbs.twimg.com/profile_images/1433095037407461379/SMhU_ygp_400x400.jpg",
      name: "Daniel Vassallo",
      username: "@dvassallo",
      verified: true,
      content: "Before investing months of work on a business idea, try to figure out how to get just one customer first. You might find that this is harder than expected, and it will save you a ton of time.",
      time: "June 9, 2020",
      likes: 1547,
      replies: 52
    },
    {
      id: 2,
      avatar: "https://pbs.twimg.com/profile_images/1928128178478493696/tJ-lYYrX_400x400.jpg",
      name: "Sayan",
      username: "@AIxSayan",
      verified: false,
      content: "Working on my pitch deck for investors\n\nIt's all about telling a compelling story \n\nWhat's your best tip for creating an effective pitch deck?",
      time: "June 28",
      likes: 14,
      replies: 6
    },
    {
      id: 3,
      avatar: "https://pbs.twimg.com/profile_images/1888031989764816896/wROYGtxj_400x400.jpg",
      name: "Ahmed Naeem",
      username: "@anaeem152",
      verified: false,
      content: "One year ago, I didn't know what product-market fit meant.\n\nToday, I'm helping startups find it.\n\nWilling to share everything I've learned. Ask me anything.",
      time: "June 22",
      likes: 51,
      replies: 10
    },
    {
      id: 4,
      avatar: "https://pbs.twimg.com/profile_images/1668929744556535810/jBCqXKw-_400x400.jpg",
      name: "Gautham",
      username: "@YaramasaGautham",
      verified: false,
      content: "To all the makers building in public, what's the most satisfying part of the journey so far?",
      time: "June 29",
      likes: 2,
      replies: 2
    },
    {
      id: 5,
      avatar: "https://pbs.twimg.com/profile_images/1915721751736283136/QcGNsVBN_400x400.jpg",
      name: "Srki Rakic",
      username: "@SrkiBuilds",
      verified: true,
      content: "Working on my next thing. Looking for a co-founder as well. Who's ready to go on the startup journey with me?",
      time: "June 28",
      likes: 24,
      replies: 15
    },
    {
      id: 6,
      avatar: "https://pbs.twimg.com/profile_images/1858905235839762432/oVjoloD8_400x400.jpg",
      name: "Imad",
      username: "@imad_codes",
      verified: false,
      content: "I spent almost a month building a task management app with React. Coded it all from scratch with lots of cool features to stand out from other apps.\n\nOnly to find out that no one needed what I've built. I haven't got a single paying customer yet.\n\nLesson to learn: validate first.",
      time: "June 26",
      likes: 229,
      replies: 19
    },
    {
      id: 7,
      avatar: "https://pbs.twimg.com/profile_images/1674117507390742529/ywehhz0r_400x400.jpg",
      name: "Amit Chauhan",
      username: "@xamit1_",
      verified: false,
      content: "Just built something cool!\n\nLooking for early testers to try it.\n\nAny suggestions on how I can validate it?\n\nReally excited to share it with the world.",
      time: "June 28",
      likes: 4,
      replies: 8
    },
    {
      id: 8,
      avatar: "https://pbs.twimg.com/profile_images/1935337051051302912/3TmSBBZb_400x400.jpg",
      name: "Isha Singh",
      username: "@thetwinklecodes",
      verified: false,
      content: "Validated my idea and now working on MVP.\n\nWould you recommend a fully fledged MVP or just enough to showcase core functionality?",
      time: "June 30",
      likes: 0,
      replies: 2
    },
    {
      id: 9,
      avatar: "https://pbs.twimg.com/profile_images/1668987542452273159/gVJqNGKi_400x400.jpg",
      name: "Taseed Muhammad",
      username: "@TaseedM41424",
      verified: false,
      content: "Anyone got any insights on the best app for validating ideas?\n\nMy confusion increases every day, dealing with too many startup ideas and figuring out which one to work on.",
      time: "June 26",
      likes: 0,
      replies: 0
    },
    {
      id: 10,
      avatar: "https://pbs.twimg.com/profile_images/1887084348022845440/EQD9xnXm_400x400.jpg",
      name: "Sidessh",
      username: "@SidesshMore",
      verified: false,
      content: "Poll:\n\nWhich one would you do?\n\nA: Validate your startup idea first by talking to potential customers and then start building the product\n\nB: Build the product first and then try to find customers",
      time: "June 27",
      likes: 1,
      replies: 3
    }
  ];

  // Download and save the profile images locally
  const getLocalProfileImage = (index: number): string => {
    // If the image failed to load, return a unique placeholder based on the user's name
    if (failedImages[index]) {
      const tweet = tweets[index % tweets.length];
      const initials = tweet.name.split(' ').map(n => n[0]).join('');
      const colors = [
        'bg-purple-600', 'bg-blue-600', 'bg-green-600', 'bg-red-600', 
        'bg-yellow-600', 'bg-pink-600', 'bg-indigo-600', 'bg-teal-600'
      ];
      const colorIndex = index % colors.length;
      
      // Return a data URL for a colored circle with initials
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="${colors[colorIndex]}"><rect width="100" height="100" fill="%23${colors[colorIndex].substring(3)}"/><text x="50" y="55" font-family="Arial" font-size="30" fill="white" text-anchor="middle">${initials}</text></svg>`;
    }
    
    // Use a proxy service to avoid CORS issues with Twitter images
    return `https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=${encodeURIComponent(tweets[index % tweets.length].avatar)}`;
  };

  // Create refs for animation containers
  const columnOneRef = useRef<HTMLDivElement>(null);
  const columnTwoRef = useRef<HTMLDivElement>(null);
  const columnThreeRef = useRef<HTMLDivElement>(null);
  
  // State to trigger re-render of duplicated tweets
  const [duplicatedTweets, setDuplicatedTweets] = useState({
    col1: tweets.slice(0, 3),
    col2: tweets.slice(3, 7),
    col3: tweets.slice(7)
  });

  useEffect(() => {
    // Create duplicated arrays instead of using innerHTML
    setDuplicatedTweets({
      col1: [...tweets.slice(0, 3), ...tweets.slice(0, 3)],
      col2: [...tweets.slice(3, 7), ...tweets.slice(3, 7)],
      col3: [...tweets.slice(7), ...tweets.slice(7)]
    });
    
    const animate = (element: HTMLDivElement | null, speed: number) => {
      if (!element) return;
      
      let position = 0;
      const totalHeight = element.scrollHeight / 2;
      
      const step = () => {
        position -= speed;
        // Reset position when we've scrolled through half the content
        if (position <= -totalHeight) {
          position = 0;
        }
        if (element) {
          element.style.transform = `translateY(${position}px)`;
        }
        requestAnimationFrame(step);
      };
      
      requestAnimationFrame(step);
    };

    // Start animations with proper refs
    animate(columnOneRef.current, 0.5);
    animate(columnTwoRef.current, 0.7);
    animate(columnThreeRef.current, 0.4);
  }, []);

  // Handle image load errors
  const handleImageError = (index: number) => {
    setFailedImages(prev => ({ ...prev, [index]: true }));
  };

  const renderTweet = (tweet: Tweet, index: number) => {
    const uniqueIndex = tweet.id - 1; // Use tweet ID to get consistent index

    return (
      <div 
        key={`${tweet.id}-${index}`} 
        className="bg-slate-900/80 border border-purple-900/30 rounded-xl p-5 backdrop-blur-sm hover:shadow-purple-900/20 hover:shadow-lg transition-all mb-5"
      >
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-slate-800">
            {/* Use different image sources to avoid CORS issues */}
            {failedImages[uniqueIndex] ? (
              <div 
                className={`w-full h-full flex items-center justify-center text-white font-bold ${
                  uniqueIndex % 2 === 0 ? 'bg-purple-600' : 'bg-blue-600'
                }`}
              >
                {tweet.name.substring(0, 2)}
              </div>
            ) : (
              <img 
                src={tweet.avatar}
                alt={`${tweet.name}'s avatar`} 
                className="w-full h-full object-cover"
                onError={() => handleImageError(uniqueIndex)}
                crossOrigin="anonymous"
              />
            )}
          </div>
          <div>
            <div className="flex items-center">
              <h4 className="text-white font-semibold">{tweet.name}</h4>
              {tweet.verified && (
                <svg className="w-4 h-4 ml-1 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              )}
            </div>
            <p className="text-slate-400 text-sm">{tweet.username}</p>
          </div>
        </div>
        <p className="text-white mb-3 text-sm whitespace-pre-line">
          {tweet.content}
        </p>
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span>{tweet.time}</span>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <MessageSquare className="w-3 h-3 mr-1" />
              <span>{tweet.replies}</span>
            </div>
            <div className="flex items-center">
              <ThumbsUp className="w-3 h-3 mr-1" />
              <span>{tweet.likes}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden h-[600px]">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        <div className="overflow-hidden">
          <div ref={columnOneRef} className="transform-gpu">
            {duplicatedTweets.col1.map((tweet, index) => renderTweet(tweet, index))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div ref={columnTwoRef} className="transform-gpu">
            {duplicatedTweets.col2.map((tweet, index) => renderTweet(tweet, index))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div ref={columnThreeRef} className="transform-gpu">
            {duplicatedTweets.col3.map((tweet, index) => renderTweet(tweet, index))}
          </div>
        </div>
      </div>
    </div>
  );
};