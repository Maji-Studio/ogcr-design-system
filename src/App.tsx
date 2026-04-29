import { useState } from 'react'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { Card } from './components/Card'
import { Pill } from './components/Pill'
import { ProgressBar } from './components/ProgressBar'
import { Checkbox, type CheckboxValue } from './components/Checkbox'
import { Radio } from './components/Radio'
import { Navigation, type NavItem } from './components/Navigation'
import { Kpi } from './components/Kpi'
import { ContextMenu } from './components/ContextMenu'
import { Sidesheet } from './components/Sidesheet'
import { Message } from './components/Message'
import { Logo } from './components/Logo'
import {
  Form,
  FormFieldset,
  FormFooter,
  FormRow,
  FormSection,
} from './components/Form'
import { DataTable } from './components/Table'
import type { ColumnDef } from '@tanstack/react-table'
import {
  ArrowRightIcon,
  BellIcon,
  ChartBarIcon,
  DotsThreeIcon,
  FlaskIcon,
  FolderIcon,
  MailIcon,
  SearchIcon,
  SquaresFourIcon,
  UserIcon,
} from './components/icons'
import './App.css'

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: <SquaresFourIcon /> },
  { id: 'sampling', label: 'Sampling', icon: <FlaskIcon /> },
  { id: 'insights', label: 'Insights', icon: <ChartBarIcon /> },
  { id: 'projects', label: 'Projects', icon: <FolderIcon /> },
  { id: 'profile', label: 'Profile', icon: <UserIcon /> },
]

type Issuance = {
  project: string
  methodology: string
  plots: number
  credits: number
  status: 'verified' | 'review' | 'flagged'
  updated: string
}

const ISSUANCES: Issuance[] = [
  { project: 'Iberian rewilding', methodology: 'v3.2', plots: 12, credits: 42180, status: 'review', updated: '2026-04-22' },
  { project: 'Atlantic kelp restoration', methodology: 'v2.8', plots: 8, credits: 18420, status: 'verified', updated: '2026-04-19' },
  { project: 'Selva del Mar peatland', methodology: 'v3.1', plots: 24, credits: 96300, status: 'verified', updated: '2026-04-15' },
  { project: 'Mara grasslands soil', methodology: 'v3.0', plots: 16, credits: 31870, status: 'flagged', updated: '2026-04-12' },
  { project: 'Hokkaido seagrass', methodology: 'v2.8', plots: 6, credits: 7240, status: 'review', updated: '2026-04-09' },
  { project: 'Patagonia native forest', methodology: 'v3.2', plots: 18, credits: 58210, status: 'verified', updated: '2026-04-04' },
]

const STATUS_TONE: Record<Issuance['status'], 'positive' | 'warning' | 'negative'> = {
  verified: 'positive',
  review: 'warning',
  flagged: 'negative',
}

const STATUS_LABEL: Record<Issuance['status'], string> = {
  verified: 'Verified',
  review: 'In review',
  flagged: 'Flagged',
}

const issuanceColumns: ColumnDef<Issuance>[] = [
  { accessorKey: 'project', header: 'Project' },
  { accessorKey: 'methodology', header: 'Methodology' },
  {
    accessorKey: 'plots',
    header: 'Plots',
    meta: { numeric: true },
  },
  {
    accessorKey: 'credits',
    header: 'Credits (t CO₂e)',
    meta: { numeric: true },
    cell: (info) => info.getValue<number>().toLocaleString('en-US'),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableSorting: false,
    cell: (info) => {
      const v = info.getValue<Issuance['status']>()
      return <Pill tone={STATUS_TONE[v]}>{STATUS_LABEL[v]}</Pill>
    },
  },
  {
    accessorKey: 'updated',
    header: 'Updated',
    cell: (info) =>
      new Date(info.getValue<string>()).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
  },
]

type SectionMeta = {
  id: string
  num: string
  kicker: string
  title: string
  lede: string
  figmaNode: string
  spec?: { dt: string; dd: string }[]
  tag?: string
}

