import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../Context/AuthContext';

const blogData = [
  {
    id: 1,
    title: 'Mujhe bhi rona aata hai',
    city: 'Kanpur, UP',
    duration: '3 min read',
    category: 'Postpartum Isolation',
    snippet: 'Shaadi ke 6 mahine baad, mujhe ehsaas hua...',
    emoji: '✨',
    language: 'Hindi',
    content: `छह महीने पहले जब मेरा बेटा पैदा हुआ था, तो सबने कहा था कि अब मैं खुश रहूंगी। लेकिन मैं रोज़ रोती थी। मुझे लगता था कि मैं एक बुरी माँ हूँ।

जब मैं अपने पति से कहती थी कि मुझे अकेलापन लगता है, तो वे कहते थे कि बच्चा तो है न तुम्हारे साथ। लेकिन कैसे समझाऊं कि उस छोटे से बच्चे के साथ भी मैं अकेली थी।

धीरे-धीरे मैंने समझा कि यह गलत नहीं है। माँ बनना आसान नहीं है। और रोना भी ठीक है। आज मैं बेहतर हूँ, और मैं चाहती हूँ कि कोई और माँ अकेली महसूस न करे।.`,
    ambience: 'Silence',
    submittedDate: '07/03/2024'
  },
  {
    id: 2,
    title: 'I stopped recognizing my own reflection',
    city: 'Pune',
    duration: '4 min read',
    category: 'Self-Rediscovery',
    snippet: '"I thought healing was a luxury. Turns out it was survival."',
    emoji: '🦋',
    language: 'English',
    content: `Three months postpartum, I caught myself in the bathroom mirror and genuinely didn't recognize the woman staring back at me. Dark circles, unwashed hair, milk stains on a shirt I'd worn for three days straight.

But it wasn't just the physical changes. I felt like I'd lost myself completely. The woman who used to paint on weekends, who read poetry, who had opinions about things that didn't involve sleep schedules or feeding times - where had she gone?

I started small. I bought a notebook and wrote one sentence every day about how I felt. Not about the baby, not about the house, not about anyone else. Just me.

Six months later, I realized I hadn't lost myself. I was just becoming someone new. Someone who could hold a crying baby and still have dreams. Someone who could change a diaper and still write poetry. Someone who could be a mother and still be me.

Healing wasn't a luxury. It was how I survived becoming the woman I was meant to be.`,
    ambience: 'Distant Sitar',
    submittedDate: '07/03/2024'
  },
  {
    id: 3,
    title: 'Anxiety ne mujhe maa banne se pehle hi maa bana diya',
    city: 'Delhi',
    duration: '3 min read',
    category: 'Pregnancy Anxiety',
    snippet: '"Pet mein baccha aur dil mein darr – dono saath saath bade."',
    emoji: '🌸',
    language: 'Hinglish',
    content: `Pregnancy test positive dekh kar khushi ke saath saath ek ajeeb sa darr bhi aa gaya. Kya main achhi maa ban paungi? Kya main sab kuch handle kar paungi?

Social media pe sabki picture perfect pregnancy dekhti thi aur lagta tha sirf main pagal hoon jo itna worry karti hoon. Doctor appointments se pehle raat bhar neend nahi aati thi. Har ultrasound se pehle lagta tha kya pata koi problem ho.

But you know what? Ye anxiety ne mujhe actually better maa banaya. Kyunki main har cheez research karti thi, har possibility ke liye prepared rehti thi. Jab finally baby aaya, main ready thi.

Abhi bhi sometimes overthink karti hoon, but ab samajh gaya hai - perfect maa koi nahi hoti. Caring maa hoti hai. Aur caring maa main already ban gayi thi pregnancy ke time se hi.
`,
    ambience: 'Rainfall',
    submittedDate: '07/03/2024'
  }
];

