import { PageHeader } from '../components/PageHeader'
import { FounderCard, TeamGrid } from '../components/Team'
import { CtaBand } from '../components/CtaBand'

/** Dedicated team page: founder spotlight, then the full team with bios. */
export function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="OUR TEAM"
        title={<>The people behind the <span className="text-accent">inbox results</span></>}
        intro="A full-service email, SMS & web team in-house — strategy, design, development and automation under one roof."
      />
      <section aria-label="Meet the team" className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl">
            <FounderCard />
          </div>
          <div className="mt-14">
            <TeamGrid detailed />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