const SECTIONS: SectionMeta[] = [
  {
    id: 'navigation',
    num: '01',
    kicker: 'Module',
    title: 'Navigation',
    lede: 'Primary surface for moving between Operator-platform sections. Desktop is a top-bar with brand + product label; mobile is a bottom-bar with stacked icon-on-pill labels.',
    figmaNode: '6140:3865 · 6072:2172',
    spec: [
      { dt: 'Active fill', dd: 'interaction-primary-focus' },
      { dt: 'Label style', dd: 'label-button (Inter 500)' },
      { dt: 'Breakpoints', dd: 'desktop · mobile' },
    ],
  },
  {
    id: 'kpi',
    num: '02',
    kicker: 'Module',
    title: 'KPI',
    lede: 'A single metric with optional secondary context. The 6-pixel top accent communicates state at a glance.',
    figmaNode: '6063:1279',
    spec: [
      { dt: 'Surface', dd: 'surface-light, border-medium' },
      { dt: 'Accent', dd: 'icon-* token per status' },
      { dt: 'Value type', dd: 'heading-3 / 20–24px' },
    ],
  },
  {
    id: 'buttons',
    num: '03',
    kicker: 'Component',
    title: 'Buttons',
    lede: 'Three styles, one motion vocabulary. Filled is the brand-default; outlined and text descend in emphasis.',
    figmaNode: '1:37',
    spec: [
      { dt: 'Variants', dd: 'filled · outlined · text' },
      { dt: 'Default size', dd: '48px / radius-l' },
      { dt: 'Focus ring', dd: 'interaction-primary-focus' },
    ],
  },
  {
    id: 'inputs',
    num: '04',
    kicker: 'Component',
    title: 'Input fields',
    lede: 'Label, optional leading/trailing icon, helper text, and an error state with a red focus halo.',
    figmaNode: '4011:1499',
    spec: [
      { dt: 'States', dd: 'default · hover · focus · error' },
      { dt: 'Padding', dd: 'm · 16px' },
      { dt: 'Helper', dd: 'body-s / 14–16px' },
    ],
  },
  {
    id: 'cards',
    num: '05',
    kicker: 'Module',
    title: 'Cards',
    lede: 'Title + subtitle, optional trailing slot, and a body that accepts arbitrary children. Floating adds elevation-l.',
    figmaNode: '6064:722 · 6145:11695',
    spec: [
      { dt: 'Padding', dd: 'm · 16px' },
      { dt: 'Radius', dd: 'xl · 16px' },
      { dt: 'Variants', dd: 'floating yes · no' },
    ],
  },
  {
    id: 'context-menu',
    num: '06',
    kicker: 'Module',
    title: 'Context menu',
    lede: 'A 320-px floating panel for object-scoped actions. Items support icon, disabled, and destructive emphasis.',
    figmaNode: '6063:1658',
    spec: [
      { dt: 'Surface', dd: 'surface-page · elevation-l' },
      { dt: 'Width', dd: '320px' },
      { dt: 'Item radius', dd: 'm · 8px' },
    ],
  },
  {
    id: 'sidesheet',
    num: '07',
    kicker: 'Module',
    title: 'Sidesheet',
    lede: 'A 480-px panel that slides in from a viewport edge. Navigation row, header with status pill, scrolling body, and a sticky action footer.',
    figmaNode: '6103:2880',
    spec: [
      { dt: 'Width', dd: '480px' },
      { dt: 'Surface', dd: 'surface-light · elevation-l' },
      { dt: 'Footer', dd: 'primary + secondary action' },
    ],
  },
  {
    id: 'messages',
    num: '08',
    kicker: 'Module',
    title: 'Messages',
    lede: 'Inline or floating, in four semantic states. Each state shifts background, border, icon, and text together to keep the read fluid.',
    figmaNode: '6052:1186',
    spec: [
      { dt: 'States', dd: 'neutral · success · warning · error' },
      { dt: 'Types', dd: 'inline · floating' },
      { dt: 'Roles', dd: 'status · alert' },
    ],
  },
  {
    id: 'progress',
    num: '09',
    kicker: 'Component',
    title: 'Progress bars',
    lede: 'A thin 8-pixel rail with optional label and percentage. Tone tracks the underlying KPI status.',
    figmaNode: '6025:562',
    spec: [
      { dt: 'Height', dd: '8px' },
      { dt: 'Tones', dd: 'default · blue · orange · neutral' },
      { dt: 'Motion', dd: 'width transitions on update' },
    ],
  },
  {
    id: 'checkbox',
    num: '10',
    kicker: 'Component',
    title: 'Checkbox',
    lede: 'Inline option, plus border-left and border-right card layouts for selection grids.',
    figmaNode: '6029:687',
    spec: [
      { dt: 'States', dd: 'default · focus · error · disabled' },
      { dt: 'Checked', dd: 'true · false · indeterminate' },
      { dt: 'Layouts', dd: 'inline · border-left · border-right' },
    ],
    tag: 'wip',
  },
  {
    id: 'radio',
    num: '11',
    kicker: 'Component',
    title: 'Radio button',
    lede: 'Mirrors the Checkbox layouts and states with a circular indicator that scales in on selection.',
    figmaNode: '6059:1143',
    spec: [
      { dt: 'States', dd: 'default · focus · error · disabled' },
      { dt: 'Layouts', dd: 'inline · border-left · border-right' },
      { dt: 'Group via', dd: 'native name attribute' },
    ],
  },
  {
    id: 'form',
    num: '12',
    kicker: 'Module',
    title: 'Form',
    lede: 'A composition layer over Inputs, Checkbox, Radio, and Button. Sections carry a Roman-numeral step, a title, and a description; the body holds fields and an action footer.',
    figmaNode: '—',
    spec: [
      { dt: 'Layout', dd: '132px head · 1fr body' },
      { dt: 'Validation', dd: 'errorText prop per field' },
      { dt: 'Library', dd: 'agnostic · works with RHF Controller' },
    ],
  },
  {
    id: 'table',
    num: '13',
    kicker: 'Module',
    title: 'Data table',
    lede: 'Sortable ledger built on @tanstack/react-table. Mono-caps headers, dashed row rules, tabular numerics, and Pill-rendered status cells.',
    figmaNode: '—',
    spec: [
      { dt: 'Engine', dd: '@tanstack/react-table v8' },
      { dt: 'Sorting', dd: 'click header · aria-sort' },
      { dt: 'Cell meta', dd: 'numeric · align' },
    ],
  },
]

