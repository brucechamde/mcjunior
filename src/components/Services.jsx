import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  PiBuildings,
  PiCalendarCheck,
  PiChampagne,
  PiConfetti,
  PiDiscoBall,
  PiHeadphones,
  PiKanban,
  PiMicrophoneStage,
} from 'react-icons/pi'

import Reveal from './Reveal'

import imgPrivate from '../assets/images/services/private.jpg'
import imgCorporate from '../assets/images/services/corporate.jpg'
import imgMcDj from '../assets/images/services/mc-dj.jpg'
import imgProject from '../assets/images/services/project.jpg'
import imgNightclub from '../assets/images/services/nightclub.jpg'
import imgEvent from '../assets/images/services/event.jpg'
import imgWeddings from '../assets/images/services/weddings.jpg'
import imgTalent from '../assets/images/services/talent.jpg'

// Free photos from Unsplash (Unsplash License), matched to each service.
const credits = {
  private: { alt: 'Friends raising glasses in a toast at a party', by: 'OurWhisky Foundation' },
  corporate: { alt: 'Audience seated at a corporate conference', by: 'Headway' },
  'mc-dj': { alt: 'DJ hand on a lit controller and turntables', by: 'Marcela Laskoski' },
  project: { alt: 'Hand pinning a plan on a project planning board', by: 'Alvaro Reyes' },
  nightclub: { alt: 'Crowd dancing under red lights in a nightclub', by: 'Pim Myten' },
  event: { alt: 'Crowd with hands up in front of a lit stage', by: 'Long Truong' },
  weddings: { alt: 'Bride dancing at a wedding reception', by: 'Sarah Noltner' },
  talent: { alt: 'Stage microphone under coloured lights', by: 'Matthias Wagner' },
}

const services = [
  {
    id: 'private',
    icon: PiConfetti,
    title: 'Private Functions',
    image: imgPrivate,
    desc: 'For years we have helped clients to mark milestone birthdays, graduation parties, weddings, engagements, new year celebrations and more. No matter how small or large your party plans, The MC Junior Project creates events that will see your home, venue or marquee transformed, bringing it to life and ensuring it will be memorable. Our priority is for your event to run smoothly with our staff working to exceed your expectations for service.',
  },
  {
    id: 'corporate',
    icon: PiBuildings,
    title: 'Corporate Events',
    image: imgCorporate,
    desc: 'The MC Junior Project has worked with many corporate companies in order to organize and theme their work functions, meetings, end of year celebrations, special open days and more. The MC Junior Project has worked successfully with companies such as Telstra, Salmat, Tele Tech just to name a few. So if you are wanting your corporate party to go off with a bang, The MC Junior Project is just what you need to make it a great success.',
  },
  {
    id: 'mc-dj',
    icon: PiHeadphones,
    title: 'Professional MC / DJ',
    image: imgMcDj,
    desc: 'All events are uniquely different, that’s why we pride our-self on versatility in our ability to cater for any event. Our experienced MCs bring events to life with amazing clarity in projecting a professional tone and relaying the message across. Professional DJ service are what makes the difference for any event as music is the key to a successful party. The MC Junior Project has DJ’s that cover all genres of music and provides a range of professional DJ entertainment packages to cater for any function, event and budget.',
  },
  {
    id: 'project',
    icon: PiKanban,
    title: 'Project Management',
    image: imgProject,
    desc: 'The MC Junior Project incorporates, Marketing, Promotions, Public Relations, Advertising, Social Networking, Multimedia with designated projects. Project are a lengthy process and the professional team at The MC Junior Project work as a team striving to deliver the best result for one off project, annual projects, weekly projects. The MC Junior Project is a company that makes its mark on the entertainment, hospitality industry. The MC Junior Project is always open to  new project ideas, feel free to send us an e-mail.',
  },
  {
    id: 'nightclub',
    icon: PiDiscoBall,
    title: 'Nightclub Promotions',
    image: imgNightclub,
    desc: 'The MC Junior Project has been involved in the nightclub industry for 13 years and has excelled in weekly club events, to massive one off parties. The MC Junior Project takes a lot of pride in promotions and marketing, working with nightclub owners to brand successful events in the nightclub industry. The MC Junior Project utilises all of its networks and resources to set the benchmark for other competitors.',
  },
  {
    id: 'event',
    icon: PiCalendarCheck,
    title: 'Event Management',
    image: imgEvent,
    desc: 'Are you needing an event manager to manage your event from start to finish. The MC Junior Project has a team of managers who are experts in event management. No task is too small or too big, The MC Junior Project compliments the event director, owner, partner in order to get the best result. With 13 years experience in event management, The MC Junior Project delivers results and has gained the respect of other companies in the hospitality industry.',
  },
  {
    id: 'weddings',
    icon: PiChampagne,
    title: 'Weddings',
    image: imgWeddings,
    desc: 'There are so many options when it comes to organising your wedding day and you want it to be just right. We are here to help you create the wedding you envisaged. The MC Junior Project has a wide choice for your perfect day, supplying the right DJ, MC, wedding event planner to make your special day one you will never forget. Professional MC and DJ packages are worked to your budget. Whatever theme or style of your wedding The MC Junior Project can take your special day to the next level. Ask for a deal and package.',
  },
  {
    id: 'talent',
    icon: PiMicrophoneStage,
    title: 'Talent Management',
    image: imgTalent,
    desc: 'The MC Junior Project was created as a platform for artists and talent to have a chance at performance in the music industry. Director Bruce Edmonds Junior (MC Junior) is wanting to give performers a chance and a break so they can reach their potential and reach for their dreams. If you are a singer, musician, DJ, MC, dancer, model, performer, this is your chance to shine.',
  },
]

