import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star, X, ExternalLink } from 'lucide-react'

const Testimonials = () => {
  // State for carousel and dialog
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null)

  // Real testimonials from LinkedIn recommendations
  const testimonials = [
    {
      id: 1,
      name: "Soumitra Mukherjee",
      position: "Head of Software Engineering | Agile Leader | Scrum Master",
      company: "LinkedIn",
      relationship: "Former Manager (13+ years)",
      content: "Alfred is a standout engineering leader who blends deep technical expertise with a strong sense of responsibility and team-centric leadership. Over the span of more than 13 years, he has grown from a software developer into a trusted full stack team leader known for his ability to deliver high-impact solutions while promoting a culture of collaboration and accountability.",
      fullContent: "Alfred is a standout engineering leader who blends deep technical expertise with a strong sense of responsibility and team-centric leadership. Over the span of more than 13 years, he has grown from a software developer into a trusted full stack team leader known for his ability to deliver high-impact solutions while promoting a culture of collaboration and accountability.\n\nHe is notable for his even-keel, thoughtful approach to leadership. He leads from the front-a good listener, tackling complexity with ease, and always coupling technical delivery with strategic goals. Getting cool under pressure, making sound decisions, and galvanizing those around him has seen him become a cornerstone in every project and initiative he's involved in.\n\nHis technical capabilities are equally impressive—ranging across React, .NET, Azure, and cutting-edge AI-driven architectures. But perhaps more importantly, he's passionate about using technology to create real value and building teams that thrive in fast-paced spaces.\n\nAlfred is a unique blend of commitment, humility, and simplicity. He would make an excellent addition to any organization seeking a result-driven leader with technical depth and emotional maturity to drive high-performing engineering teams.",
      rating: 5,
      date: "July 27, 2025",
      featured: true
    },
    {
      id: 2,
      name: "Stefan Walter",
      position: "Executive Leader | Digital Transformation & Technology Strategy",
      company: "Middle East & Global",
      relationship: "Former Manager (13+ years)",
      content: "I had the privilege of working with Alfred for more than 13 years in the same company. He started as a developer in my team, working across the stack, grew into a senior developer and eventually became the team leader, focusing on React and modern SaaS applications.",
      fullContent: "I had the privilege of working with Alfred for more than 13 years in the same company. He started as a developer in my team, working across the stack, grew into a senior developer and eventually became the team leader, focusing on React and modern SaaS applications.\n\nAlfred is the kind of leader who stands in front of his team and takes ownership. He cares deeply about the well‑being of his people, listens carefully, and at the same time brings in his own ideas and drives them with strong execution. He leads with respect and is always ready to lend a helping hand to any team member.\n\nI could fully rely on him to lead his team and always trusted that if he needed support or resources, he would come forward. I valued his calmness, his ability to handle stress and workload, and his approachable and collaborative nature. Working with Alfred has always been a pleasure. He is a doer who takes on challenges without hesitation and sees them through.\n\nI can highly recommend Alfred for any leadership role in engineering or similar opportunities. Any organization would benefit from his leadership, his full‑stack expertise and his steady guidance.",
      rating: 5,
      date: "July 25, 2025",
      featured: true
    },
    {
      id: 3,
      name: "Arockiaraj Charles",
      position: "Technical Lead",
      company: "Lisec Automation",
      relationship: "Former Colleague",
      content: "I had the pleasure of working with Alfred Paul at Lisec Automation, and I can confidently say He is an exceptional professional. His dedication, problem-solving skills, and positive attitude made a significant impact on our team's success.",
      fullContent: "I had the pleasure of working with Alfred Paul at Lisec Automation, and I can confidently say He is an exceptional professional. His dedication, problem-solving skills, and positive attitude made a significant impact on our team's success. He consistently delivered high-quality work, met tight deadlines, and collaborated seamlessly with colleagues across different functions.\n\nIt was a privilege to work alongside him, and I'm confident, He will be a valuable asset to any team or organization. I highly recommend Alfred Paul and wish him continued success in all his future endeavors.",
      rating: 5,
      date: "July 23, 2025",
      featured: false
    },
    {
      id: 4,
      name: "Deepak Sharma",
      position: "Founder and CEO IKA Property | General Manager & Co-Founder ALDESO FZCO",
      company: "Lisec Automation Middle East",
      relationship: "Former Teammate (2013-2015)",
      content: "I had the pleasure of working closely with Alfred from 2013 to 2015 at Lisec Automation Middle East. From day one, Alfred impressed me with his deep technical knowledge, strong work ethic, and ability to grasp complex concepts with ease.",
      fullContent: "I had the pleasure of working closely with Alfred Vikas Paul from 2013 to 2015 at Lisec Automation Middle East, where we were part of the same team. From day one, Alfred impressed me with his deep technical knowledge, strong work ethic, and ability to grasp complex concepts with ease.\n\nEven a decade after I moved on from the company, we've remained in touch, and I've continued to follow his professional journey. It's inspiring to see how he's grown from a software developer to a team leader, managing multiple responsibilities and leading initiatives within the same organization.\n\nWhat sets Alfred apart is his adaptability — whether it's a new programming language or an emerging technology, he learns quickly and applies it effectively. Combine that with his people management skills, and it's no surprise that he's climbing the corporate ladder with such momentum.\n\nAlfred is a true asset to any team, and I'm confident that he has a bright future ahead. Highly recommend him for any leadership or technology-driven role.",
      rating: 5,
      date: "July 23, 2025",
      featured: false
    }
  ]

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlay, testimonials.length])

  // Navigation functions
  const paginate = (newDirection: number) => {
    setCurrentIndex((prev) => {
      const newIndex = prev + newDirection
      if (newIndex < 0) return testimonials.length - 1
      if (newIndex >= testimonials.length) return 0
      return newIndex
    })
  }

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-primary fill-primary' : 'text-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    )
  }

  // Testimonial Dialog
  const TestimonialDialog = ({ testimonialId }: { testimonialId: number }) => {
    const testimonial = testimonials.find(t => t.id === testimonialId)
    if (!testimonial) return null

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-background rounded-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl border border-border"
        >
          <div className="p-6 md:p-8 lg:p-10 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-2 border-primary/20 shrink-0">
                  <div className="text-lg font-bold text-primary">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold truncate">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground leading-snug">{testimonial.position}</p>
                  <p className="text-sm font-medium text-primary">{testimonial.company}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {testimonial.relationship} • {testimonial.date}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="p-2 hover:bg-muted rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center">
              <StarRating rating={testimonial.rating} />
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-primary/30" />

              {/* Full Content */}
              <div className="prose prose-invert max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-line text-base md:text-lg">
                  "{testimonial.fullContent}"
                </p>
              </div>
            </div>

            {/* LinkedIn Badge */}
            <div className="p-4 md:p-6 bg-muted/20 rounded-lg">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-medium">LinkedIn Recommendation</span>
                </div>
                <div className="text-xs text-muted-foreground shrink-0">
                  Verified Professional Reference
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/95" />
      
      <div className="container-drake relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="mb-4">
            <span className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground font-medium">
              TESTIMONIALS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            What Colleagues{' '}
            <span className="text-gradient">Say</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real LinkedIn recommendations from industry leaders and colleagues
          </p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div 
            className="relative min-h-[400px] h-auto md:h-96 overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            <AnimatePresence mode="wait" custom={1}>
              <motion.div
                key={currentIndex}
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0"
              >
                <div className="card-drake h-full p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <Quote className="w-full h-full text-primary" />
                  </div>

                  <div className="relative z-10">
                    {/* Quote */}
                    <div className="mb-6 md:mb-8">
                      <Quote className="w-10 h-10 md:w-12 md:h-12 text-primary mb-4 md:mb-6" />
                      <p className="text-base md:text-lg lg:text-xl leading-relaxed text-foreground mb-4 md:mb-6 line-clamp-4 md:line-clamp-none">
                        "{testimonials[currentIndex].content}"
                      </p>
                      <button
                        onClick={() => setSelectedTestimonial(testimonials[currentIndex].id)}
                        className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200 inline-flex items-center gap-1"
                      >
                        Read more...
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-6">
                      {/* Profile Image */}
                      <div className="relative">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-2 border-primary/20">
                          <div className="text-lg md:text-xl font-bold text-primary">
                            {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                      </div>

                      {/* Author Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-lg md:text-xl font-bold truncate">
                              {testimonials[currentIndex].name}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
                              {testimonials[currentIndex].position}
                            </p>
                            <p className="text-sm font-medium text-primary mt-1">
                              {testimonials[currentIndex].relationship}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <StarRating rating={testimonials[currentIndex].rating} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-black transition-colors duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-black transition-colors duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`card-drake p-6 group cursor-pointer transition-all duration-300 ${
                index === currentIndex 
                  ? 'ring-2 ring-primary shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              {/* Mini Quote */}
              <Quote className="w-8 h-8 text-primary/60 mb-4" />
              
              {/* Content */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                "{testimonial.content.substring(0, 100)}..."
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-sm font-bold text-primary">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center justify-between">
                <StarRating rating={testimonial.rating} />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedTestimonial(testimonial.id)
                  }}
                  className="text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  Read full
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20"
        >
          <div className="card-drake p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Work Together?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join these satisfied colleagues and experience exceptional technical leadership and full-stack expertise
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-drake text-lg px-8 py-4 relative group inline-block"
              >
                Start Your Project
                <div className="absolute inset-0 bg-primary rounded-md opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dialog */}
      <AnimatePresence>
        {selectedTestimonial !== null && (
          <TestimonialDialog testimonialId={selectedTestimonial} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Testimonials
