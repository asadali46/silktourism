import React, { useState } from 'react';
import { BlogPost, PageView } from '../../types';
import { Clock, ArrowRight, User, X } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
  onNavigate: (view: PageView) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts, onNavigate }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-[#0F766E] uppercase tracking-widest block mb-2">
              Journals & Dispatches
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              Latest Travel Stories
            </h2>
            <p className="mt-3 text-slate-600 text-sm max-w-xl">
              Insiders' guides to slow travel, hidden wine cellars, private island retreats, and luxury culinary arts.
            </p>
          </div>

          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F766E] hover:bg-[#0d645e] text-white rounded-full font-bold text-xs tracking-wider shadow-md transition-all self-start md:self-auto"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#0F766E] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-400 text-xs font-semibold">
                    <span>{post.publishedAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#0F766E]" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-serif-heading text-lg font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Action */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <span className="text-xs font-bold text-slate-800">{post.author.name}</span>
                </div>

                <span className="text-xs font-bold text-[#0F766E] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-8 animate-slide-up border border-slate-100 max-h-[90vh] flex flex-col">
            
            <div className="relative h-64 overflow-hidden flex-shrink-0">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 text-white hover:bg-black rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="px-3 py-1 bg-[#0F766E] text-white text-[10px] font-bold uppercase rounded-full">
                  {selectedPost.category}
                </span>
                <h2 className="font-serif-heading text-2xl md:text-3xl font-bold">{selectedPost.title}</h2>
              </div>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedPost.author.avatar}
                    alt={selectedPost.author.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900">{selectedPost.author.name}</p>
                    <p className="text-[10px]">{selectedPost.author.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p>{selectedPost.publishedAt}</p>
                  <p className="text-[10px] text-[#0F766E] font-bold">{selectedPost.readTime}</p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-xs md:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
                {selectedPost.content}
              </div>

              <div className="pt-6 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-2.5 bg-[#0F766E] text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Close Article
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