function Services() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef([])
  const active = services[activeIndex]
  const ActiveIcon = active.icon

  const focusTab = (i) => {
    const next = (i + services.length) % services.length
    setActiveIndex(next)
    tabRefs.current[next]?.focus()
  }

  const handleKeyDown = (e) => {
    const map = {
      ArrowDown: activeIndex + 1,
      ArrowRight: activeIndex + 1,
      ArrowUp: activeIndex - 1,
      ArrowLeft: activeIndex - 1,
      Home: 0,
      End: services.length - 1,
    }
    if (e.key in map) {
      e.preventDefault()
      focusTab(map[e.key])
    }
  }

  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tighter sm:text-5xl">Services</h2>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted sm:text-lg">
            Full-service entertainment and event production, from intimate private functions to large-scale
            nightclub takeovers.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          <Reveal delay={100} className="min-w-0 lg:col-span-5">
            <div
              role="tablist"
              aria-label="Services"
              aria-orientation="vertical"
              onKeyDown={handleKeyDown}
              className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {services.map(({ id, icon: Icon, title }, i) => {
                const selected = i === activeIndex
                return (
                  <button
                    key={id}
                    ref={(el) => (tabRefs.current[i] = el)}
                    type="button"
                    role="tab"
                    id={`service-tab-${id}`}
                    aria-selected={selected}
                    aria-controls="service-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveIndex(i)}
                    className={`relative flex shrink-0 snap-start items-center gap-3 rounded-xl px-4 py-3 text-left text-[0.9375rem] font-medium transition-colors duration-200 lg:py-3.5 ${
                      selected ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="service-active"
                        transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                        className="absolute inset-0 rounded-xl bg-fg/[0.06] ring-1 ring-fg/10"
                      />
                    )}
                    <Icon
                      size={22}
                      aria-hidden="true"
                      className={`relative transition-colors duration-200 ${selected ? 'text-accent' : ''}`}
                    />
                    <span className="relative whitespace-nowrap">{title}</span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={200} className="min-w-0 lg:col-span-7 lg:sticky lg:top-24 lg:self-start">
            <div
              role="tabpanel"
              id="service-panel"
              aria-labelledby={`service-tab-${active.id}`}
              className="min-h-[32rem]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="overflow-hidden rounded-[var(--radius-panel)] ring-1 ring-fg/10">
                    <img
                      src={active.image}
                      alt={credits[active.id].alt}
                      width={1400}
                      height={875}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover"
                    />
                  </div>
                  <p className="mt-2 text-xs text-dim">Photo: {credits[active.id].by} / Unsplash</p>
                  <div className="mt-7 flex items-center gap-3">
                    <ActiveIcon size={26} aria-hidden="true" className="text-accent" />
                    <h3 className="text-2xl font-semibold tracking-tight">{active.title}</h3>
                  </div>
                  <p className="mt-4 max-w-[65ch] text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                    {active.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Services
