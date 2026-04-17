export interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  relationship: string
  content: string
  fullContent: string
  rating: number
  date: string
  featured: boolean
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Soumitra Mukherjee',
    position: 'Head of Software Engineering | Agile Leader | Scrum Master',
    company: 'LinkedIn',
    relationship: 'Former Manager (13+ years)',
    content:
      'Alfred is a standout engineering leader who blends deep technical expertise with a strong sense of responsibility and team-centric leadership. Over the span of more than 13 years, he has grown from a software developer into a trusted full stack team leader known for his ability to deliver high-impact solutions while promoting a culture of collaboration and accountability.',
    fullContent:
      'Alfred is a standout engineering leader who blends deep technical expertise with a strong sense of responsibility and team-centric leadership. Over the span of more than 13 years, he has grown from a software developer into a trusted full stack team leader known for his ability to deliver high-impact solutions while promoting a culture of collaboration and accountability.\n\nHe is notable for his even-keel, thoughtful approach to leadership. He leads from the front-a good listener, tackling complexity with ease, and always coupling technical delivery with strategic goals. Getting cool under pressure, making sound decisions, and galvanizing those around him has seen him become a cornerstone in every project and initiative he\'s involved in.\n\nHis technical capabilities are equally impressive—ranging across React, .NET, Azure, and cutting-edge AI-driven architectures. But perhaps more importantly, he\'s passionate about using technology to create real value and building teams that thrive in fast-paced spaces.\n\nAlfred is a unique blend of commitment, humility, and simplicity. He would make an excellent addition to any organization seeking a result-driven leader with technical depth and emotional maturity to drive high-performing engineering teams.',
    rating: 5,
    date: 'July 27, 2025',
    featured: true,
  },
  {
    id: 2,
    name: 'Stefan Walter',
    position: 'Executive Leader | Digital Transformation & Technology Strategy',
    company: 'Middle East & Global',
    relationship: 'Former Manager (13+ years)',
    content:
      'I had the privilege of working with Alfred for more than 13 years in the same company. He started as a developer in my team, working across the stack, grew into a senior developer and eventually became the team leader, focusing on React and modern SaaS applications.',
    fullContent:
      'I had the privilege of working with Alfred for more than 13 years in the same company. He started as a developer in my team, working across the stack, grew into a senior developer and eventually became the team leader, focusing on React and modern SaaS applications.\n\nAlfred is the kind of leader who stands in front of his team and takes ownership. He cares deeply about the well‑being of his people, listens carefully, and at the same time brings in his own ideas and drives them with strong execution. He leads with respect and is always ready to lend a helping hand to any team member.\n\nI could fully rely on him to lead his team and always trusted that if he needed support or resources, he would come forward. I valued his calmness, his ability to handle stress and workload, and his approachable and collaborative nature. Working with Alfred has always been a pleasure. He is a doer who takes on challenges without hesitation and sees them through.\n\nI can highly recommend Alfred for any leadership role in engineering or similar opportunities. Any organization would benefit from his leadership, his full‑stack expertise and his steady guidance.',
    rating: 5,
    date: 'July 25, 2025',
    featured: true,
  },
  {
    id: 3,
    name: 'Arockiaraj Charles',
    position: 'Technical Lead',
    company: 'Lisec Automation',
    relationship: 'Former Colleague',
    content:
      'I had the pleasure of working with Alfred Paul at Lisec Automation, and I can confidently say He is an exceptional professional. His dedication, problem-solving skills, and positive attitude made a significant impact on our team\'s success.',
    fullContent:
      'I had the pleasure of working with Alfred Paul at Lisec Automation, and I can confidently say He is an exceptional professional. His dedication, problem-solving skills, and positive attitude made a significant impact on our team\'s success. He consistently delivered high-quality work, met tight deadlines, and collaborated seamlessly with colleagues across different functions.\n\nIt was a privilege to work alongside him, and I\'m confident, He will be a valuable asset to any team or organization. I highly recommend Alfred Paul and wish him continued success in all his future endeavors.',
    rating: 5,
    date: 'July 23, 2025',
    featured: false,
  },
  {
    id: 4,
    name: 'Deepak Sharma',
    position: 'Founder and CEO IKA Property | General Manager & Co-Founder ALDESO FZCO',
    company: 'Lisec Automation Middle East',
    relationship: 'Former Teammate (2013-2015)',
    content:
      'I had the pleasure of working closely with Alfred from 2013 to 2015 at Lisec Automation Middle East. From day one, Alfred impressed me with his deep technical knowledge, strong work ethic, and ability to grasp complex concepts with ease.',
    fullContent:
      'I had the pleasure of working closely with Alfred Vikas Paul from 2013 to 2015 at Lisec Automation Middle East, where we were part of the same team. From day one, Alfred impressed me with his deep technical knowledge, strong work ethic, and ability to grasp complex concepts with ease.\n\nEven a decade after I moved on from the company, we\'ve remained in touch, and I\'ve continued to follow his professional journey. It\'s inspiring to see how he\'s grown from a software developer to a team leader, managing multiple responsibilities and leading initiatives within the same organization.\n\nWhat sets Alfred apart is his adaptability — whether it\'s a new programming language or an emerging technology, he learns quickly and applies it effectively. Combine that with his people management skills, and it\'s no surprise that he\'s climbing the corporate ladder with such momentum.\n\nAlfred is a true asset to any team, and I\'m confident that he has a bright future ahead. Highly recommend him for any leadership or technology-driven role.',
    rating: 5,
    date: 'July 23, 2025',
    featured: false,
  },
]
