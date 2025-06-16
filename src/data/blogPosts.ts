import { BlogPost } from "@/components/blog/BlogCard";

// Blog posts data - this could later be moved to a CMS or API
export const blogPosts: BlogPost[] = [
  {
    id: 'what-is-ice-tracer',
    title: 'What is ICE Tracer?',
    excerpt: 'Store lifesaving medical and emergency contact information accessible anywhere, 24/7.',
    date: 'June 30th, 2017',
    image: '/images/What_is_ICE_Blog.png',
    imageAlt: 'Emergency sign highlighting the importance of medical information accessibility',
    category: 'In The News',
    readTime: '2 min read',
    author: 'Daphyne Lovejoy'
  },
  {
    id: 'top-13-reasons-ems-calls',
    title: 'Discover the Top 13 Reasons for EMS Calls',
    excerpt: 'Learn the most common emergency situations and how to prepare for them.',
    date: 'June 30th, 2017',
    image: '/images/Man_Defibrilator.png',
    imageAlt: 'Man lying on the floor with EMS providing CPR with a defibrillator',
    category: 'Emergency Response',
    readTime: '5 min read',
    author: 'Daphyne Lovejoy'
  },
  {
    id: 'heimlich-maneuver-cpr-guide',
    title: 'How to Perform the Heimlich Maneuver & CPR',
    excerpt: 'Essential life-saving techniques with step-by-step instructions for emergencies.',
    date: 'June 30th, 2017',
    image: '/images/heimlich-maneuver.png',
    imageAlt: 'A person in a grey shirt is leaning over a person in a teal shirt who is laying on the ground, and is performing chest compressions as part of CPR',
    category: 'Health Education',
    readTime: '5 min read',
    author: 'Daphyne Lovejoy'
  }
];

// Helper function to get recent posts for homepage
export const getRecentPosts = (limit: number = 3) => {
  return blogPosts.slice(0, limit);
};

// Helper function to get featured post
export const getFeaturedPost = () => {
  return blogPosts[0];
}; 