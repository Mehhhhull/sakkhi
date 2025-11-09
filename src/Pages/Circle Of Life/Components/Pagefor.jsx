import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../Context/AuthContext";

// Hardcoded anonymous experience selector, here only 2 can select and this is minimum you can select
const experiences = [
  { label: "Vaginal birth", emoji: "🌸" },
  { label: "C-Section", emoji: "💪" },
  { label: "NICU Baby", emoji: "👶" },
  { label: "First-time mom", emoji: "🌱" },
  { label: "Postpartum depression", emoji: "🌧️" },
  { label: "Breastfeeding struggles", emoji: "😊" },
  { label: "Stillbirth / miscarriage", emoji: "🕊️" },
];

const Pagefor = () => {
  const { user } = useAuth();
  const [selected, setSelected] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [userCircleId, setUserCircleId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkExistingCircle();
  }, [user]);

  const checkExistingCircle = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('user_circles')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single();

    if (data) {
      setSelected(data.experiences);
      setUserCircleId(data.id);
      setChatStarted(true);
    }
    setLoading(false);
  };

  const toggleSelect = (label) => {
    if (selected.includes(label)) {
      setSelected(selected.filter((item) => item !== label));
    } else if (selected.length < 2) {
      setSelected([...selected, label]);
    }
  };

  const createCircle = async () => {
    if (selected.length === 0) return;

    const { data, error } = await supabase
      .from('user_circles')
      .insert([
        {
          user_id: user.id,
          experiences: selected,
          is_active: true,
        },
      ])
      .select()
      .single();

    if (data) {
      setUserCircleId(data.id);
      setChatStarted(true);
    } else {
      console.error('Error creating circle:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-b from-[#2d0045] to-[#5b217a]">
        <div className="text-white text-xl">Loading your circle...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-b from-[#2d0045] to-[#5b217a] px-4 py-6">
      {!chatStarted ? (
        <div className="w-full max-w-md bg-[#1d102b] rounded-2xl p-6 shadow-xl">
          <h1 className="text-white text-2xl font-semibold text-center mb-2">
            Find Your Circle
          </h1>
          <p className="text-pink-200 text-center text-sm mb-6">
            Select up to 2 experiences that resonate with your journey. You'll be
            matched with moms who understand.
          </p>

          <div className="space-y-3">
            {experiences.map((exp) => (
              <button
                key={exp.label}
                onClick={() => toggleSelect(exp.label)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all font-medium text-white text-left ${
                  selected.includes(exp.label)
                    ? "bg-pink-600"
                    : "bg-[#3e2753] hover:bg-[#503368]"
                }`}
              >
                <span className="text-lg mr-3">{exp.emoji}</span>
                {exp.label}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-pink-300 mt-4 mb-2">
            {selected.length}/2 selected
          </p>

          <button
            disabled={selected.length === 0}
            onClick={createCircle}
            className={`w-full py-3 rounded-full text-white font-semibold transition-all ${
              selected.length > 0
                ? "bg-gradient-to-r from-pink-400 to-pink-600 hover:scale-105"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            Create My Safe Circle
          </button>

          <p className="text-center text-[10px] text-pink-300 mt-3 italic">
            you're safe here
          </p>
        </div>
      ) : (
        <ChatRoom circleId={userCircleId} experiences={selected} />
      )}
    </div>
  );
};

// ChatRoom component, text editeddddd
const ChatRoom = ({ circleId, experiences }) => {
  const { user, petName } = useAuth();
  const [messages, setMessages] = useState([
    {
      name: "Barsha",
      time: "08:21 PM",
      text: "I'm so glad we found each other. Today was harder than I expected.",
      isDummy: true,
    },
    {
      name: "Anonymous",
      time: "08:22 PM",
      text: "Aap akele nahi ho, we also felt the same jab ham ma bane the, aap mujhse share karskti hain",
      isDummy: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pausedUsers, setPausedUsers] = useState([]);

  useEffect(() => {
    loadMessages();
    checkPausedStatus();
    const unsubscribe = subscribeToMessages();
    const unsubscribePause = subscribeToPauseStatus();
    return () => {
      if (unsubscribe) unsubscribe();
      if (unsubscribePause) unsubscribePause();
    };
  }, [circleId]);

  const checkPausedStatus = async () => {
    if (!circleId) return;

    try {
      const { data: matchingCircles } = await supabase
        .from('user_circles')
        .select('id, is_paused, user_id')
        .contains('experiences', experiences)
        .eq('is_active', true)
        .eq('is_paused', true)
        .neq('user_id', user.id);

      if (matchingCircles && matchingCircles.length > 0) {
        const userIds = matchingCircles.map(c => c.user_id);
        const pausedNames = [];
        
        for (const userId of userIds) {
          const { data: userData } = await supabase.auth.admin.getUserById(userId);
          if (userData?.user) {
            pausedNames.push(userData.user.user_metadata?.pet_name || 'Anonymous');
          }
        }
        setPausedUsers(pausedNames);
      }
    } catch (error) {
      console.error('Error checking pause status:', error);
    }
  };

  const subscribeToPauseStatus = () => {
    const channel = supabase
      .channel('pause_status_channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_circles',
        },
        async (payload) => {
          if (payload.new.user_id !== user.id) {
            await checkPausedStatus();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const loadMessages = async () => {
    if (!circleId) return;

    try {
      // Get all circles with matching experiences
      const { data: matchingCircles } = await supabase
        .from('user_circles')
        .select('id')
        .contains('experiences', experiences)
        .eq('is_active', true);

      if (!matchingCircles || matchingCircles.length === 0) {
        setLoading(false);
        return;
      }

      const circleIds = matchingCircles.map(c => c.id);

      // Get messages from all matching circles
      const { data: messagesData } = await supabase
        .from('circle_messages')
        .select('*, user_id')
        .in('circle_id', circleIds)
        .order('created_at', { ascending: true });

      if (messagesData && messagesData.length > 0) {
        // Get unique user IDs
        const userIds = [...new Set(messagesData.map(m => m.user_id))];
        
        // Fetch user metadata for all users
        const userMetadata = {};
        for (const userId of userIds) {
          const { data } = await supabase.auth.admin.getUserById(userId);
          if (data?.user) {
            userMetadata[userId] = data.user.user_metadata?.pet_name || 'Anonymous';
          }
        }

        const formattedMessages = messagesData.map(msg => ({
          id: msg.id,
          name: userMetadata[msg.user_id] || 'Anonymous',
          time: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: msg.message,
          userId: msg.user_id,
          isDummy: false,
        }));

        // Combine dummy messages with real ones
        setMessages(prev => [...prev.filter(m => m.isDummy), ...formattedMessages]);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
    setLoading(false);
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('circle_messages_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'circle_messages',
        },
        async (payload) => {
          try {
            const { data: userData } = await supabase.auth.admin.getUserById(payload.new.user_id);
            
            const newMessage = {
              id: payload.new.id,
              name: userData?.user?.user_metadata?.pet_name || 'Anonymous',
              time: new Date(payload.new.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              text: payload.new.message,
              userId: payload.new.user_id,
              isDummy: false,
            };

            setMessages(prev => [...prev, newMessage]);
          } catch (error) {
            console.error('Error processing new message:', error);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handlePause = async () => {
    setPaused(true);
    
    // Update database to mark as paused
    const { error } = await supabase
      .from('user_circles')
      .update({ 
        is_paused: true,
        paused_at: new Date().toISOString()
      })
      .eq('id', circleId);

    if (error) {
      console.error('Error pausing chat:', error);
    }
  };

  const handleUnpause = async () => {
    setPaused(false);
    
    // Update database to mark as unpaused
    const { error } = await supabase
      .from('user_circles')
      .update({ 
        is_paused: false,
        paused_at: null
      })
      .eq('id', circleId);

    if (error) {
      console.error('Error unpausing chat:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !circleId) return;

    const messageText = input.trim();
    setInput("");

    // Optimistically add message to UI
    const tempMessage = {
      id: Date.now(),
      name: petName || 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: messageText,
      userId: user.id,
      isDummy: false,
    };
    setMessages(prev => [...prev, tempMessage]);

    // Insert message into database
    const { error } = await supabase
      .from('circle_messages')
      .insert([
        {
          user_id: user.id,
          circle_id: circleId,
          message: messageText,
        },
      ]);

    if (error) {
      console.error('Error sending message:', error);
      // Remove temp message on error
      setMessages(prev => prev.filter(m => m.id !== tempMessage.id));
      setInput(messageText); // Restore input on error
    }
  };

  return (
    <div className="w-full max-w-2xl bg-[#1d102b] rounded-2xl p-4 shadow-xl h-[90vh] flex flex-col relative">
      {/* Top bar in the chat */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="text-white font-semibold text-lg">
            Circle of One — <span className="font-normal">Your Safe Space</span>
          </h2>
          <p className="text-pink-200 text-sm">
            You're now in a quiet circle of moms who walked a similar road. No names. Just hearts holding hearts.
          </p>
        </div>

        <button
          onClick={handlePause}
          className="text-sm bg-[#3e2753] hover:bg-pink-600 transition-all text-white px-4 py-2 rounded-xl"
        >
          Pause Chat
        </button>
      </div>

      {/* Pinned question at the topp*/}
      <div className="bg-[#3e2753] text-pink-100 text-sm px-4 py-3 rounded-xl mb-4 italic">
        🌸 Aaj sabse jyada kya bother kiya tumhe?
      </div>

      {/* Show paused users notification */}
      {pausedUsers.length > 0 && (
        <div className="bg-yellow-900/30 border border-yellow-600/50 text-yellow-200 text-sm px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
          <span>⏸️</span>
          <span>
            {pausedUsers.join(', ')} {pausedUsers.length === 1 ? 'has' : 'have'} paused the chat
          </span>
        </div>
      )}

      {/* Messages olderrr are here, and also idhar m emoticons h jo tum laga skte doent work rn */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {loading && messages.filter(m => !m.isDummy).length === 0 && (
          <div className="text-center text-pink-300 text-sm">Loading messages...</div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={msg.id || idx}
            className="bg-[#2a1840] rounded-xl p-4 text-white shadow-md"
          >
            <div className="text-sm text-pink-300 font-semibold mb-1">
              {msg.name} · <span className="text-xs">{msg.time}</span>
            </div>
            <div className="text-sm">{msg.text}</div>
            <div className="flex space-x-3 mt-3 text-lg">
              <span>🌱</span>
              <span>💛</span>
              <span>☁️</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input box , yaha dalskte ho qs*/}
      <div className="mt-4 flex items-center bg-[#3e2753] rounded-full px-4 py-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Aapne dil ki baat batao..."
          className="flex-1 bg-transparent text-white placeholder-pink-300 text-sm focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-1 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600"
        >
          Send
        </button>
      </div>

      <p className="text-[10px] text-pink-300 text-right mt-2 pr-2">Your presence matters</p>

      {/* Pause Modal, here pause ho skta, back b hosktaaaa */}
      {paused && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#2a1a3a] text-center rounded-2xl p-8 w-80 shadow-xl">
            <div className="flex justify-center mb-4">
              <div className="bg-pink-400 text-white rounded-full p-3">
                <span className="text-xl">❤️</span>
              </div>
            </div>
            <h2 className="text-white text-xl font-semibold mb-2">Take your breath</h2>
            <p className="text-pink-200 text-sm mb-6">
              We're still here when you return.
            </p>
            <button
              onClick={handleUnpause}
              className="bg-gradient-to-r from-pink-400 to-pink-600 text-white font-medium px-6 py-2 rounded-full hover:scale-105 transition-all"
            >
              Return to Circle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagefor;
