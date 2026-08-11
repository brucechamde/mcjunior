import {
  FaShieldHalved,
  FaBriefcase,
  FaHeadphones,
  FaSitemap,
  FaCompactDisc,
  FaGears,
  FaHeart,
  FaMicrophone,
} from 'react-icons/fa6'

const services = [
  {
    icon: FaShieldHalved,
    title: 'Private Functions',
    desc: 'For years we have helped clients to mark milestone birthdays, graduation parties, weddings, engagements, new year celebrations and more. No matter how small or large your party plans, The MC Junior Project creates events that will see your home, venue or marquee transformed, bringing it to life and ensuring it will be memorable. Our priority is for your event to run smoothly with our staff working to exceed your expectations for service.',
    accent: 'pink',
  },
  {
    icon: FaBriefcase,
    title: 'Corporate Events',
    desc: 'The MC Junior Project has worked with many corporate companies in order to organize and theme their work functions, meetings, end of year celebrations, special open days and more. The MC Junior Project has worked successfully with companies such as Telstra, Salmat, Tele Tech just to name a few. So if you are wanting your corporate party to go off with a bang, The MC Junior Project is just what you need to make it a great success.',
    accent: 'cyan',
  },
  {
    icon: FaHeadphones,
    title: 'Professional MC / DJ',
    desc: 'All events are uniquely different, that’s why we pride our-self on versatility in our ability to cater for any event. Our experienced MCs bring events to life with amazing clarity in projecting a professional tone and relaying the message across. Professional DJ service are what makes the difference for any event as music is the key to a successful party. The MC Junior Project has DJ’s that cover all genres of music and provides a range of professional DJ entertainment packages to cater for any function, event and budget.',
    accent: 'pink',
  },
  {
    icon: FaSitemap,
    title: 'Project Management',
    desc: 'The MC Junior Project incorporates, Marketing, Promotions, Public Relations, Advertising, Social Networking, Multimedia with designated projects. Project are a lengthy process and the professional team at The MC Junior Project work as a team striving to deliver the best result for one off project, annual projects, weekly projects. The MC Junior Project is a company that makes its mark on the entertainment, hospitality industry. The MC Junior Project is always open to  new project ideas, feel free to send us an e-mail.',
    accent: 'cyan',
  },
  {
    icon: FaCompactDisc,
    title: 'Nightclub Promotions',
    desc: 'The MC Junior Project has been involved in the nightclub industry for 13 years and has excelled in weekly club events, to massive one off parties. The MC Junior Project takes a lot of pride in promotions and marketing, working with nightclub owners to brand successful events in the nightclub industry. The MC Junior Project utilises all of its networks and resources to set the benchmark for other competitors.',
    accent: 'pink',
  },
  {
    icon: FaGears,
    title: 'Event Management',
    desc: 'Are you needing an event manager to manage your event from start to finish. The MC Junior Project has a team of managers who are experts in event management. No task is too small or too big, The MC Junior Project compliments the event director, owner, partner in order to get the best result. With 13 years experience in event management, The MC Junior Project delivers results and has gained the respect of other companies in the hospitality industry.',
    accent: 'cyan',
  },
  {
    icon: FaHeart,
    title: 'Weddings',
    desc: 'There are so many options when it comes to organising your wedding day and you want it to be just right. We are here to help you create the wedding you envisaged. The MC Junior Project has a wide choice for your perfect day, supplying the right DJ, MC, wedding event planner to make your special day one you will never forget. Professional MC and DJ packages are worked to your budget. Whatever theme or style of your wedding The MC Junior Project can take your special day to the next level. Ask for a deal and package.',
    accent: 'pink',
  },
  {
    icon: FaMicrophone,
    title: 'Talent Management',
    desc: 'The MC Junior Project was created as a platform for artists and talent to have a chance at performance in the music industry. Director Bruce Edmonds Junior (MC Junior) is wanting to give performers a chance and a break so they can reach their potential and reach for their dreams. If you are a singer, musician, DJ, MC, dancer, model, performer, this is your chance to shine.',
    accent: 'cyan',
  },
]

const accentStyles = {
  pink: {
    ring: 'ring-pink-500/30 group-hover:ring-pink-500/60',
    bg: 'bg-pink-500/10 group-hover:bg-pink-500/20',
    icon: 'text-pink-400',
    title: 'group-hover:text-pink-400',
  },
  cyan: {
    ring: 'ring-cyan-400/30 group-hover:ring-cyan-400/60',
    bg: 'bg-cyan-400/10 group-hover:bg-cyan-400/20',
    icon: 'text-cyan-300',
    title: 'group-hover:text-cyan-300',
  },
}

function Services() {
  return (
    <section id="services" className="bg-[#0B0B10] px-4 py-10 sm:py-14">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-cyan-300 mb-3">
            WHAT WE DO
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Services
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl text-sm sm:text-base">
            Full-service entertainment and event production, from intimate private
            functions to large-scale nightclub takeovers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {services.map(({ icon: Icon, title, desc, accent }) => {
            const styles = accentStyles[accent]
            return (
              <div
                key={title}
                className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:border-white/20 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ring-1 transition-all duration-300 mb-5 ${styles.ring} ${styles.bg}`}
                >
                  <Icon className={`w-5 h-5 ${styles.icon}`} />
                </div>
                <h3 className={`text-lg font-bold text-white mb-2 transition-colors duration-300 ${styles.title}`}>
                  {title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services