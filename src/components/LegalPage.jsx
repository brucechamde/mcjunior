import { Link } from 'react-router-dom'
import { PiArrowLeft } from 'react-icons/pi'

import Ambient from './Ambient'
import Reveal from './Reveal'

// Shared layout for Privacy and Terms. `sections` is [{ id, heading, body: [string | { list: string[] }] }].
function LegalPage({ title, updated, updatedISO, intro, sections }) {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pb-32">
      <Ambient />

      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Link to="/" className="link-arrow mb-8 !text-muted">
            <PiArrowLeft size={18} aria-hidden="true" />
            Back to home
          </Link>
          <h1 className="text-5xl font-semibold tracking-tighter sm:text-6xl">{title}</h1>
          <p className="mt-4 text-sm text-dim">
            Last updated <time dateTime={updatedISO}>{updated}</time>
          </p>
          <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-muted sm:text-lg">{intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12">
          <nav aria-label={`${title} contents`} className="lg:col-span-3">
            <ol className="flex flex-col gap-1 text-sm lg:sticky lg:top-24">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex gap-3 rounded-lg px-3 py-2 text-muted transition-colors hover:bg-fg/[0.04] hover:text-fg"
                  >
                    <span className="tabular-nums text-dim">{i + 1}.</span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-12 lg:col-span-9">
            {sections.map((section, i) => (
              <section key={section.id} id={section.id} className="max-w-[68ch]">
                <h2 className="text-2xl font-semibold tracking-tight">
                  <span className="mr-3 tabular-nums text-accent">{i + 1}.</span>
                  {section.heading}
                </h2>
                <div className="mt-4 flex flex-col gap-4 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                  {section.body.map((block, j) =>
                    typeof block === 'string' ? (
                      <p key={j}>{block}</p>
                    ) : (
                      <ul key={j} className="flex list-disc flex-col gap-2 pl-5 marker:text-accent">
                        {block.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LegalPage