// ===== Main Component Function =====
function BlogSection() {
  const { user } = useAuth();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [realStories, setRealStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkedStories, setBookmarkedStories] = useState(new Set());

  useEffect(() => {
    loadStories();
    if (user) {
      loadBookmarks();
    }
  }, [user]);

  const loadStories = async () => {
    try {
      const { data, error } = await supabase
        .from('bharosa_stories')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error loading stories:', error);
      }

      if (data) {
        console.log('Loaded real stories:', data.length);
        setRealStories(data);
      }
    } catch (error) {
      console.error('Error loading stories:', error);
    }
    setLoading(false);
  };

  const loadBookmarks = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('story_bookmarks')
        .select('story_id')
        .eq('user_id', user.id);

      if (data) {
        setBookmarkedStories(new Set(data.map(b => b.story_id)));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const toggleBookmark = async (storyId) => {
    if (!user) {
      alert('Please sign in to bookmark stories');
      return;
    }

    try {
      if (bookmarkedStories.has(storyId)) {
        // Remove bookmark
        await supabase
          .from('story_bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('story_id', storyId);

        setBookmarkedStories(prev => {
          const newSet = new Set(prev);
          newSet.delete(storyId);
          return newSet;
        });
      } else {
        // Add bookmark
        await supabase
          .from('story_bookmarks')
          .insert([{ user_id: user.id, story_id: storyId }]);

        setBookmarkedStories(prev => new Set([...prev, storyId]));
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  // Combine dummy data with real stories
  const allStories = [...blogData, ...realStories];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2a0845] to-[#6441a5] text-white px-6 py-12 font-sans">

      {/* 
     Card ssection you can move it to another folder later and make another component later */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-pink-200">Sacred Stories</h2>
        <p className="text-pink-100">Each story is a whisper that became a roar, a silence that found its voice</p>
      </div>
      {/* Yaha pe motion and animation ka use horaha hai, framer motion download karna padega */}
      {loading && (
        <div className="text-center text-pink-200 mb-6">Loading stories...</div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {allStories.map(blog => (
          <motion.div
            key={blog.id}
            whileHover={{ scale: 1.03 }}
            className="bg-purple-700 p-6 rounded-xl shadow-md cursor-pointer relative"
            onClick={() => setSelectedBlog(blog)}
          >
            <div className="absolute top-2 left-2 text-xl">{blog.emoji}</div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-sm text-pink-100 mb-4">{blog.snippet}</p>
              <div className="text-xs text-pink-200 space-y-1">
                <p>📍 {blog.city}</p>
                <p>🕒 {blog.duration}</p>
                <p>🏷️ {blog.category}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

     {/* Yaha blog full khul raha,baad m alag component m shift krdena */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4 py-10">
          <div className="bg-purple-900 p-6 rounded-xl w-full max-w-3xl relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 text-pink-200 hover:text-white text-2xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-pink-100 mb-1">{selectedBlog.title}</h3>
            <p className="text-sm text-pink-300 mb-2">📍 {selectedBlog.city} • 🕒 {selectedBlog.duration} • 🏷️ {selectedBlog.category}</p>
            <p className="italic text-pink-200 mb-6">— Shared from {selectedBlog.city}</p>

            {/* Dropdowns h yaha */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <label className="text-sm block mb-1">Language</label>
                <select className="bg-purple-800 text-white px-3 py-1 rounded">
                  <option>{selectedBlog.language}</option>
                  <option>English (Auto-translate)</option>
                  <option>Hindi</option>
                  <option>Hinglish</option>
                </select>
              </div>
              <div>
                <label className="text-sm block mb-1">Ambiance</label>
                <select className="bg-purple-800 text-white px-3 py-1 rounded">
                  <option>{selectedBlog.ambience}</option>
                  <option>Silence</option>
                  <option>Distant Sitar</option>
                  <option>Rainfall</option>
                </select>
              </div>
            </div>

            {/* Blog Content is hereeeeee */}
            <div className="whitespace-pre-wrap leading-relaxed text-pink-50 text-lg">
              {selectedBlog.content}
            </div>

            <hr className="my-6 border-pink-300" />

            <p className="text-sm italic text-pink-200">
              Thank you for sharing your truth with us 💜
            </p>
            <div className="mt-2 text-xs flex justify-between text-pink-300">
              <span>Submitted on {selectedBlog.submittedDate || new Date(selectedBlog.created_at).toLocaleDateString()}</span>
              <span className="space-x-4">
                <button 
                  onClick={() => toggleBookmark(selectedBlog.id)}
                  className="hover:underline"
                >
                  {bookmarkedStories.has(selectedBlog.id) ? '🔖 Bookmarked' : '🔖 Bookmark'}
                </button>
                <button className="hover:underline">🪞 Reflect</button>
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default BlogSection;
