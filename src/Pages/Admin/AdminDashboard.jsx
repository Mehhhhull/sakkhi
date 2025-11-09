import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../Context/AuthContext';
import { CheckCircle, XCircle, Eye, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [pendingStories, setPendingStories] = useState([]);
  const [approvedStories, setApprovedStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      loadStories();
    }
  }, [isAdmin]);

  const checkAdminStatus = async () => {
    if (!user) {
      setCheckingAdmin(false);
      return;
    }

    // Hardcoded admin emails for extra security
    const ADMIN_EMAILS = [
      'mehulkumarsingh.2004@gmail.com',
      'aarti.g1983@gmail.com'
    ];

    // Check if user email is in admin list OR has admin flag in metadata
    const isUserAdmin = 
      ADMIN_EMAILS.includes(user.email) || 
      user.user_metadata?.is_admin === true;
    
    setIsAdmin(isUserAdmin);
    setCheckingAdmin(false);
  };

  const loadStories = async () => {
    setLoading(true);
    
    // Load pending stories
    const { data: pending } = await supabase
      .from('bharosa_stories')
      .select('*')
      .eq('is_approved', false)
      .order('created_at', { ascending: false });

    // Load approved but unpublished stories
    const { data: approved } = await supabase
      .from('bharosa_stories')
      .select('*')
      .eq('is_approved', true)
      .eq('is_published', false)
      .order('approved_at', { ascending: false });

    setPendingStories(pending || []);
    setApprovedStories(approved || []);
    setLoading(false);
  };

  const approveStory = async (storyId) => {
    const { error } = await supabase
      .from('bharosa_stories')
      .update({ 
        is_approved: true,
        approved_at: new Date().toISOString()
      })
      .eq('id', storyId);

    if (!error) {
      alert('Story approved! Now you can publish it.');
      loadStories();
    } else {
      alert('Error approving story: ' + error.message);
    }
  };

  const publishStory = async (storyId) => {
    const { error } = await supabase
      .from('bharosa_stories')
      .update({ 
        is_published: true,
        published_at: new Date().toISOString()
      })
      .eq('id', storyId)
      .eq('is_approved', true);

    if (!error) {
      alert('Story published successfully!');
      loadStories();
    } else {
      alert('Error publishing story: ' + error.message);
    }
  };

  const quickPublish = async (storyId) => {
    // Approve and publish in one step
    const { error } = await supabase
      .from('bharosa_stories')
      .update({ 
        is_approved: true,
        is_published: true,
        approved_at: new Date().toISOString(),
        published_at: new Date().toISOString()
      })
      .eq('id', storyId);

    if (!error) {
      alert('Story approved and published successfully!');
      loadStories();
    } else {
      alert('Error publishing story: ' + error.message);
    }
  };

  const rejectStory = async (storyId) => {
    if (!confirm('Are you sure you want to delete this story? This cannot be undone.')) {
      return;
    }

    const { error } = await supabase
      .from('bharosa_stories')
      .delete()
      .eq('id', storyId);

    if (!error) {
      alert('Story deleted.');
      loadStories();
      setSelectedStory(null);
    } else {
      alert('Error deleting story: ' + error.message);
    }
  };

  const StoryCard = ({ story, showApprove, showPublish, showQuickPublish }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{story.title}</h3>
          <p className="text-sm text-gray-600">
            by {story.author_name} • {story.city}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {story.category} • {story.language} • {story.emoji}
          </p>
        </div>
        <span className="text-2xl">{story.emoji}</span>
      </div>

      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{story.snippet}</p>

      <div className="text-xs text-gray-500 mb-3">
        Submitted: {new Date(story.created_at).toLocaleDateString()}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedStory(story)}
          className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          <Eye size={14} />
          View Full
        </button>

        {showQuickPublish && (
          <button
            onClick={() => quickPublish(story.id)}
            className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 font-semibold"
          >
            <CheckCircle size={14} />
            Quick Publish
          </button>
        )}

        {showApprove && (
          <button
            onClick={() => approveStory(story.id)}
            className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
          >
            <CheckCircle size={14} />
            Approve Only
          </button>
        )}

        {showPublish && (
          <button
            onClick={() => publishStory(story.id)}
            className="flex items-center gap-1 px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
          >
            <CheckCircle size={14} />
            Publish
          </button>
        )}

        <button
          onClick={() => rejectStory(story.id)}
          className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );

  if (checkingAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 flex items-center justify-center">
        <div className="text-xl text-gray-600">Checking permissions...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 flex items-center justify-center px-4">
        <div className="max-w-md text-center bg-white rounded-lg shadow-lg p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">
            You don't have permission to access the admin dashboard.
          </p>
          <p className="text-sm text-gray-500">
            Only administrators can approve and publish stories.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Review and approve Bharosa Library stories</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Pending Review ({pendingStories.length})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === 'approved'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Approved ({approvedStories.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Loading stories...</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {activeTab === 'pending' && pendingStories.length === 0 && (
              <div className="col-span-2 text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600">No pending stories to review</p>
              </div>
            )}

            {activeTab === 'pending' &&
              pendingStories.map((story) => (
                <StoryCard key={story.id} story={story} showApprove={true} showQuickPublish={true} />
              ))}

            {activeTab === 'approved' && approvedStories.length === 0 && (
              <div className="col-span-2 text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600">No approved stories waiting to be published</p>
              </div>
            )}

            {activeTab === 'approved' &&
              approvedStories.map((story) => (
                <StoryCard key={story.id} story={story} showPublish={true} />
              ))}
          </div>
        )}
      </div>

      {/* Story Preview Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedStory.title}</h2>
                <p className="text-gray-600">
                  by {selectedStory.author_name} • {selectedStory.city}
                </p>
              </div>
              <button
                onClick={() => setSelectedStory(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-4 flex gap-4 text-sm text-gray-600">
              <span>📍 {selectedStory.city}</span>
              <span>🏷️ {selectedStory.category}</span>
              <span>🗣️ {selectedStory.language}</span>
              <span>🕒 {selectedStory.duration}</span>
            </div>

            <div className="prose max-w-none mb-6">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {selectedStory.content}
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Submitted: {new Date(selectedStory.created_at).toLocaleString()}
              </div>
              <div className="flex gap-2">
                {!selectedStory.is_approved && (
                  <button
                    onClick={() => {
                      approveStory(selectedStory.id);
                      setSelectedStory(null);
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                )}
                {selectedStory.is_approved && !selectedStory.is_published && (
                  <button
                    onClick={() => {
                      publishStory(selectedStory.id);
                      setSelectedStory(null);
                    }}
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                  >
                    Publish
                  </button>
                )}
                <button
                  onClick={() => rejectStory(selectedStory.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
