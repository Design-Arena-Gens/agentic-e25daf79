'use client';

import { useState } from 'react';
import { Upload, Scissors, DollarSign, TrendingUp, Users, Award, Play, Check } from 'lucide-react';

interface Clip {
  id: string;
  title: string;
  creator: string;
  earnings: number;
  views: number;
  duration: string;
  thumbnail: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'upload' | 'browse' | 'earnings'>('upload');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const mockClips: Clip[] = [
    { id: '1', title: 'Epic Gaming Moment', creator: 'ProGamer123', earnings: 245.50, views: 12500, duration: '0:45', thumbnail: '🎮' },
    { id: '2', title: 'Funny Reaction Compilation', creator: 'ClipMaster', earnings: 189.20, views: 9800, duration: '1:20', thumbnail: '😂' },
    { id: '3', title: 'Insane Sports Play', creator: 'SportsClips', earnings: 412.80, views: 18200, duration: '0:32', thumbnail: '⚽' },
    { id: '4', title: 'Music Festival Highlight', creator: 'EventCapture', earnings: 156.40, views: 7600, duration: '1:05', thumbnail: '🎵' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsUploading(false);
              setUploadProgress(0);
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      {/* Header */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Scissors className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ClipFlow
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <button className="hover:text-purple-400 transition">Dashboard</button>
              <button className="hover:text-purple-400 transition">Leaderboard</button>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 rounded-full font-semibold hover:from-purple-500 hover:to-blue-500 transition">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Get Paid for Making Clips
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Upload viral-worthy clips, earn money per view, and build your creator portfolio
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span>$0.02 per view</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <Users className="w-4 h-4 text-blue-400" />
              <span>50K+ creators</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span>$2M+ paid out</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Earnings', value: '$1,247.50', icon: DollarSign, color: 'green' },
            { label: 'Total Views', value: '62,400', icon: TrendingUp, color: 'blue' },
            { label: 'Clips Created', value: '48', icon: Scissors, color: 'purple' },
            { label: 'Rank', value: '#127', icon: Award, color: 'yellow' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">{stat.label}</span>
                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {[
            { id: 'upload', label: 'Upload Clip', icon: Upload },
            { id: 'browse', label: 'Browse Clips', icon: Play },
            { id: 'earnings', label: 'Earnings', icon: DollarSign },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          {activeTab === 'upload' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Upload Your Clip</h2>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-purple-400 transition">
                <Upload className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-2">Drop your video file here</h3>
                <p className="text-gray-400 mb-4">or click to browse</p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 rounded-full font-semibold cursor-pointer hover:from-purple-500 hover:to-blue-500 transition"
                >
                  Choose File
                </label>
                <p className="text-sm text-gray-500 mt-4">Supported formats: MP4, MOV, AVI (max 500MB)</p>
              </div>

              {isUploading && (
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-8 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Clip Title</label>
                  <input
                    type="text"
                    placeholder="Give your clip an attention-grabbing title"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    placeholder="Describe what makes this clip special"
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Tags</label>
                  <input
                    type="text"
                    placeholder="gaming, funny, sports, music..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-400 transition"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'browse' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Trending Clips</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {mockClips.map((clip) => (
                  <div
                    key={clip.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                        {clip.thumbnail}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1 truncate">{clip.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">by {clip.creator}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-green-400 font-semibold">${clip.earnings.toFixed(2)}</span>
                          <span className="text-gray-400">{clip.views.toLocaleString()} views</span>
                          <span className="text-gray-400">{clip.duration}</span>
                        </div>
                      </div>
                      <Play className="w-8 h-8 text-purple-400 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Earnings</h2>

              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Available Balance</p>
                    <p className="text-4xl font-bold">$1,247.50</p>
                  </div>
                  <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                    Withdraw
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg mb-4">Recent Transactions</h3>
                {[
                  { clip: 'Epic Gaming Moment', amount: 12.40, views: 620, date: '2 hours ago' },
                  { clip: 'Funny Reaction Compilation', amount: 8.20, views: 410, date: '5 hours ago' },
                  { clip: 'Insane Sports Play', amount: 15.80, views: 790, date: '1 day ago' },
                  { clip: 'Music Festival Highlight', amount: 6.40, views: 320, date: '1 day ago' },
                  { clip: 'Tech Review Snippet', amount: 9.60, views: 480, date: '2 days ago' },
                ].map((transaction, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition"
                  >
                    <div>
                      <p className="font-semibold">{transaction.clip}</p>
                      <p className="text-sm text-gray-400">{transaction.views} views • {transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold">+${transaction.amount.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Upload,
              title: 'Easy Upload',
              description: 'Upload your clips in seconds with our drag-and-drop interface',
            },
            {
              icon: DollarSign,
              title: 'Instant Earnings',
              description: 'Earn $0.02 per view with instant tracking and weekly payouts',
            },
            {
              icon: TrendingUp,
              title: 'Viral Potential',
              description: 'Our algorithm promotes quality clips to maximize your reach',
            },
          ].map((feature, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-4">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-16 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Create Account', desc: 'Sign up for free in 30 seconds' },
              { step: '2', title: 'Upload Clips', desc: 'Share your best moments' },
              { step: '3', title: 'Get Views', desc: 'Clips go viral on our platform' },
              { step: '4', title: 'Earn Money', desc: 'Withdraw your earnings weekly' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Scissors className="w-6 h-6 text-purple-400" />
              <span className="font-bold">ClipFlow</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 ClipFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