function SectionHead({ meta }: { meta: SectionMeta }) {
  return (
    <>
      <div className="section__head">
        <div className="section__num">§{meta.num}</div>
        <div className="section__titles">
          <span className="section__kicker">{meta.kicker}</span>
          <h2 className="section__heading">
            {meta.title}
            {meta.tag && <span className="section__tag">{meta.tag}</span>}
          </h2>
          <p className="section__lede">{meta.lede}</p>
        </div>
      </div>
      {meta.spec && (
        <div className="section__spec">
          <div />
          <dl>
            <div>
              <dt>Figma node</dt>
              <dd>{meta.figmaNode}</dd>
            </div>
            {meta.spec.map((row) => (
              <div key={row.dt}>
                <dt>{row.dt}</dt>
                <dd>{row.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </>
  )
}

function App() {
  const [email, setEmail] = useState('')
  const [search, setSearch] = useState('Iberian rewilding')
  const [bad, setBad] = useState('not-an-email')
  const [terms, setTerms] = useState<CheckboxValue>(false)
  const [marketing, setMarketing] = useState<CheckboxValue>('indeterminate')
  const [card1, setCard1] = useState<CheckboxValue>(true)
  const [plan, setPlan] = useState('annual')
  const [activeNav, setActiveNav] = useState('overview')
  const [activeMobileNav, setActiveMobileNav] = useState('sampling')
  const [formProjectName, setFormProjectName] = useState('Iberian rewilding pilot')
  const [formProjectCode, setFormProjectCode] = useState('iber-001')
  const [formMethodology, setFormMethodology] = useState('Methodology v3.2')
  const [formPlots, setFormPlots] = useState('12')
  const [formSampleDate, setFormSampleDate] = useState('2026-04-22')
  const [formVerification, setFormVerification] = useState('full')
  const [formTerms, setFormTerms] = useState<CheckboxValue>(false)
  const projectCodeError = !/^OGCR-/.test(formProjectCode)

  return (
    <main className="page">
      <header className="page__hero reveal">
        <div className="page__hero-top">
          <Logo width={129} className="page__hero-logo" />
          <span className="page__kicker">Design System · v0.1 · 2026</span>
        </div>
        <h1 className="page__title">
          Component <span className="page__title-accent">specimen</span>
        </h1>
        <p className="page__subtitle">
          A working catalogue of every primitive and module shipped by the OGCR
          design system. Each entry reflects the live Figma source, with the
          tokens, dimensions, and node IDs needed to keep code and design in lock-step.
        </p>
        <dl className="page__meta">
          <div>
            <dt>Typeface</dt>
            <dd>Inter — Rasmus Andersson</dd>
          </div>
          <div>
            <dt>Mono</dt>
            <dd>JetBrains Mono</dd>
          </div>
          <div>
            <dt>Surface</dt>
            <dd>#f8f3ef · paper</dd>
          </div>
          <div>
            <dt>Accent</dt>
            <dd>#4f8263 · forest</dd>
          </div>
        </dl>
      </header>

      <div className="layout">
        <div className="specimens">
          <section id="navigation" className="section reveal">
            <SectionHead meta={SECTIONS[0]} />
            <div className="section__body">
              <div className="nav-stack">
                <div className="nav-chrome">
                  <Navigation
                    items={NAV_ITEMS}
                    activeId={activeNav}
                    onSelect={setActiveNav}
                    product="Operator platform"
                    trailing={
                      <button type="button" className="nav-bell" aria-label="Notifications">
                        <BellIcon />
                      </button>
                    }
                  />
                  <div className="nav-chrome__viewport">
                    <div className="nav-chrome__viewport-content">
                      the {activeNav} workspace lives here.
                    </div>
                  </div>
                </div>
                <div className="nav-mobile-frame">
                  <Navigation
                    layout="mobile"
                    items={NAV_ITEMS}
                    activeId={activeMobileNav}
                    onSelect={setActiveMobileNav}
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="kpi" className="section reveal">
            <SectionHead meta={SECTIONS[1]} />
            <div className="section__body">
              <div className="specimen-stack specimen-stack--narrow">
                <Kpi
                  label="Total credits issued"
                  value="694,820 t"
                  secondaryText="Year to date"
                  status={{ label: 'On track', tone: 'positive' }}
                  tone="positive"
                />
                <Kpi
                  label="Pending validations"
                  value="14"
                  secondaryText="3 due this week"
                  status={{ label: 'Attention', tone: 'warning' }}
                  tone="warning"
                />
                <Kpi
                  label="Failed audits"
                  value="2"
                  secondaryText="Reopened by reviewer"
                  status={{ label: 'Action needed', tone: 'negative' }}
                  tone="negative"
                />
                <Kpi
                  label="Active projects"
                  value="38"
                  secondaryText="Across 12 jurisdictions"
                  tone="neutral"
                />
              </div>
            </div>
          </section>

          <section id="buttons" className="section reveal">
            <SectionHead meta={SECTIONS[2]} />
            <div className="section__body">
              <div className="button-row">
                <Button variant="filled">Primary action</Button>
                <Button variant="filled" iconRight={<ArrowRightIcon />}>Continue</Button>
                <Button variant="outlined">Secondary</Button>
                <Button variant="outlined" iconLeft={<SearchIcon />}>Search</Button>
                <Button variant="text">Tertiary</Button>
                <Button variant="filled" disabled>Disabled</Button>
              </div>
            </div>
          </section>

          <section id="inputs" className="section reveal">
            <SectionHead meta={SECTIONS[3]} />
            <div className="section__body">
              <div className="specimen-stack specimen-stack--narrow">
                <Input
                  label="Email address"
                  placeholder="you@example.com"
                  iconLeft={<MailIcon />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  helperText="We'll never share your email."
                />
                <Input
                  label="Search"
                  placeholder="Search projects"
                  iconLeft={<SearchIcon />}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Input
                  label="Email address"
                  value={bad}
                  onChange={(e) => setBad(e.target.value)}
                  error
                  helperText="Enter a valid email address."
                />
              </div>
            </div>
          </section>

          <section id="cards" className="section reveal">
            <SectionHead meta={SECTIONS[4]} />
            <div className="section__body">
              <div className="specimen-stack">
                <Card
                  title="Carbon credits issued"
                  subtitle="Quarterly summary"
                  trailing={<Pill tone="positive">+ 12.4%</Pill>}
                >
                  <div className="kv-list">
                    <div className="kv-row">
                      <span className="kv-row__key">This quarter</span>
                      <span className="kv-row__value">182,540 t CO₂e</span>
                    </div>
                    <div className="kv-row">
                      <span className="kv-row__key">Last quarter</span>
                      <span className="kv-row__value">162,310 t CO₂e</span>
                    </div>
                    <div className="kv-row">
                      <span className="kv-row__key">YTD</span>
                      <span className="kv-row__value">694,820 t CO₂e</span>
                    </div>
                  </div>
                </Card>
                <Card title="Sign in" subtitle="Use your work account" floating>
                  <div className="form-stack">
                    <Input label="Email address" placeholder="you@example.com" iconLeft={<MailIcon />} />
                    <Input label="Password" type="password" placeholder="••••••••" />
                    <div className="form-actions">
                      <Button variant="text">Forgot password?</Button>
                      <Button variant="filled">Sign in</Button>
                    </div>
                  </div>
                </Card>
                <Card
                  title="Project status"
                  subtitle="Mossy Earth – Iberian rewilding"
                  trailing={<Pill tone="warning">Pending review</Pill>}
                >
                  <p className="text-body-s card__paragraph">
                    Methodology validation in progress. Estimated decision in 8 days.
                  </p>
                  <div className="form-actions">
                    <Button variant="outlined">View details</Button>
                    <Button variant="filled" iconRight={<ArrowRightIcon />}>Open project</Button>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          <section id="context-menu" className="section reveal">
            <SectionHead meta={SECTIONS[5]} />
            <div className="section__body">
              <div className="specimen-stack">
                <ContextMenu
                  header="Project actions"
                  status="3 selected"
                  items={[
                    { id: 'open', label: 'Open project', icon: <FolderIcon /> },
                    { id: 'export', label: 'Export sampling data', icon: <ChartBarIcon /> },
                    { id: 'invite', label: 'Invite reviewer', icon: <UserIcon /> },
                    { id: 'archive', label: 'Archive', icon: <DotsThreeIcon />, destructive: true },
                  ]}
                />
                <ContextMenu
                  items={[
                    { id: 'rename', label: 'Rename' },
                    { id: 'duplicate', label: 'Duplicate' },
                    { id: 'share', label: 'Share' },
                    { id: 'remove', label: 'Remove from list', destructive: true },
                  ]}
                />
              </div>
            </div>
          </section>

          <section id="sidesheet" className="section reveal">
            <SectionHead meta={SECTIONS[6]} />
            <div className="section__body">
              <Sidesheet
                navLabel="All projects"
                title="Iberian rewilding"
                status="In review"
                primaryAction={{ label: 'Confirm' }}
                secondaryAction={{ label: 'Cancel' }}
              >
                <Input label="Project ID" value="OGCR-IBER-001" readOnly />
                <Input label="Reviewer" value="Camila Rojas" readOnly />
                <p className="text-body-s card__paragraph">
                  Methodology v3.2 with field sampling at 12 plots. Reviewer flagged two
                  variance issues that need clarification before issuance.
                </p>
                <div className="kv-list">
                  <div className="kv-row">
                    <span className="kv-row__key">Estimated credits</span>
                    <span className="kv-row__value">42,180 t CO₂e</span>
                  </div>
                  <div className="kv-row">
                    <span className="kv-row__key">Decision due</span>
                    <span className="kv-row__value">May 7, 2026</span>
                  </div>
                </div>
              </Sidesheet>
            </div>
          </section>

          <section id="messages" className="section reveal">
            <SectionHead meta={SECTIONS[7]} />
            <div className="section__body">
              <div className="specimen-stack">
                <Message
                  state="neutral"
                  title="Methodology v3.2 published"
                  description="Existing projects retain v3.1 until their next reissuance window."
                  actionLabel="Read changelog"
                />
                <Message
                  state="success"
                  title="Project verified"
                  description="42,180 t CO₂e is now eligible for issuance."
                  actionLabel="View certificate"
                />
                <Message
                  state="warning"
                  title="Sampling variance is high"
                  description="Plot 7 deviates from the regional baseline by 18%."
                  actionLabel="Inspect"
                />
                <Message
                  state="error"
                  title="Audit failed"
                  description="Two findings require remediation before issuance can resume."
                  actionLabel="Open findings"
                />
                <Message
                  state="success"
                  type="floating"
                  title="Saved as draft"
                  description="Your edits will be available when you return."
                  onDismiss={() => {}}
                />
              </div>
            </div>
          </section>

          <section id="progress" className="section reveal">
            <SectionHead meta={SECTIONS[8]} />
            <div className="section__body">
              <div className="specimen-stack specimen-stack--narrow">
                <ProgressBar label="Methodology validation" value={32} />
                <ProgressBar label="Sampling complete" value={64} tone="blue" />
                <ProgressBar label="Reviewer escalations" value={88} tone="orange" />
                <ProgressBar label="Archive sweep" value={100} tone="neutral" />
              </div>
            </div>
          </section>

          <section id="checkbox" className="section reveal">
            <SectionHead meta={SECTIONS[9]} />
            <div className="section__body">
              <div className="specimen-stack">
                <Checkbox
                  label="I agree to the terms of service"
                  checked={terms}
                  onChange={(v) => setTerms(v)}
                />
                <Checkbox
                  label="Receive marketing emails"
                  checked={marketing}
                  onChange={(v) => setMarketing(v)}
                />
                <Checkbox label="Disabled option" checked disabled />
                <Checkbox label="Required field" error />
                <Checkbox
                  layout="border-left"
                  label="Verified registry"
                  secondaryText="Manual review by an OGCR analyst"
                  checked={card1}
                  onChange={(v) => setCard1(v)}
                />
                <Checkbox
                  layout="border-left"
                  label="Self-attested"
                  secondaryText="Project owner provides documentation only"
                  checked={card1 === true ? false : true}
                  onChange={(v) => setCard1(v)}
                />
              </div>
            </div>
          </section>

          <section id="radio" className="section reveal">
            <SectionHead meta={SECTIONS[10]} />
            <div className="section__body">
              <div className="specimen-stack" role="radiogroup" aria-label="Plan and verification">
                <Radio
                  name="plan"
                  value="monthly"
                  label="Monthly"
                  checked={plan === 'monthly'}
                  onChange={() => setPlan('monthly')}
                />
                <Radio
                  name="plan"
                  value="annual"
                  label="Annual"
                  checked={plan === 'annual'}
                  onChange={() => setPlan('annual')}
                />
                <Radio name="plan" value="custom" label="Custom" disabled />
                <Radio
                  layout="border-left"
                  name="verify"
                  value="basic"
                  label="Basic verification"
                  secondaryText="Document review only"
                  checked={plan === 'monthly'}
                  onChange={() => setPlan('monthly')}
                />
                <Radio
                  layout="border-left"
                  name="verify"
                  value="full"
                  label="Full audit"
                  secondaryText="Field visit + sampling"
                  checked={plan === 'annual'}
                  onChange={() => setPlan('annual')}
                />
              </div>
            </div>
          </section>

          <section id="form" className="section reveal">
            <SectionHead meta={SECTIONS[11]} />
            <div className="section__body">
              <div className="specimen-form">
                <Form noValidate onSubmit={(e) => e.preventDefault()}>
                  <FormSection
                    step="I"
                    title="Project"
                    description="Identify the project being submitted for verification."
                  >
                    <FormRow>
                      <Input
                        label="Project name"
                        value={formProjectName}
                        onChange={(e) => setFormProjectName(e.target.value)}
                        placeholder="e.g. Iberian rewilding pilot"
                      />
                      <Input
                        label="Project code"
                        value={formProjectCode}
                        onChange={(e) => setFormProjectCode(e.target.value)}
                        error={projectCodeError}
                        helperText={
                          projectCodeError
                            ? 'Code must begin with OGCR-'
                            : 'Issued by the registry on intake.'
                        }
                      />
                    </FormRow>
                    <Input
                      label="Methodology"
                      value={formMethodology}
                      onChange={(e) => setFormMethodology(e.target.value)}
                      iconLeft={<FlaskIcon />}
                      helperText="Versioned methodology used for this issuance."
                    />
                  </FormSection>

                  <FormSection
                    step="II"
                    title="Sampling"
                    description="Field measurements that back the issuance request."
                  >
                    <FormRow>
                      <Input
                        label="Plot count"
                        type="number"
                        value={formPlots}
                        onChange={(e) => setFormPlots(e.target.value)}
                      />
                      <Input
                        label="Sampling date"
                        type="date"
                        value={formSampleDate}
                        onChange={(e) => setFormSampleDate(e.target.value)}
                      />
                    </FormRow>
                  </FormSection>

                  <FormSection
                    step="III"
                    title="Verification"
                    description="Reviewer level required for this submission."
                  >
                    <FormFieldset legend="Verification level" required inline>
                      <Radio
                        layout="border-left"
                        name="form-verify"
                        value="basic"
                        label="Basic verification"
                        secondaryText="Document review only"
                        checked={formVerification === 'basic'}
                        onChange={() => setFormVerification('basic')}
                      />
                      <Radio
                        layout="border-left"
                        name="form-verify"
                        value="full"
                        label="Full audit"
                        secondaryText="Field visit and sampling"
                        checked={formVerification === 'full'}
                        onChange={() => setFormVerification('full')}
                      />
                    </FormFieldset>
                  </FormSection>

                  <FormSection
                    step="IV"
                    title="Confirm"
                    description="Acknowledge before submitting for review."
                  >
                    <Checkbox
                      label="I confirm that the data above is accurate and complete."
                      checked={formTerms}
                      onChange={(v) => setFormTerms(v)}
                    />
                  </FormSection>

                  <FormFooter note="Required fields are marked *">
                    <Button variant="text" type="button">Cancel</Button>
                    <Button variant="outlined" type="button">Save draft</Button>
                    <Button variant="filled" type="submit" iconRight={<ArrowRightIcon />}>
                      Submit for review
                    </Button>
                  </FormFooter>
                </Form>
              </div>
            </div>
          </section>

          <section id="table" className="section reveal">
            <SectionHead meta={SECTIONS[12]} />
            <div className="section__body">
              <div className="specimen-table">
                <DataTable
                  caption="Issuance ledger · last 30 days"
                  columns={issuanceColumns}
                  data={ISSUANCES}
                  initialSorting={[{ id: 'updated', desc: true }]}
                />
              </div>
            </div>
          </section>

          <footer className="colophon">
            <span>© OGCR · Operator platform</span>
            <span>Set in Inter</span>
            <span>Pulled from Figma 2P6XrQJhT8I39IR5LGK7RT</span>
          </footer>
        </div>

        <nav className="toc" aria-label="Specimens">
          <p className="toc__heading">Specimens</p>
          <ul className="toc__list">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a className="toc__link" href={`#${s.id}`}>
                  <span className="toc__num">§{s.num}</span>
                  <span>{s.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  )
}

export default App
