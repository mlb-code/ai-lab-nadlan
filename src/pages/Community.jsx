import lessonsData from '../data/lessons.json'

export default function Community() {
  const { community } = lessonsData

  return (
    <div className="space-y-12">
      <div className="pb-7 border-b border-line">
        <div className="kicker mb-5">הקהילה</div>
        <h1 className="font-display text-5xl sm:text-6xl font-black leading-[0.95] tracking-tight text-ink-100">
          {community.title}
        </h1>
        <p className="mt-5 text-lg text-ink-300 leading-relaxed max-w-2xl">
          {community.description}
        </p>
      </div>

      <section className="card-elev accent-stripe p-10 sm:p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(139,94,60,0.10), rgba(139,94,60,0.03)), #17171C' }}
      >
        <div className="kicker mb-4">אזור הקהילה</div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-100 leading-tight tracking-tight max-w-xl mb-4">
          הצטרף לקהילת ההתחדשות העירונית.
        </h2>
        <p className="text-lg text-ink-300 max-w-xl mb-8 leading-relaxed">
          שאל שאלות, שתף פרומפטים שעבדו, וקבל פידבק מאנשי מקצוע אחרים ומהמרצה.
        </p>
        <a href={community.url} target="_blank" rel="noreferrer" className="btn-primary">
          כניסה לקהילה
          <span className="btn-arrow">←</span>
        </a>
      </section>

      <section>
        <div className="section-head">
          <h3>מה תמצא בקהילה</h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <Feature num="01" title="שאלות ותשובות" text="פתח דיון על כל אתגר שעולה בדרך — תשובות מהמרצה ומהקהילה." />
          <Feature num="02" title="פרומפטים מהשטח" text="שתף פרומפטים ו-Skills שעבדו לך, ואמץ כאלה שעבדו לאחרים." />
          <Feature num="03" title="מפגשים שבועיים" text="מפגשי Live עם המרצה לשאלות פתוחות ולליווי המשימות." />
        </div>
      </section>

      <div className="card-elev border-dashed p-6 text-sm text-ink-500">
        <span className="mono text-brand font-bold ml-2">לתשומת לבך:</span>
        הקישור לקהילה יעודכן כאן בקרוב. אם אתה משתתף בקורס פעיל, פרטי ההצטרפות נשלחו לאימייל הקבלה.
      </div>
    </div>
  )
}

function Feature({ num, title, text }) {
  return (
    <div className="card-elev p-7">
      <div className="mono text-[0.7rem] text-brand uppercase tracking-kicker font-bold mb-3">
        {num} / מה יש
      </div>
      <h4 className="font-display text-xl font-extrabold text-ink-100 mb-2 leading-tight">{title}</h4>
      <p className="text-base text-ink-500 leading-relaxed">{text}</p>
    </div>
  )
}
